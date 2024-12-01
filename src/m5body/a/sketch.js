// https://editor.p5js.org/jht9629-nyu/sketches/xxx
// poseNet

let my = {};
let colorPalette = ['red', 'green', 'gold', 'black'];

function preload() {
  my.fist = loadImage('../assets/power-fist-small-9v2-88x94.png');
}

function setup() {
  // createCanvas(640, 480);

  pixelDensity(1);

  init_keyActions();

  my_init();

  if (my.dim) {
    // my.canvas = createCanvas(960, 540 - 12);
    console.log('my.dim', my.dim);
    my.canvas = createCanvas(my.dim.width, my.dim.height - 12);
  } else {
    let nh = Math.floor(windowHeight * (my.top_percent / 100));
    my.canvas = createCanvas(windowWidth, nh);
  }
  clear();

  movie_init();

  video_setup();

  create_ui();

  setup_dbase();

  // delay any photo add for 5 secs during startup
  add_action_block(5);

  scroller_init();
}

function draw_mesh() {
  // my.output.background(my.avg_color);
  // console.log('draw_mesh effTrails', my.effTrails);
  if (my.videoBack) {
    draw_videoBack();
  } else if (!my.effTrails) {
    // my.output.background(0);
    my.output.clear();
  }
  draw_videoMovieBack();

  my.effect.prepareOutput();

  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  if (my.flipcanvas) {
    // push();
    scale(-1, 1);
    image(my.output, -w, 0);
    // pop();
  } else {
    image(my.output, 0, 0, w, h);
  }
}

function draw_videoMovieBack() {
  for (let spec of my.videoMovies) {
    if (spec.isVisible) {
      draw_videoMovie(spec);
    }
  }
}

function draw_videoMovie(videoMovie) {
  let mscale = videoMovie.scale;
  let movie = videoMovie.movie;
  let aspect_hw = movie.height / movie.width;
  let w = my.output.width;
  let h = my.output.width * aspect_hw;
  // my.output.image(videoMovie.movie, 0, 0, w, h);
  if (videoMovie.flipH) {
    my.output.push();
    my.output.scale(-1, 1);
    let x = 0;
    my.output.image(movie, x, 0, -w * mscale, h * mscale);
    my.output.pop();
  } else if (videoMovie.centerX) {
    let x = (width - width * mscale) * 0.5;
    let y = videoMovie.offsetY || 0;
    my.output.image(movie, x, y, w * mscale, h * mscale);
  } else {
    let y = videoMovie.offsetY || 0;
    my.output.image(movie, 0, y, w * mscale, h * mscale);
    if (videoMovie.scrollY && videoMovie.scrollEnabled) {
      if (videoMovie.offsetY < height * (1 - 0.25)) {
        videoMovie.offsetY = videoMovie.offsetY + 1;
      }
    }
  }
}

function draw_videoBack() {
  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  // my.output.image(my.video, 0, 0, w, h);
  my.output.push();
  my.output.scale(-1, 1);
  my.output.image(my.video, 0, 0, -w, h);
  my.output.pop();
}

function draw_video() {
  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  image(my.video, 0, 0, w, h);
}

async function video_setup() {
  //
  console.log('video_setup await video_init');

  // my.video is set by video_init or movie_init
  //
  if (my.showCamera) {
    await video_init();
  } else {
    movie_init();
  }

  // console.log('video_setup new eff_bars');

  my.bars = new eff_bars({ width: my.video.width, height: my.video.height });

  my.input = my.video;
  my.input_aspect_hw = my.video.height / my.video.width;

  // my.effects_init_map = {
  //   seg: bodySeg_init,
  //   pose: bodyPose_init,
  //   hand: bodyHand_init,
  // };
  let init = my.effects_init_map[my.effectParam];
  if (init) {
    init();
  } else {
    console.log('no effect', my.effectParam);
  }

  my.bestill = new eff_bestill({ factor: 10, input: my.output });

  console.log('video_setup return');
}

function draw() {
  //
  clear();

  scroller_update();

  photo_list_update_poll();

  proto_prune_poll();

  draw_report_time();

  my.teventOpenDiff = 0;

  if (!my.effect) return;

  if (my.effect.ready()) {
    first_mesh_check();
  }

  check_show_hide();

  if (my.show_mesh) {
    draw_mesh();
  } else {
    draw_video();
  }
}

function draw_report_time() {
  // let str = my.photo_list.length + ' ' + my.photo_index;
  let time = millis() / 1000;
  let videoTime = time;
  if (my.video && my.video.time) {
    videoTime = my.video.time();
  }
  if (my.videoMovie && my.videoMovie.movie && my.videoMovie.movie.time) {
    videoTime = my.videoMovie.movie.time();
  }
  time = formatSeconds(time);
  videoTime = formatSeconds(videoTime);

  {
    let str = 'fps:' + frameRate().toFixed(1);
    str = 'time: ' + time + ' ' + str;
    if (my.reportMaxPoints) {
      str += ' n:' + (my.reportMaxPoints + 1) + ' of:' + my.reportMaxPointLimit;
    }
    my.photo_count_span.html(str);
  }
  {
    let str = 'time: ' + videoTime + ' ';
    dbase_report_status({ msg: str + ' ' + my.videoMovie.moviePath });
  }
}

