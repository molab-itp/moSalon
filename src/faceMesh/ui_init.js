//
function ui_init() {
  //
  createSpan(my.version);

  my.addBtn = ui_createButton('Add');
  my.addBtn.mousePressed(add_action);

  my.takeBtn = ui_createButton('Take');
  my.takeBtn.mousePressed(take_action);

  my.removeBtn = ui_createButton('Remove');
  my.removeBtn.mousePressed(remove_action);

  my.resetBtn = ui_createButton('Reset');
  my.resetBtn.mousePressed(reset_action);

  my.photo_count_span = createSpan('' + my.photo_list.length);

  my.gallery_div = ui_div_empty('igallery');
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
    // console.log('show_action id', id);
    img = createImg('', 'image');
    img.id(id);
    // console.log('show_action createImg', img);

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
  }, 5000);
}

function reset_check() {
  if (my.video) return;
  if (frameCount > frameRate() * 5 && (!my.mediaDevices.length || !my.mediaDevices[0].stream)) {
    reset_action();
  }
}
