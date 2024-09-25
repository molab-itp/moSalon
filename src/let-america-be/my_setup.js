//

function my_setup() {
  my.appTitle = 'Let Ameria Be';

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'm1-america';
  my.mo_app = 'mo-america-be';
  my.nameDevice = 'america';

  // set group for all devices to share item values
  let params = get_url_params();
  console.log('params', params);
  my.group = params.group || 's0';
  console.log('my.group', my.group);
  if (my.group == 's0') {
    my.roomName = 'm0-america';
  }

  my.footerHeight = '288px';
  my.qrCodeWidth = '25%';
}
