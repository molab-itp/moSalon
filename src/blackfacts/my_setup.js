function my_setup() {
  // console.log('my_setup');
  //
  // my.fireb_config = 'jht9629';
  // // my.fireb_config = 'jht1493';
  // // my.fireb_config = 'jhtitp';
  // my.dbase_rootPath = 'm0-@r-@w-';
  // my.mo_app = 'mo-blackfacts';
  // my.roomName = 'room0';
  // // my.roomName = 'room1';
  black_my_setup();

  my.blackfacts_index = -1;
  my.stepCount = 0;
  my.animTime = 7;
  my.nameDevice = 'device?v=44';
  my.pingTime = 1;

  my.isRemote = !my.showQRCode();

  my.qrCodeClickAction = qrcode_click_action;
}
