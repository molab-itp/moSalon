//
function my_init() {
  // updated to verify change on mobile
  my.version = '?v=23';
  my.appTitle = 'Facemesh';
  my.isRemote = 1;
  // show detailed log
  my.logLoud = 1;

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

  let bigN = 4.1; // 6.1
  my.thumbWidth = Math.floor(windowWidth) / bigN;
  if (my.thumbWidth < 120) {
    my.thumbWidth = Math.floor(windowWidth / 2.1);
  }

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
    return window.innerWidth > 800;
  };
}
