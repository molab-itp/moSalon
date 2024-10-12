//

// my.photo_list = [ { } ]
// {
//   "index": 19,
//   "name": "019.jpg",
//   "uid": "DK1Lcj16BFhDPgdvGGkVP9FS3Xy2"
// }

function set_photo_list(newList) {
  console.log('set_photo_list newList', newList);
  // console.log('set_photo_list photo_list', my.photo_list);
  let n = newList.length;
  let diff = n != my.photo_list.length || my.photo_list[n - 1].index != newList[n - 1].index;
  my.photo_list = newList.concat();
  // !!@ diff update_last_photo
  // if (diff) {
  //   update_last_photo();
  //   if (n) {
  //     // console.log('set_photo_list newList[n - 1].index', newList[n - 1].index);
  //   }
  // }
  // console.log('set_photo_list diff', diff);
}

// function photo_name(index) {
//   return index.toString().padStart(4, '0') + my.imageExt;
// }

function photo_list_entry(index) {
  let order = index.toString().padStart(4, '0');
  let name = order + my.imageExt;
  let uid = my.uid;
  return { order, uid, name, index, width, height };
}

function photo_path_entry(entry) {
  // return entry.key + '/' + entry.uid + '/' + entry.name;
  // return `${entry.order}/${entry.key}/${entry.uid}/${entry.name}`;
  return `${entry.key}/${entry.name}`;
}

async function photo_list_add(entry) {
  let newList = my.photo_list.concat(entry);
  if (newList.length > my.photo_max) {
    await photo_list_trim(newList);
  }

  // Change to photo_list send to cloud
  dbase_update_item({ photo_list: newList }, 'meta');
}

async function photo_list_trim(newList) {
  //
  // remove the first entry in newList
  //
  let first = newList.shift();
  await photo_list_remove_entry(first);
}

async function photo_list_remove_entry(entry) {
  // console.log('photo_list_remove_entry entry', entry);

  let path = photo_path_entry(entry);
  try {
    await fstorage_remove({ path });
    remove_img_index(entry.index);
  } catch (err) {
    console.log('photo_list_remove_entry err', err);
  }
}

async function photo_list_display() {
  //
  // console.log('photo_list_display my.photo_list', my.photo_list);
  for (let entry of my.photo_list) {
    let path = photo_path_entry(entry);
    try {
      let url = await fstorage_download_url({ path });
      url_result(url, entry.index);
    } catch (err) {
      console.log('photo_list_display err', err);
    }
  }
  function url_result(url, index) {
    // console.log('url_result index', index, 'url', url);
    let img = find_img(index);
    img.elt.src = url;
  }

  add_action_stopLoader();
}

/*

photo_meta 
  photo_index
  photo_list  -- last n of photo_store
    { key, uid, order, name, index, width, height }

photo_store
  key 
    { uid, order, name, index, width, height }

dbase_add_key( 'photo_store' ) --> key

fstorage_upload({ path: key
  path = order/key/uid

*/
async function add_action() {
  console.log('add_action ');

  add_action_startLoader();

  let entry = photo_list_entry(my.photo_index + 1);

  let layer = my.canvas;
  let imageQuality = my.imageQuality;

  let key = await dbase_add_key('photo_store', entry);
  console.log('add_action key', key);
  // console.log('add_action result.key', result.key);
  entry.key = key;
  let path = photo_path_entry(entry);

  try {
    await fstorage_upload({ path, layer, imageQuality });

    await photo_list_add(entry);

    dbase_update_item({ photo_index: dbase_increment(1) }, 'meta');

    //
  } catch (err) {
    console.log('take_action err', err);
  }

  // stopLoader();
}

async function take_action() {
  // console.log('take_action');

  remove_action();

  add_action();
}

async function remove_action() {
  let response = confirm('remove photo ' + my.photo_index);
  if (response) {
    remove_action_confirmed();
  }
}

async function remove_action_confirmed() {
  console.log('remove_action photo_count', my.photo_list.length);
  let n = my.photo_list.length;
  if (n < 1) {
    // No more images in the cloud
    //  zero out photo_index
    dbase_update_item({ photo_index: 0 });
    return;
  }
  //
  // remove the last entry in photo_list
  //
  startLoader();

  let newList = my.photo_list.slice(0, -1);
  console.log('remove_action newList ', newList.length);

  let last = my.photo_list[n - 1];
  await photo_list_remove_entry(last);

  // Update photo_list in the cloud
  dbase_update_item({ photo_list: newList }, 'meta');

  stopLoader();
}

async function remove_all_action() {
  let response = confirm('remove all photos n=' + my.photo_list.length);
  if (response) {
    remove_all_action_confirmed();
  }
}

async function remove_all_action_confirmed() {
  //
  startLoader();

  let newList = my.photo_list;
  while (newList.length > 0) {
    let last = newList[newList.length - 1];

    newList = newList.slice(0, -1);
    console.log('remove_all_action newList.length ', newList.length);
    console.log('remove_all_action last ', last);

    await photo_list_remove_entry(last);
  }

  // Update photo_list in the cloud
  // zero out photo_index
  dbase_update_item({ photo_list: [], photo_index: 0 }, 'meta');

  stopLoader();
}

// !!@ Not used
// example needed for fstorage_render
async function update_last_photo() {
  //
  console.log('update_last_photo photo_count', my.photo_list.length);

  if (!my.photo_list.length) return;
  if (!my.imgLayer) {
    my.imgLayer = createGraphics(width, height);
  }

  startLoader();

  let index = my.photo_list.length - 1;
  let entry = my.photo_list[index];
  let path = photo_path_entry(entry);
  try {
    let url = await fstorage_download_url({ path });
    await fstoreage_render({ url, layer: my.imgLayer });
  } catch (err) {
    console.log('photo_list_display err', err);
  }

  stopLoader();
}

// my.imgLayer = createGraphics(my.width, my.height);
