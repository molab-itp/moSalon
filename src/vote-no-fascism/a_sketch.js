// https://editor.p5js.org/p5name/sketches/8jzqiCbbk
// firebase mo-gallery-ppt
// Display images from Firebase storage as a billboard using createImg

let galleryKey = 'mo-1/gallery-@r-ppt';
// let galleryKey = 'mo-gallery-ims-web';
let scrollSpeed = 2;
let nitems = 0;
let updateCount = 0;
let doScroll = false;
let rdata; // Firebase object results from server. key is id
let rarr; // Array of items from server
// let rwidth = 1920; // dimensions for image element
// let rheight = 1080;
let rwidth = 1080; // dimensions for image element
let rheight = 1920;
let scrollLimit = 0;
let doSplat = 0;
let debug = 0;

let shuffleBtn;
let fullScreenBtn;
let toggleScrollBtn;
let splatBtn;

let totalHeight = 0;
let scrollStartTime;
let lastY;
let stallMaxTime = 1.0;

let my = {};

function setup() {
  noCanvas();
  my.version = '?v=58';
  my.debugMode = displayWidth > 1080;
  // my.footerHeight = '288px';
  my.qrCodeWidth = '25%';

  // console.log('app', fireb_.app);
  check_url_param();

  // Setup listner for changes to firebase db
  let galleryRef = fireb_.ref(fireb_.database, galleryKey);
  fireb_.onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();
    console.log('galleryRef data', data);
    received_gallery(data);
  });

  create_ui();

  my.qrcode_url = () => {
    // return `./qrcode/qrcode_heathercoxrichardson.substack.com.png?v=58`;
    return `./qrcode/qrcode.png?v=58`;
  };
  my.showQRCode = () => {
    // qrCode is only shown for screen width greater than 800
    return window.innerWidth > 800;
  };

  dbase_report_status_version();

  check_doScroll(1);
}

function create_ui() {
  shuffleBtn = createButton('Shuffle').mousePressed(() => {
    //console.log('Shuffle');
    received_gallery(rdata, { doShuffle: 1 });
  });
  shuffleBtn.style('font-size:42px');

  fullScreenBtn = createButton('Full Screen').mousePressed(() => {
    ui_toggleFullScreen();
    ui_remove_all();
  });
  fullScreenBtn.style('font-size:42px');

  toggleScrollBtn = createButton('Scroll').mousePressed(() => {
    doScroll = !doScroll;
    console.log('doScroll', doScroll);
    check_doScroll();
  });
  toggleScrollBtn.style('font-size:42px');

  splatBtn = createButton('Splat').mousePressed(() => {
    console.log('splatBtn', doSplat);
    doSplat = !doSplat;
    received_gallery(rdata);
  });
  splatBtn.style('font-size:42px');

  ui_init_update();
}

function check_doScroll(disableFullScreen) {
  console.log('check_doScroll my.scrollParam', my.scrollParam, 'doScroll', doScroll);
  console.log('check_doScroll my.debugMode', my.debugMode);
  if (my.scrollParam) {
    doScroll = 1;
  }
  if (doScroll) {
    if (my.debugMode || disableFullScreen) {
      console.log('check_doScroll no fullscreen');
    } else {
      // Must be triggered by user action
      ui_toggleFullScreen();
    }
    ui_remove_all();
  }
}

function scrollingStalled() {
  let now = millis() / 1000.0;
  if (!scrollStartTime) scrollStartTime = now;
  if (!lastY || lastY != window.scrollY) {
    lastY = window.scrollY;
    return;
  }
  // window.scrollY not changed
  //
  let lapse = now - scrollStartTime;
  if (lapse > stallMaxTime) {
    return true;
  }
  return false;
}

function draw() {
  // console.log('draw');
  if (doScroll && frameCount % scrollSpeed == 0) {
    window.scrollBy(0, 1); // 1
    if (scrollingStalled()) {
      window.scrollTo(0, 0);
      lastY = 0;
      scrollStartTime = 0;
    }
  }
}

