// index.js
//
// take snap shot of firebase database and storage
//

import { setup_dbase } from './setup_dbase.js';

console.log('in snap.js');

// starting point
//
async function snap_start() {
  console.log('in snap_start');

  await setup_dbase();

  setup_animationFrame();
}

function setup_animationFrame() {
  if (globalThis.window) {
    window.requestAnimationFrame(animationFrame_callback);
  } else {
    setTimeout(animationFrame_callback, 0);
  }
}

function animationFrame_callback(timeStamp) {
  let timeSecs = timeStamp / 1000;
  // console.log('step_animation timeStamp', timeStamp);
  // window.requestAnimationFrame(animationFrame_callback);
  setup_animationFrame();
}

// id_console_ul

function ui_log(...args) {
  console.log(...args);
  let str = args.join(' ') + '<br/>';
  if (globalThis.id_console_ul) {
    id_console_ul.innerHTML += str;
  }
}
globalThis.ui_log = ui_log;

function ui_verbose(...args) {
  // console.log(...args);
}
globalThis.ui_verbose = ui_verbose;

snap_start();
