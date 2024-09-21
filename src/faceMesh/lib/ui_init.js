//
function ui_init() {
  //
  ui_begin();

  my.ui_container = createDiv('').id('id_top_bottoms');

  let ver = ui_span(0, my.version);
  ver.elt.style.backgroundColor = 'white';

  my.showBtn = ui_createButton('Show');
  my.showBtn.mousePressed(show_action_ui);

  my.hideBtn = ui_createButton('Hide');
  my.hideBtn.mousePressed(hide_action_ui);

  my.meshBtn = ui_createButton('Mesh');
  my.meshBtn.mousePressed(mesh_action);

  my.addBtn = ui_createButton('Add');
  my.addBtn.mousePressed(add_action);

  my.takeBtn = ui_createButton('Take');
  my.takeBtn.mousePressed(take_action);

  my.removeBtn = ui_createButton('Remove 1');
  my.removeBtn.mousePressed(remove_action);

  my.removeBtn = ui_createButton('Remove All');
  my.removeBtn.mousePressed(remove_all_action);

  my.resetBtn = ui_createButton('Reset');
  my.resetBtn.mousePressed(reset_action);

  my.fullScreenBtn = ui_createButton('Full Screen');
  my.fullScreenBtn.mousePressed(fullScreen_action);

  my.photo_count_span = ui_span(0, '' + my.photo_list.length);
  my.photo_count_span.elt.style.backgroundColor = 'white';

  // Move the canvas below all the ui buttons
  let body_elt = document.querySelector('body');
  let main_elt = document.querySelector('main');
  body_elt.insertBefore(main_elt, null);

  // Gallery is below canvs
  my.ui_container = null;
  my.gallery_div = ui_div_empty('id_gallery');
}

function img_remove_all() {
  //
  // console.log('photo_remove_all');
  for (;;) {
    let child = my.gallery_div.elt.firstChild;
    // console.log('photo_remove_all child', child);
    if (!child) {
      break;
    }
    child.remove();
  }
}

function remove_img_index(index) {
  // console.log('remove_img_index index', index);
  let id = 'id_img_' + index;
  let img = select('#' + id);
  // console.log('remove_img_index img', img);
  if (img) {
    img.remove();
  }
}

// Create image element for an index
//  or return if already present
//
function find_img(index) {
  let id = 'id_img_' + index;
  let img = select('#' + id);
  if (!img) {
    // console.log('find_img id', id);
    img = createImg('', 'image');
    img.id(id);
    // console.log('find_img createImg', img);

    // Add image as first child to see most recent first
    my.gallery_div.elt.prepend(img.elt);

    let iwidth = my.thumbWidth;
    img.style('width: ' + iwidth + 'px;');
  }
  return img;
}

// Sometimes getting constrain error with createCapture with config params
// Force video permission then reload page
//
function reset_action() {
  my.video = createCapture(VIDEO, function (stream) {
    console.log('reset_action stream', stream);
  });
  console.log('reset_action video', my.video);
  setTimeout(function () {
    // video.remove();
    window.location.reload();
  }, resetDelaySecs * 1000);
}

function reset_check() {
  if (my.video) return;
  if (frameCount > frameRate() * resetDelaySecs && my.mediaDevices.length && !my.mediaDevices[0].stream) {
    reset_action();
  }
}

let resetDelaySecs = 7;

// if (my.faces.length == 0) {
//   // id_main.
//   id_main.classList.add('hidden');
// } else {
//   id_main.classList.remove('hidden');
// }

function show_action_ui() {
  my.show_hide_taken = 0;
  // id_main.classList.remove('hidden');
  show_action();
}

function hide_action_ui() {
  my.show_hide_taken = 1;
  // id_main.classList.add('hidden');
  hide_action();
}

function show_action() {
  id_main.classList.remove('hidden');
  my.face_hidden = 0;
}

function hide_action() {
  id_main.classList.add('hidden');
  my.face_hidden = 1;
}

function mesh_action() {
  my.show_mesh = !my.show_mesh;
}

function fullScreen_action() {
  ui_toggleFullScreen();
}

// !!@ to lib ui_toggleFullScreen
//
function ui_toggleFullScreen() {
  if (!document.documentElement.requestFullscreen) {
    console.log('NO document.documentElement.requestFullscreen');
    // !!@ on mobile requestFullscreen not supported
    // clear ui anyway
    ui_remove_all();
    return;
  }
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    ui_remove_all();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// !!@ to lib ui_remove_all
//
function ui_remove_all() {
  for (let prop in my.ui_uids) {
    // !!@ param needed
    if (prop == 'id_gallery') continue;
    let item = my.ui_uids[prop];
    item.remove();
  }
  my.ui_uids = {};
}
