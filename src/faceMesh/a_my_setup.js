//
function my_init() {
  // updated to verify change on mobile
  my.version = '?v=33';
  my.appTitle = 'Facemesh';
  my.isRemote = 1;
  // show detailed log
  my.logLoud = 1;

  my.add_action_delay = 0.5;
  my.lipsDiff = 0;

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'm1-facemesh';
  my.mo_app = 'mo-facemesh';
  my.group = 's0';
  my.nameDevice = 'facemesh';

  my.photo_index = 0;
  my.photo_max = 64;
  // my.photo_max = 4;
  my.photo_list = [];

  let scale = 0.5;
  // let scale = 1.0;
  my.vwidth = 480 * scale;
  my.vheight = 640 * scale;
  // my.vwidth = 640 * scale;
  // my.vheight = 480 * scale;
  my.top_percent = 80;
  my.long = 0;

  // my.imageQuality = 1;
  my.imageQuality = 0.5;
  my.imageExt = '.jpg';

  my.query = get_url_params();
  if (my.query) {
    my.roomName = my.query.room || my.roomName;
    my.group = my.query.group || my.group;
    my.isRemote = parseFloat(my.query.remote || my.isRemote);
    my.photo_max = parseFloat(my.query.photo_max || my.photo_max);
    my.top_percent = parseFloat(my.query.top_percent || my.top_percent);
    my.long = parseFloat(my.query.long || my.long);
  }
  if (my.long) {
    [my.vwidth, my.vheight] = [my.vheight, my.vwidth];
  }
  console.log('my.vwidth, my.vheight', my.vwidth, my.vheight, 'my.long', my.long);

  // my.isMobile = window.innerWidth < 600;

  my.show_mesh = 1;

  my.footerHeight = '288px';
  my.qrCodeWidth = '25%';

  if (my.group == 's0') {
    my.roomName = 'm0-facemesh';
  }

  my.qrcode_url = () => {
    return `qrcode/${my.group}.png`;
  };
  my.showQRCode = () => {
    // qrCode is only shown for screen width greater than 800
    return window.innerWidth > 800;
  };

  window_resized();
}

async function setup_dbase() {
  //
  await dbase_app_init();

  // !!@ vote uses dbase_devices_observe
  dbase_app_observe({ observed_item });

  function observed_item(device) {
    // console.log('observed_item device', device);
    // console.log('observed_item device.photo_index', device.photo_index);
    // console.log('observed_item device.photo_list', device.photo_list);
    if (device.photo_list != undefined) {
      set_photo_list(device.photo_list);
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

  stopLoader(); // for init
  my.waiting_for_first_mesh = 1;
  startLoader();
}

function add_action_startLoader() {
  startLoader();
  if (!my.add_action_loading) my.add_action_loading = 0;
  my.add_action_loading++;
  if (my.add_action_loading == 1) {
    my.add_action_startTime = Date.now();
  }
  console.log('add_action_startLoader ', my.add_action_loading);
}

function add_action_stopLoader() {
  if (my.add_action_loading) {
    stopLoader();
    my.add_action_loading--;
    let lapse = (Date.now() - my.add_action_startTime) / 1000;
    console.log('add_action_stopLoader ', my.add_action_loading, 'lapse', lapse);
  }
}

window.addEventListener('resize', window_resized);

function window_resized() {
  my.gallery_margin = '40px';
  let perRow = 4.4; // 6.1
  my.thumbWidth = Math.floor(windowWidth) / perRow;
  console.log('window_resized my.thumbWidth', my.thumbWidth);
  if (my.thumbWidth < 120) {
    perRow = 4.5;
    my.thumbWidth = Math.floor(windowWidth) / perRow;
    my.gallery_margin = '20px';
  }
  console.log('window_resized windowWidth', windowWidth, 'my.thumbWidth', my.thumbWidth);
}
