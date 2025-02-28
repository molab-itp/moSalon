//

import { start_download } from './start_download.js';

let my = {};
let dbase;

export async function setup_dbase() {
  //
  my.savePath = '../../../2024-moSalon-Store/snap';

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jhtitp';
  my.mo_app = 'mo-photo';
  my.mo_room = 'm0-photo';
  my.mo_group = 's0';

  // my.mo_app = 'mo-test';
  // my.mo_room = 'm0-test';
  // my.nameDevice = 'mo-test-device';
  if (!globalThis.window) my.nameDevice += '-node';

  dbase = await mo_dbase_init(my);
  my.dbase = dbase;

  observe_item();

  observe_photo_store();

  // observe_devices();

  console.log('setup_dbase done');
}

function observe_item() {
  //
  dbase.observe('item', { observed_item });
  //
  function observed_item(item) {
    console.log('observed_item item', item);
    if (item.test_count != undefined) {
      my.test_count = item.test_count;
    }
    if (item.test_step != undefined) {
      my.test_step_changed = my.test_step != item.test_step;
      console.log('test_step diff', my.test_step, item.test_step);
      my.test_step = item.test_step;
    }
  }
}

function observe_photo_store() {
  //
  // mo-test / m0-test / a_group / s0 / comment_store
  //
  dbase.observe('photo_store', { observed_event });
  //
  my.comment_store = {};
  function observed_event(event, key, item) {
    // console.log('observed_event ', event, key, item);
    switch (event) {
      case 'add':
      case 'change':
        my.comment_store[key] = item;

        item.key = key;
        start_download(my, item);

        break;
      case 'remove':
        delete my.comment_store[key];
        break;
    }
  }
}

function observe_devices() {
  //
  dbase.devices_observe({ observed_key, observed_item });
  //
  // mo-test / m0-test / a_device / ${uid}
  // item info for all devices in the room
  //
  function observed_key(key, item) {
    console.log('observe_devices observed_key key', key, 'item', item);
  }
  //
  // mo-test / m0-test / a_device / ${my.uid}
  // item info for my device
  //
  function observed_item(item) {
    console.log('observe_devices observed_item', item);
  }
}
