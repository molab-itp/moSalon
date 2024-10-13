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

  dbase_app_init({ completed: app_init_completed });

  id_footer.innerHTML = my.mo_group + ' ' + id_footer.innerHTML;
}

function app_init_completed() {
  //
  dbase_app_observe({ observed_item });

  function observed_item(item) {
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
  dbase_issue_action('action_next');
}
function previous_action() {
  console.log('previous_action');
  dbase_issue_action('action_previous');
}
function continue_action() {
  console.log('continue_action');
  dbase_issue_action('action_continue');
}

function full_read_action() {
  console.log('full_read_action');
  dbase_issue_action('action_full_read');
}

function rewind_action() {
  console.log('rewind_action');
  dbase_issue_action('action_rewind');
}

function resize_window() {
  console.log('resize_window');
}

function ui_log(...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
