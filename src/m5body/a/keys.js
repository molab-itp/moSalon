//

let keyActions;

function init_keyActions() {
  keyActions = {
    1: movie1_action,
    2: movie2_action,
    3: movie3_action,
    4: videoBack1_action,
    5: videoBack2_action,

    q: scroll_faster_action,
    w: scroll_next_action,
    e: scroll_reverse_action,
    r: scroll_previous_action,
    t: scroll_reset_action,

    a: toggle_play_action,
    s: rewind_action,
    d: toggle_sound_action,

    z: toggle_showEffect1_action,
    x: clear_effect1_action,
    c: toggle_showEffect2_action,
    v: clear_effect2_action,
    b: blast_action,

    '.': fullScreen_action,
    '/': reload_action,

    '[': scroll_profile_jump,
    ']': scroll_sacrifice_jump,
    '\\': scroll_reset_action,
  };
}

function scroll_profile_jump() {
  window.scrollTo(0, 69874);
  my.scrollBy = 0;
}
function scroll_sacrifice_jump() {
  // Thich Quang Duc
  window.scrollTo(0, 114831);
  my.scrollBy = 0;
}

function scroll_reset_action() {
  scroller_reset();
}

function scroll_next_action() {
  scroll_next(1);
}
function scroll_previous_action() {
  scroll_next(-1);
}

function scroll_faster_action() {
  scroll_faster(1);
}

function scroll_reverse_action() {
  scroll_faster(-1);
}

function reload_action() {
  window.location.reload();
}

function toggle_tails_action() {
  my.effTrails = !my.effTrails;
  // console.log('toggleTrailsBtn effTrails', my.effTrails);
  my.toggleTrailsBtn.html(my.effTrails ? 'Trails ON' : 'Trails OFF');
}

function rewind_action() {
  // my.videoMovie.time(435);
  my.videoMovie.movie.time(0);
  my.videoMovie.offsetY = 0;
}

function toggle_sound_action() {
  let movie = my.videoMovie.movie;
  if (movie.volume() >= 1) {
    movie.volume(0.05);
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

// z: toggle_showEffect1_action,
// x: toggle_showEffect1_action,
// c: clear_effect1_action,
// v: clear_effect2_action,

function toggle_showEffect1_action() {
  my.effects[0].toggleEnabled();
}

function toggle_showEffect2_action() {
  my.effects[1].toggleEnabled();
}

function clear_effect1_action() {
  my.effects[0].clear();
}

function clear_effect2_action() {
  my.effects[1].clear();
}

function clear_action() {
  my.effTrails = 0;
  for (let effect of my.effects) {
    effect.clear();
  }
}

function blast_action() {
  for (let effect of my.effects) {
    effect.blast();
  }
}

function videoBack1_action() {
  my.videoBack = !my.videoBack;
  my.videoCapture = my.videoCaptures[0];
}

function videoBack2_action() {
  my.videoBack = !my.videoBack;
  my.videoCapture = my.videoCaptures[1] ?? my.videoCapture;
}

function movie1_action() {
  movie_select(0);
}

function movie_select(index) {
  let videoMovie = my.videoMovies[index];
  videoMovie.isVisible = !videoMovie.isVisible;
  let oindex = my.videoMoviesOrder.indexOf(videoMovie);
  // Remove select movie before its moved to new location
  my.videoMoviesOrder.splice(oindex, 1);
  if (!videoMovie.isVisible) {
    // Not visible: Move to back
    my.videoMoviesOrder.splice(0, 0, videoMovie);
    // Select top most movie
    videoMovie = my.videoMoviesOrder[my.videoMoviesOrder.length - 1];
  } else {
    // visible: Move to the end of display order array
    my.videoMoviesOrder.push(videoMovie);
  }
  // top most movie is selected
  my.videoMovie = videoMovie;
}

function movie2_action() {
  movie_select(1);
  // my.videoMovie = my.videoMovies[1];
  // my.videoMovie.isVisible = !my.videoMovie.isVisible;
}

function movie3_action() {
  movie_select(2);
  // my.videoMovie = my.videoMovies[2];
  // my.videoMovie.isVisible = !my.videoMovie.isVisible;
}

function keyPressed() {
  let spec = keyActions[key];
  if (spec) spec();
  return false;
}

// function keyPressed() {
//   let spec = keyActions[key];
//   if (spec && spec[0]) spec[0]();
// }

// function keyReleased() {
//   let spec = keyActions[key];
//   if (spec && spec[1]) spec[1]();
// }
