//
function my_setup() {
  //
  // change to your firebase app
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_room = 'm1-vote';
  my.mo_app = 'mo-vote';
  my.nameDevice = 'mo-vote-device';

  // set group for all devices to share item values
  let params = get_url_params();
  console.log('params', params);
  my.mo_group = params.group || 's0';
  console.log('my.mo_group', my.mo_group);
  if (my.mo_group == 's0') {
    my.mo_room = 'm0-vote';
  }

  // dbase  values
  my.vote_count = 0;
  my.vote_total_count = 0;
}

async function setup_dbase() {
  //
  await dbase_app_init(my);

  console.log('startup_completed');

  // !!@ observed_device
  // !!@ observed_item for group
  //
  // check device exists in db
  dbase_devices_observe({ observed_key, observed_item, all: 1 });

  function observed_key(key, device) {
    // console.log('observed_a_device key', key, 'uid', my.uid, 'device', device);
    console.log('observed_key key', key, 'device.vote_count', device && device.vote_count);
  }

  function observed_item(device) {
    console.log('observed_device device.vote_count', device.vote_count);
    if (device.vote_count != undefined) {
      my.vote_count = device.vote_count;
    }
    // dbase_if_action({ item, prop: 'action_switch', actionFunc: switchDirection });

    // !!@ group action vs. device action
    if (dbase_actions_issued(my.uid, { action_switch: 1 })) {
      switchDirection();
    }
  }
}
