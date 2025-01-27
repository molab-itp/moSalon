//

function my_setup() {
  my.appTitle = 'Enter Blackfacts';

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-enter-black';
  my.mo_room = 'm1-enter-black';
  my.mo_group = 's0';
  my.nameDevice = 'enter-black';

  // set group for all devices to share item values
  let params = get_url_params();
  console.log('params', params);
  my.mo_group = params.group || my.mo_group;
  if (my.mo_group == 's0') {
    my.mo_room = 'm0-enter-black';
  }

  my.footerHeight = '288px';
  my.qrCodeWidth = '25%';

  console.log('my_setup my.mo_app', my.mo_app, 'my.mo_room', my.mo_room, 'my.mo_group', my.mo_group);
}
