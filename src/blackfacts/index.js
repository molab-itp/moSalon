//

let my = {};

// console.log('BlackFacts index.js');

document.addEventListener('DOMContentLoaded', document_loaded);
// console.log('addEventListener document_loaded');

// window.addEventListener('resize', position_bottom);

function document_loaded() {
  // console.log('document_loaded');

  my_setup();

  init_ui();

  black_setup_dbase();

  // Sometimes in non-remote description does not appear
  setTimeout(update_blackfacts_num_ui, 1000);

  my.animLoop = new Anim({ target: my, time: my.animTime });

  if (my.isRemote) {
    my.pingLoop = new Anim({ target: my, time: my.pingTime, action: pingAction });
  }

  setup_animationFrame();
}

function update_blackfacts_index_dbase(blackfacts_index) {
  console.log('update_blackfacts_index_dbase blackfacts_index', blackfacts_index, 'mo_group', my.mo_group);
  //
  // mo-blackfacts / m0-blackfacts / a_group / s0 / meta / blackfacts_index
  //
  dbase_update_item({ blackfacts_index }, 'meta');
}

function pingAction() {
  let portrait = my.isRemote ? 1 : 0;
  let group = my.mo_group;
  //
  // blackfacts / a_device / uid / { portrait, group }
  //
  // !!@ rename and func break out
  // dbase_site_updates --> dbase_info_update
  // group all per device info uner a_info
  // !!@ --> blackfacts / a_device / uid / a_info / { portrait, group }
  //
  // function dbase_update_device(props) {
  //  dbase_app_update( { a_info: props })
  //
  // dbase_site_updates({ portrait, group });
  // --> dbase_info_update({ portrait, group } )
  //
  dbase_site_updates({ portrait, group });
}

function update_blackfacts_index(newValue) {
  console.log('update_blackfacts_index newValue', newValue, my.blackfacts_index);
  my.blackfacts_index = newValue;

  update_blackfacts_num_ui();

  video_play_index(my.blackfacts_index);
}

function update_blackfacts_num_ui() {
  // url title param will be displayed in animationFrame_callback
  if (params.title) {
    return;
  }
  let index = my.blackfacts_index;
  let entry = dateFactForIndex(index);
  if (!entry) {
    console.log('update_blackfacts_num_ui no entry index', index);
    return;
  }
  let key = dateFactsKeys[index];
  // console.log('update_blackfacts_num_ui key', key);
  let ndate = '2025-' + key.substring(0, 2) + '-' + key.substring(2, 4);
  // console.log('update_blackfacts_num_ui ndate', ndate);
  id_date.value = ndate;
  //
  let description = entry.description;
  let periodIndex = description.indexOf('Narrated by BlackFacts.com');
  if (periodIndex >= 0) {
    description = description.substring(0, periodIndex);
  }
  // console.log('update_blackfacts_num_ui description', description);
  let msg = '#' + (index + 1) + ' ' + dateFactsKeys[index] + ' ' + description;
  show_message_id(msg);
}

function show_message_id(msg) {
  id_blackfacts_num.innerHTML = msg;
  id_message_text.innerHTML = id_blackfacts_num.innerHTML = msg;
}

function mo_blackfacts_qccode_value(newValue) {
  // console.log('mo_blackfacts_qccode_value newValue', newValue);
  my.blackfacts_qrcode = newValue;
}

function ui_log(...args) {
  console.log(...args);
}

function ui_error(...args) {
  ui_log(...args);
  alert(...args);
}
