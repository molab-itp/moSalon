//

function scroller_init() {
  //
  my.scrollIndex = 0;
  my.scrollSpeeds = [0, 1, 8, 16, 32, 1];
  my.scrollDirection = 1;
  my.scrollBy = 0;

  // my.scrollEnabled = 0;
  my.stallMaxTime = 10.0;

  my.rwidth = 1920;

  let images = [];
  let n = my.nscrollImages;
  for (let index = 1; index <= n; index++) {
    let authorEmail = '';
    let mediaPath = `./images/${index}.png`;
    images.push({ mediaPath, authorEmail });
  }
  my.images = images;

  received_gallery(my.images);
}

function scroll_next(dir) {
  my.scrollDirection = dir;
  my.scrollByPrior = my.scrollBy;
  my.scrollBy = 1080 * dir;
  my.scrollRestorePending = 1;
  // console.log('scroll_faster scrollBy', my.scrollBy);
}

function scroll_faster(dir) {
  my.scrollDirection = dir;
  my.scrollIndex = (my.scrollIndex + 1) % my.scrollSpeeds.length;
  my.scrollBy = my.scrollSpeeds[my.scrollIndex];
  // console.log('scroll_faster dir', my.scrollDirection, 'scrollIndex', my.scrollIndex, 'scrollBy', my.scrollBy);
}

function scroller_update() {
  // console.log(
  //   'scroller_update scrollBy',
  //   my.scrollBy,
  //   'scrollDirection',
  //   my.scrollDirection,
  //   'scrollRestorePending',
  //   my.scrollRestorePending
  // );

  if (my.scrollBy == 0) return;
  // console.log('scroller_update scrollBy not zero', my.scrollBy);

  let f = 60 / frameRate();
  let scrollBy = my.scrollBy;
  if (!my.scrollRestorePending) {
    scrollBy = Math.round(scrollBy * f) * my.scrollDirection;
  }

  window.scrollBy(0, scrollBy);
  // console.log('scroller_update scrollBy ', scrollBy);

  if (scrollingStalled()) {
    // my.scrollEnabled = 0;
    // my.scrollIndex = 0;
    if (!my.scrollResetPending) {
      my.scrollResetPending = 1;
      setTimeout(function () {
        scroller_reset();
        my.scrollResetPending = 0;
      }, 5000);
    }
  }

  if (my.scrollRestorePending) {
    my.scrollRestorePending = 0;
    my.scrollBy = my.scrollByPrior;
  }
}

function scroller_reset() {
  window.scrollTo(0, 0);
  my.lastY = 0;
  my.scrollStartTime = 0;
  my.scrollDelayTime = 0;
  my.scrollIndex = 0;
  my.scrollBy = 1;
}

function scrollingStalled() {
  let now = millis() / 1000.0;
  if (!my.scrollStartTime) my.scrollStartTime = now;
  if (!my.lastY || my.lastY != window.scrollY) {
    my.lastY = window.scrollY;
    my.scrollStartTime = now;
    return false;
  }
  // window.scrollY not changed
  //
  let lapse = now - my.scrollStartTime;
  if (lapse > my.stallMaxTime) {
    return true;
  }
  return false;
}

function received_gallery(data, opts) {
  window.scrollTo(0, 0);
  let div = ui_div_empty('id_gallery');
  if (!data) {
    return;
  }
  // div.style('width:1080px; display: flex; align-items: center;')
  // div.style("width:1080px; align-items: center;");
  // rdata = data;
  // updateCount += 1;
  my.imgs = [];

  // for (key in data) {
  //   console.log('key', key);
  //   let val = data[key];

  // Display in reverse order to see new additions first
  // rarr = Object.values(data).reverse();
  let rarr = Object.values(data);
  if (opts && opts.doShuffle) {
    rarr = shuffle(rarr);
  }
  // let r = rarr;
  // rarr = [r[0],r[1],r[0],r[2],r[0],r[3],r[0],r[4],r[0],r[5]];

  nitems = rarr.length;
  for (let val of rarr) {
    // console.log('received_gallery val', val);
    // let img = createImg( 'https://p5js.org/assets/img/asterisk-01.png', 'the p5 magenta asterisk' );
    // select full resolution media if available
    //
    // let path = val.mediaPathFullRez ?? val.mediaPath;
    // let path = val.mediaPathFullRez || val.mediaPath;
    let path = val.mediaPathFullRez || val.mediaPath;
    let img = createImg(path, val.authorEmail, '', imageLoaded);
    div.child(img);

    let iwidth = my.rwidth;
    // if (doSplat) {
    //   iwidth = random(100, 400);
    // }
    img.style('width: ' + iwidth + 'px;');
    img.addClass('center-image');
    my.imgs.push(img);
    // ui_init_update();
  }

  function imageLoaded(arg) {
    // !!@ Displaying arg causes error
    // console.log('imageLoaded', arg);
    console.log('imageLoaded');
  }
}
