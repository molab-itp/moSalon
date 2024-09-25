// https://editor.p5js.org/jht9629-nyu/sketches/EEafnQwr1
// p5moExamples vote 47

// all the functions start with "dbase_" are from p5moLibrary repo

// participants can cast a numeric vote up or down

let my = {};

// mo-vote/device/{uid}/vote
//    individual vote

function setup() {
  //
  let lowerMargin = 100; // Room for buttons
  my.width = windowWidth;
  my.height = windowHeight - lowerMargin;

  my_setup(); // setup firebase configuration

  my.canvas = createCanvas(my.width, my.height);
  // noCanvas();

  setup_dbase();

  my.x = 0;
  my.y = my.height / 2;
  my.xstep = 1;
  my.len = my.width * 0.8;

  my.colorGold = [187, 165, 61];
  my.colors = [[255, 0, 0], [0, 255, 0], my.colorGold];

  create_ui();
}

function draw() {
  background(0);
  fill(my.colors[abs(my.vote_count) % my.colors.length]);
  circle(my.x, my.y, my.len);
  my.x = (my.x + my.xstep + width) % width;

  calc_votes();

  my.vote_count_span.html(my.vote_count);
  my.vote_total_count_span.html(my.vote_total_count);

  // dbase_poll();
}

function voteUpAction() {
  console.log('Vote Up');
  dbase_update_props({ vote_count: dbase_increment(1) });
}

function voteDownAction() {
  console.log('Vote Down');
  dbase_update_props({ vote_count: dbase_increment(-1) });
}

function switchDirectionAction() {
  dbase_issue_actions({ action_switch: 1 }, { all: 1 });
  // dbase_issue_action('action_switch');
}

function removeAppAction() {
  dbase_remove_mo_app();
}

function switchDirection() {
  my.xstep = my.xstep * -1;
}

function calc_votes() {
  my.vote_total_count = 0;
  let a_devices = dbase_a_devices();
  for (let device of a_devices) {
    if (device.vote_count != undefined) {
      my.vote_total_count += device.vote_count;
    }
  }
}

// F5 to select chrome
// VS Code menu: Run > Start Debugging

// .vscode/launch.json
//    "url": "http://localhost:5500/examples/vote/",

// https://stackoverflow.com/questions/46945784/how-to-debug-javascript-in-visual-studio-code-with-live-server-running
