//

let keyActions;

function init_keyActions() {
  keyActions = {
    1: [movie1_action],
    2: [movie2_action],
    3: [movie3_action],
    4: [videoBack_action],
    5: [clear_action],

    q: [movie1_scroll_action],
    w: [scroll_toggle_action],
    e: [scroll_faster_action, scroll_normal_action],
    r: [scroll_reverse_action, scroll_normal_action],
    t: [scroll_reset_action],
    y: [clear_action],

    a: [toggle_play_action],
    s: [toggle_sound_action],
    d: [rewind_action],
    f: [clear_action],

    z: [fullScreen_action],
    x: [toggle_tails_action],
    c: [blast_action],
    v: [clear_action],
  };
}

function toggle_tails_action() {
  my.effTrails = !my.effTrails;
  // console.log('toggleTrailsBtn effTrails', my.effTrails);
  my.toggleTrailsBtn.html(my.effTrails ? 'Trails ON' : 'Trails OFF');
}

function blast_action() {
  my.effect.blast();
}

function rewind_action() {
  // my.videoMovie.time(435);
  my.videoMovie.movie.time(0);
  my.videoMovie.offsetY = 0;
}

function scroll_normal_action() {
  scroll_normal();
}

function scroll_reverse_action() {
  my.scrollEnabled = 1;
  scroll_faster(-1);
}

function scroll_faster_action() {
  my.scrollEnabled = 1;
  scroll_faster();
}

function scroll_reset_action() {
  scroller_reset();
}

function toggle_sound_action() {
  my.videoMovie.shouldPlay = !my.videoMovie.shouldPlay;
  let movie = my.videoMovie.movie;
  if (movie.volume() != 0) {
    movie.volume(0);
  } else {
    movie.volume(1);
  }
}

function toggle_play_action() {
  my.videoMovie.shouldPlay = !my.videoMovie.shouldPlay;
  if (my.videoMovie.shouldPlay) {
    my.videoMovie.movie.play();
  } else {
    my.videoMovie.movie.pause();
  }
}

function scroll_toggle_action() {
  my.scrollEnabled = !my.scrollEnabled;
}

function movie1_scroll_action() {
  let videoMovie = my.videoMovies[0];
  videoMovie.scrollEnabled = !videoMovie.scrollEnabled;
}

function fullScreen_action() {
  ui_toggleFullScreen();
  // setTimeout(function () {
  //   window.location.reload();
  // }, 3000);
}

function clear_action() {
  my.effect.clear();
}

function videoBack_action() {
  my.videoBack = !my.videoBack;
}

function movie1_action() {
  my.videoMovie = my.videoMovies[0];
  my.videoMovie.isVisible = !my.videoMovie.isVisible;
  // my.videoMovie.offsetY = 0;
}

function movie2_action() {
  my.videoMovie = my.videoMovies[1];
  my.videoMovie.isVisible = !my.videoMovie.isVisible;
}

function movie3_action() {
  my.videoMovie = my.videoMovies[2];
  my.videoMovie.isVisible = !my.videoMovie.isVisible;
}

function keyPressed() {
  // if (key === 'a') {
  //   scroll_faster();
  // }
  let spec = keyActions[key];
  if (spec && spec[0]) spec[0]();
}

function keyReleased() {
  // if (key === 'a') {
  //   scroll_normal();
  // }
  let spec = keyActions[key];
  if (spec && spec[1]) spec[1]();
}
