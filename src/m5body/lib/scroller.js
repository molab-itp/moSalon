//

function scroller_init() {
  my.doScroll = 0;
  my.stallMaxTime = 10.0;
  my.rwidth = 1920;
  my.scrollSpeed = 1;
  my.scrollBy = 4;
  my.nscrollImages = 87;

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

function scroller_update() {
  // calcTotalHeight();
  // console.log('draw');

  if (!my.doScroll) return;

  let now = millis() / 1000.0;
  if (!my.scrollDelayTime) my.scrollDelayTime = now;
  let lapse = now - my.scrollDelayTime;
  if (lapse > 0.03) {
    my.scrollDelayTime = now;
    // window.scrollBy({ top: window.scrollY + 1, behavior: 'smooth' });
    window.scrollBy(0, my.scrollBy); // 1
    // let nlimit = scrollLimit || rarr.length;
    // if (window.scrollY >= scrollYmax) {
    if (scrollingStalled()) {
      window.scrollTo(0, 0);
      my.lastY = 0;
      my.scrollStartTime = 0;
      my.scrollDelayTime = 0;
    }
  }
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
