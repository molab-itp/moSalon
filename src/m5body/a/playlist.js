// playlist.js

function init_playlist() {
  //
  my.playlistEnabled = 0;
  my.playlistIndex = 0;
  my.playlistItems = [];
  let secs = 2;
  my.playlistTimer = new PeriodTimer(secs);
}

function toggle_playlist() {
  my.playlistEnabled = !my.playlistEnabled;
}

function run_playlist() {
  if (my.playlistEnabled && my.playlistTimer.check()) {
    scroll_next_action();
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
