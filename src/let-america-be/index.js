//

let my = {};

console.log('let-america-rewind index.js');

document.addEventListener('DOMContentLoaded', document_loaded);

window.addEventListener('resize', resize_window);

id_rewind_btn.addEventListener('click', rewind_action);
id_full_read_btn.addEventListener('click', full_read_action);
id_next_btn.addEventListener('click', next_action);
id_previous_btn.addEventListener('click', previous_action);
id_continue_btn.addEventListener('click', continue_action);

function document_loaded() {
  console.log('document_loaded');

  my_setup();

  setup_dbase();

  id_footer.innerHTML = my.mo_group + ' ' + id_footer.innerHTML;
}

async function setup_dbase() {
  //
  await dbase_app_init(my);

  dbase_app_observe({ observed_item }, 'item');

  function observed_item(item) {
    console.log('observed_item item', item);

    let line = item.line;
    if (line) {
      console.log('line', line);
      id_lineNum.innerText = `(${line.num})`;
      id_lineText.innerText = line.text; // `(${line.num}) ${line.text}`;
      id_lineText.style.backgroundColor = line.color;
    }
  }
}

// next | previous | continue
function next_action() {
  console.log('next_action');
  dbase_issue_action('action_next', 'item');
}
function previous_action() {
  console.log('previous_action');
  dbase_issue_action('action_previous', 'item');
}
function continue_action() {
  console.log('continue_action');
  dbase_issue_action('action_continue', 'item');
}

function full_read_action() {
  console.log('full_read_action');
  dbase_issue_action('action_full_read', 'item');
}

function rewind_action() {
  console.log('rewind_action');
  dbase_issue_action('action_rewind', 'item');
}

function resize_window() {
  // console.log('resize_window');
}

function ui_log(...args) {
  // let-america-be ui_log
  console.log(...args);
}

function ui_logv(...args) {
  // let-america-be ui_logv
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
