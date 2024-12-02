//
function my_setup() {
  // updated to verify change on mobile
  my.version = '?v=78';
  my.isRemote = 1;
  my.videoFlag = 1;
  // show detailed log
  my.logLoud = 1;

  // Aspect ratio of video capture on mobile device
  let scale = 0.5;
  my.vwidth = 480 * scale;
  my.vheight = 640 * scale;
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-photo';
  my.mo_room = 'room1';
  my.mo_group = 'group1';

  // my.nameDevice = '';
  my.query = get_url_params();
  if (my.query) {
    my.mo_room = my.query.room || my.mo_room;
    my.mo_group = my.query.group || my.mo_group;
  }

  if (my.isRemote) {
    my.width = my.vwidth;
    my.height = my.vheight;
  } else {
    my.width = windowWidth;
    my.height = windowHeight;
  }
}

async function setup_dbase() {
  //
  await dbase_app_init(my);

  dbase_app_observe({ observed_item });

  function observed_item(device) {
    console.log('observed_item device', device);
    // console.log('observed_item device.photo_index', device.photo_index);
    // console.log('observed_item device.photo_list', device.photo_list);
    if (device.photo_list != undefined) {
      my.photo_list = device.photo_list;
    } else {
      // Removing all photos will remove all img divs
      my.photo_list = [];
      img_remove_all();
    }
    if (device.photo_index != undefined) {
      my.photo_index = device.photo_index;
    }
    photo_list_display();
  }
}