function formatSeconds(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = Math.floor(seconds % 60);
  let millis = Math.floor((seconds % 1) * 100);
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  secs = secs.toString().padStart(2, '0');
  millis = millis.toString().padStart(2, '0');
  return `${hours}:${minutes}:${secs}.${millis}`;
}

// wait 0.5 seconds before showing face mesh
// to avoid false flashes
function check_show_hide() {
  if (!my.show_hide_taken) {
    if (!my.effect.ready()) {
      hide_action();
      my.hiden_time = Date.now() / 1000;
    } else {
      if (my.hiden_time) {
        let now = Date.now() / 1000;
        let diff = now - my.hiden_time;
        if (diff > 0.5) {
          my.hiden_time = 0;
          show_action();
        } else {
          // console.log('hiden wait diff', diff);
        }
      } else {
        my.hiden_time = 0;
        show_action();
      }
    }
  }
}

function track_teventDiff() {
  //
  if (my.face_hidden) {
    let lapse = teventOpenLapseSecs();
    // console.log('track_teventDiff face_hidden lapse', lapse);
    if (lapse < my.add_action_delay) {
      // console.log('track_teventDiff return lapse', lapse, 'my.teventOpenState', my.teventOpenState);
      if (!teventActive()) {
        my.teventOpenState = 0;
      }
      return;
    }
  }

  if (teventActive()) {
    if (my.teventOpenState == 0) {
      // edge into teventopened
      my.teventOpenStartTime = Date.now();
      my.teventOpenCount++;
      // console.log('teventopen my.teventOpenCount', my.teventOpenCount, 'my.teventOpenDiff', my.teventOpenDiff);
      // console.log('my.teventOpenState', my.teventOpenState, 'openSecs', teventOpenLapseSecs());
      my.teventOpenState = 1;
    } else if (my.teventOpenState == 1) {
      // teventalready open
      let lapse = teventOpenLapseSecs();
      if (lapse > my.add_action_delay) {
        if (my.add_action_timeoutid) {
          console.log('track_teventDiff return add_action_timeoutid', my.add_action_timeoutid);
          return;
        }
        console.log('teventopen add_action', teventOpenLapseSecs());
        add_action();
        add_action_block(my.add_action_delay);
        my.teventOpenState = 2;
      }
    } else {
      // teventopen already tevent add
      // console.log('my.teventOpenState', my.teventOpenState, 'openSecs', teventOpenLapseSecs());
    }
  } else {
    // teventNOT open
    if (my.teventOpenState) {
      teventOpenLapseSecs();
    }
    my.teventOpenState = 0;
  }
}

function teventActive() {
  return my.teventOpenDiff > 0.05;
}

function teventOpenLapseSecs() {
  if (!teventActive()) {
    my.teventOpenStartTime = Date.now();
    return 0;
  }
  let lapse = (Date.now() - my.teventOpenStartTime) / 1000;
  // console.log('teventOpenLapseSecs lapse', lapse);
  return lapse;
}

function add_action_block(delay) {
  let mdelay = delay * 1000;
  my.add_action_timeoutid = setTimeout(add_action_unblock, mdelay);
}

function add_action_unblock() {
  console.log('add_action_unblock add_action_timeoutid', my.add_action_timeoutid);
  my.add_action_timeoutid = 0;
}

// https://editor.p5js.org/ml5/sketches/lCurUW1TT
// faceMesh-keypoints --ml5
/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

// https://editor.p5js.org/jht9629-nyu/sketches/9fOM25TRl
// faceMesh-keypoints --ml5 copy

// https://editor.p5js.org/jht9629-nyu/sketches/PrJvjyxb6
// faceMesh mesh_nits

// https://editor.p5js.org/jht9629-nyu/sketches/7y2gqHeZz
// faceMesh mesh_nits v2
// scale to height

// https://editor.p5js.org/jht9629-nyu/sketches/hFnQmY-Jy
// faceMesh mesh_nits v3
// fit to width

// frameRate()
// 36.63003701391713

// https://editor.p5js.org/jht9629-nyu/sketches/p4Uu0B2sk
// faceMesh mesh_nits v4
// fill to width and height

// https://editor.p5js.org/jht9629-nyu/sketches/nDEtGRehq
// faceMesh mesh_nits v5

// https://editor.p5js.org/jht9629-nyu/sketches/fsOAbI6SJ
// faceMesh mesh_nits v6 -- stray mask

// https://editor.p5js.org/jht9629-nyu/sketches/PuoF9-3xy
// faceMesh mesh_nits v7 mask

// https://editor.p5js.org/jht9629-nyu/sketches/_3QMiI-fM
// faceMesh mesh_nits v8 bestill

// !!@ show_action_ui video.play
// !!@ hide_action_ui effTrails

// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-bodypose/pose-detection
