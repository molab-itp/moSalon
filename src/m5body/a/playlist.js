// playlist.js

function init_playlist() {
  //
  my.autoPlayEnabled = 0;
  my.playlistIndex = 0;
  my.playlistItems = [
    movie1_action,
    movie1_action,
    movie2_action,
    toggle_play_action,
    rewind_action,
    rewind_action,
    toggle_play_action,
    movie2_action,
    movie3_action,
    movie3_action,
    videoBack1_action,
    toggle_showEffect1_action,
    clear_effect1_action,
    toggle_showEffect1_action,
    videoBack1_action,
    videoBack2_action,
    toggle_showEffect2_action,
    clear_effect2_action,
    toggle_showEffect2_action,
    videoBack2_action,
    scroll_reset_action,
    scroll_next_action,
    scroll_next_action,
    scroll_next_action,
    scroll_next_action,
    scroll_faster_action,
    movie1_action,
    toggle_play_action,
    movie3_action,
    toggle_play_action,
    set_autoplay_on,
    toggle_auto_play,
    toggle_auto_play,
    toggle_auto_play,
  ];
  let secs = 2;
  my.playlistTimer = new PeriodTimer(secs);
  my.autoPlayAction = scroll_next_action;
}

function reset_playlist() {
  my.playlistIndex = 0;
}

function toggle_auto_play() {
  my.autoPlayEnabled = !my.autoPlayEnabled;
}

function set_autoplay_on() {
  my.autoPlayEnabled = 1;
}

function set_autoplay_off() {
  my.autoPlayEnabled = 0;
}

function toggle_autoplay() {
  my.autoPlayEnabled = !my.autoPlayEnabled;
}

function next_playlist() {
  let action = my.playlistItems[my.playlistIndex];
  my.playlistIndex = (my.playlistIndex + 1) % my.playlistItems.length;
  action();
}

function run_playlist() {
  if (my.autoPlayEnabled && my.playlistTimer.check()) {
    my.autoPlayAction();
  }
}

class PeriodTimer {
  // PeriodTimer(period)
  //    period = seconds between trigger
  //      = -1 to never trigger
  //
  constructor(period) {
    this.period = period;
    this.restart();
  }
  restart() {
    this.lastTime = Date.now();
  }
  lapse() {
    let timeNow = Date.now();
    return (timeNow - this.lastTime) / 1000;
  }
  check(period_next) {
    let timeNow = Date.now();
    let lapse = (timeNow - this.lastTime) / 1000;
    if (this.period >= 0 && lapse > this.period) {
      this.lastTime = timeNow;
      if (period_next) period_next();
      return 1;
    }
    return 0;
  }
}
