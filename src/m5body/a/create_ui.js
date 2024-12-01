//
function create_ui() {
  //
  ui_begin();
  my.ui_container = createDiv('').id('id_top_bottoms');
  my.ui_container.style('position: fixed; z-index: 100');

  // z
  // let ver = ui_span(0, my.mo_group + my.version);
  let ver = ui_createButton(my.mo_group + my.version);
  ver.elt.style.backgroundColor = 'white';
  ver.mousePressed(fullScreen_action);

  my.clearBtn = ui_createButton('Clear');
  my.clearBtn.mousePressed(clear_action);

  my.clear1Btn = ui_createButton('1');
  my.clear1Btn.mousePressed(clear1_action);

  my.clear2Btn = ui_createButton('2');
  my.clear2Btn.mousePressed(clear2_action);

  // 1-2-3-4
  my.videoMovieSelect0Btn = ui_createButton('[movie1');
  my.videoMovieSelect0Btn.mousePressed(movie1_action);

  my.toggleActionBtn = ui_createButton('scroll]');
  my.toggleActionBtn.mousePressed(movie1_scroll_action);

  my.videoMovieSelect1Btn = ui_createButton('movie2');
  my.videoMovieSelect1Btn.mousePressed(movie2_action);

  my.videoMovieSelect2Btn = ui_createButton('movie3');
  my.videoMovieSelect2Btn.mousePressed(movie3_action);

  my.videoBackBtn = ui_createButton('video1');
  my.videoBackBtn.mousePressed(videoBack1_action);

  my.videoBackBtn = ui_createButton('video2');
  my.videoBackBtn.mousePressed(videoBack2_action);

  // q-w-e-r
  // my.toggleActionBtn = ui_createButton('movie1 scroll');
  // my.toggleActionBtn.mousePressed(movie1_scroll_action);

  my.showBtn = ui_createButton('Scroll ~');
  my.showBtn.mousePressed(scroll_toggle_action);

  my.rewindScrollBtn = ui_createButton('Scroll 0');
  my.rewindScrollBtn.mousePressed(scroll_reset_action);

  // a-s-d-f
  my.togglePlayBtn = ui_createButton('Play ~');
  my.togglePlayBtn.mousePressed(toggle_play_action);

  my.toggleVolumeBtn = ui_createButton('Sound ~');
  my.toggleVolumeBtn.mousePressed(toggle_sound_action);

  my.rewindMovieBackBtn = ui_createButton('Rewind');
  my.rewindMovieBackBtn.mousePressed(rewind_action);

  // z-x-c-v
  my.toggleTrailsBtn = ui_createButton('Trails ~');
  my.toggleTrailsBtn.mousePressed(toggle_tails_action);

  my.blastBtn = ui_createButton('Blast');
  my.blastBtn.mousePressed(blast_action);

  my.photo_count_span = ui_span(0, '' + my.photo_list.length);
  my.photo_count_span.elt.style.backgroundColor = 'white';

  // Move the canvas below all the ui buttons
  let body_elt = document.querySelector('body');
  let main_elt = document.querySelector('main');
  body_elt.insertBefore(main_elt, null);

  // Gallery is below canvas
  my.ui_container = null;
  my.gallery_div = ui_div_empty('id_gallery2');
  // my.gallery_div.elt.style.margin = '0px 40px';
  my.gallery_div.elt.style.margin = `0px ${my.gallery_margin}`;
}

function unused_create_ui_1() {
  // my.showBtn = ui_createButton('Show');
  // my.showBtn.mousePressed(show_action_ui);
  // my.hideBtn = ui_createButton('Hide');
  // my.hideBtn.mousePressed(hide_action_ui);
  if (my.showButtons && 0) {
    my.showAllBtn = ui_createButton('Show All');
    my.showAllBtn.mousePressed(showAll_action);

    my.addBtn = ui_createButton('Add');
    my.addBtn.mousePressed(add_action);

    my.takeBtn = ui_createButton('Take');
    my.takeBtn.mousePressed(take_action);

    my.meshBtn = ui_createButton('Mesh');
    my.meshBtn.mousePressed(mesh_action);

    my.resetBtn = ui_createButton('Reset');
    my.resetBtn.mousePressed(reset_action);

    my.fullScreenBtn = ui_createButton('Full Screen');
    my.fullScreenBtn.mousePressed(fullScreen_action);
  }
  if (my.showRemove && 0) {
    my.removeBtn = ui_createButton('Remove 1');
    my.removeBtn.mousePressed(remove_action);

    my.removeBtn = ui_createButton('Remove All');
    my.removeBtn.mousePressed(remove_all_action);
  }
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
  my.gallery_items = {};
}

// Create image element for an index
//  or return if already present
//
function find_img(key) {
  let id = 'id_img_' + key;
  let img = select('#' + id);
  if (!img) {
    // console.log('find_img id', id);
    let span = createSpan();
    span.id(id);

    img = createImg('', 'image');
    // img.id(id);
    // console.log('find_img createImg', img);

    span.child(img);

    // Add image as first child to see most recent first
    my.gallery_div.elt.prepend(span.elt);

    let iwidth = my.thumbWidth;
    img.style('width: ' + iwidth + 'px;');

    // span.style('background-color: white');

    // Remember images in my.gallery_items
    if (!my.gallery_items) my.gallery_items = {};
    my.gallery_items[key] = span;
  }
  return img;
}

function showAll_action() {
  my.photo_max = Number.MAX_SAFE_INTEGER;
  photo_list_update();
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
  let resetNow = frameCount > frameRate() * resetDelaySecs;
  if (resetNow && my.mediaDevices.length && !my.mediaDevices[0].stream) {
    reset_action();
  }
}

let resetDelaySecs = 7;

function show_action_ui() {
  first_mesh_check();
  my.show_hide_taken = 0;
  show_action();
}

function hide_action_ui() {
  // !!@ hide_action_ui effTrails

  // first_mesh_check();
  // my.show_hide_taken = 1;
  // hide_action();

  my.effTrails = !my.effTrails;
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
  return;
  for (let prop in my.ui_uids) {
    // !!@ param needed
    if (prop == 'id_gallery') continue;
    let item = my.ui_uids[prop];
    item.remove();
  }
  my.ui_uids = {};
}

function ui_message(msg) {
  console.log('ui_message', msg);
}
