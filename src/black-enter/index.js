//

let my = {};

console.log('enter blackfacts index.js');

document.addEventListener('DOMContentLoaded', document_loaded);

window.addEventListener('resize', resize_window);

id_link.addEventListener('click', lick_click_action, { passive: true });
id_button_enter.addEventListener('click', enter_click_action);

function document_loaded() {
  console.log('document_loaded');

  black_my_setup();

  black_setup_dbase();

  id_footer.innerHTML = my.mo_group + ' ' + id_footer.innerHTML;
}

// async function setup_dbase() {
//   //
//   await dbase_app_init(my);

//   dbase_app_observe({ observed_item }, 'item');

//   function observed_item(item) {
//     console.log('observed_item item', item);

//     // let line = item.line;
//     // if (line) {
//     //   console.log('line', line);
//     //   id_lineNum.innerText = `(${line.num})`;
//     // }
//   }
// }

function enter_click_action(event) {
  console.log('enter_click_action event.target', event.target);
  console.log('id_link.href', id_link.href);
  console.log('id_email', id_email.value);
  console.log('id_comment', id_comment.value);
  window.open(id_link.href);
}

function lick_click_action(event) {
  console.log('lick_click_action event.target', event.target);
}

function resize_window() {
  // console.log('resize_window');
}

function ui_log(...args) {
  // enter blackfacts ui_log
  console.log(...args);
}

function ui_logv(...args) {
  // enter blackfacts ui_logv
  console.log(...args);
}

function ui_error(...args) {
  // enter blackfacts ui_error
  ui_log(...args);
  alert(...args);
}
