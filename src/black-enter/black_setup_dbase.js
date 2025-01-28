async function black_setup_dbase() {
  //
  my.comment_count = 0;

  await dbase_app_init(my);

  observe_meta();

  observe_comment_store();
}

function observe_meta() {
  dbase_app_observe({ observed_item }, 'meta');
  function observed_item(item) {
    console.log('observed_item item', item);
    console.log('observed_item item.blackfacts_index', item.blackfacts_index);
    if (item.blackfacts_index != undefined) {
      my.blackfacts_index = item.blackfacts_index;
    }
    if (item.comment_count != undefined) {
      my.comment_count = item.comment_count;
    }
    my.index_update_pending = 1;
  }
}

function observe_comment_store() {
  dbase_app_observe({ observed_event }, 'comment_store');
  my.comment_store = {};
  function observed_event(event, key, item) {
    console.log('observed_event ', event, key, item);
    switch (event) {
      case 'add':
      case 'change':
        my.comment_store[key] = item;
        break;
      case 'remove':
        delete my.comment_store[key];
        my.comment_prune_pending = 1;
        break;
    }
    my.comment_update_pending = 1;
  }
}

function new_entry() {
  let name = id_name.value;
  let comment = id_comment.value;
  let createdAt = new Date().toISOString();
  let index = my.comment_count + 1;
  return { name, comment, createdAt, index };
}

async function add_action() {
  console.log('add_action ');
  let entry = new_entry();
  console.log('add_action entry', entry);
  if (!entry.name && !entry.comment) {
    console.log('add_action empty');
    return;
  }
  let key = await dbase_add_key('comment_store', entry);
  console.log('add_action key', key);
  entry.key = key;
  try {
    dbase_update_item({ comment_count: dbase_increment(1) }, 'meta');
  } catch (err) {
    console.log('take_action err', err);
  }
}
