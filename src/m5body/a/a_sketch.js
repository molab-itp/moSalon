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

function draw() {
  //
  clear();

  scroller_update();

  photo_list_update_poll();

  proto_prune_poll();

  draw_report_time();

  tevent_clear();

  if (!my.effect) return;

  if (my.effect.ready()) {
    first_mesh_check();
  }

  check_show_hide();

  if (my.show_mesh) {
    draw_video_effects();
  } else {
    draw_video();
  }
}

function draw_report_time() {
  // let str = my.photo_list.length + ' ' + my.photo_index;
  let time = millis() / 1000;
  let videoTime = time;
  let video = my.videoCapture?.capture;
  if (video?.time) {
    videoTime = video.time();
  }
  video = my.videoMovie?.movie;
  if (video?.time) {
    videoTime = video.time();
  }
  time = formatSeconds(time);
  videoTime = formatSeconds(videoTime);

  {
    let str = 'fps:' + frameRate().toFixed(1);
    str = 'time: ' + time + ' ' + str;
    if (my.effect && my.effect.reportMaxPoints) {
      str += ' n:' + (my.effect.reportMaxPoints + 1) + ' of:' + my.effect.reportMaxPointLimit;
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