function received_gallery(data, opts) {
  window.scrollTo(0, 0);
  let div = ui_div_empty('igallery');
  if (!data) {
    return;
  }
  rdata = data;
  updateCount += 1;

  // for (key in data) {
  //   console.log('key', key);
  //   let val = data[key];

  // Display in reverse order to see new additions first
  rarr = Object.values(data).reverse();
  nitems = rarr.length;
  if (opts && opts.doShuffle) {
    rarr = shuffle(rarr);
  }
  // Place most recent image at end of scroll
  // scroll alternates between second image and third, second and fourth etc..
  //
  let r = rarr;
  rarr = [r[1], r[2], r[1], r[3], r[1], r[4], r[1], r[5], r[1], r[6], r[0]];

  for (let val of rarr) {
    // console.log('received_gallery val', val);
    // let img = createImg( 'https://p5js.org/assets/img/asterisk-01.png', 'the p5 magenta asterisk' );
    // select full resolution media if available
    //
    // let path = val.mediaPathFullRez ?? val.mediaPath;
    let path = val.mediaPathFullRez || val.mediaPath;
    let img = createImg(path, val.authorEmail);
    div.child(img);

    // avoid backquote for rasberry pi browser
    // img.style(`width: ${rwidth}px;`);
    let iwidth = rwidth;
    if (doSplat) {
      iwidth = random(100, 400);
    }
    img.style('width: ' + iwidth + 'px;');

    ui_init_update();
  }
}

function ui_remove_all() {
  shuffleBtn.remove();
  fullScreenBtn.remove();
  toggleScrollBtn.remove();
  splatBtn.remove();
}

function ui_init_update() {
  ui_span('date', my.version + ' ' + formatDate());
  ui_span('updateCount', ' updateCount:' + updateCount);
  ui_span('nitems', ' nitems:' + nitems);
}

function formatDate() {
  // return '';
  return new Date().toISOString();
}

function ui_div_empty(id) {
  let div = select('#' + id);
  // console.log('ui_device_selection div', div);
  if (!div) {
    div = createDiv().id(id);
  } else {
    let children = div.child();
    for (let index = children.length - 1; index >= 0; index--) {
      let elm = children[index];
      elm.remove();
    }
  }
  return div;
}

function ui_span(id, html) {
  let span = select('#' + id);
  if (document.fullscreenElement) {
    if (span) {
      span.remove();
    }
    return;
  }
  if (!span) {
    span = createSpan().id(id);
  }
  span.html(html);
}

function ui_toggleFullScreen() {
  console.log('ui_toggleFullScreen  ');
  if (!document.documentElement.requestFullscreen) {
    console.log('NO document.documentElement.requestFullscreen');
    return;
  }
  if (!document.fullscreenElement) {
    console.log('ui_toggleFullScreen requestFullscreen ');
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// let galleryKey = 'mo-gallery-web';
// let galleryKey = 'mo-gallery-ims-web';

function check_url_param() {
  let query = window.location.search;
  console.log('query', query);
  if (query.length < 1) return;
  let params = params_query(query);

  let ngallery = params['gallery'];
  if (ngallery) {
    // mo-gallery-web
    // rasberry pie does not like back quote
    // galleryKey = `mo-gallery-${ngallery}-web`;
    // galleryKey = ngallery;
    galleryKey = 'mo-gallery-' + ngallery;
  }
  console.log('galleryKey', galleryKey);

  my.scrollParam = params['scroll'];
  if (my.scrollParam) my.scrollParam = parseFloat(my.scrollParam);
  console.log('my.scrollParam', my.scrollParam);
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}

// https://mobilelabclass-itp.github.io/p5moLibrary/p5js_demo/createImg-board/
// https://mobilelabclass-itp.github.io/p5moLibrary/p5js_demo/createImg-board/?gallery=ims-web
// https://mobilelabclass-itp.github.io/p5moLibrary/p5js_demo/createImg-board/?gallery=web

// https://editor.p5js.org/jht1493/sketches/2OYRyVuhx
// firebase mo-gallery-1

// https://molab-itp.github.io/p5moLibrary/src/demo/mo-gallery-1/?v=58

// https://editor.p5js.org/jht9629-nyu/sketches/VtqUmOlGB

// https://heathercoxrichardson.substack.com/p/october-26-2024

// https://molab-itp.github.io/moSalon/src/vote-no-fascism/?v=58
