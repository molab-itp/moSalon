//
function my_setup() {
  let lowerMargin = 100; // Room for buttons
  my.width = windowWidth;
  my.height = windowHeight - lowerMargin;

  // change to your firebase app
  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.dbase_rootPath = 'm0-@r-@w-';
  my.roomName = 'm1-vote';
  my.mo_app = 'mo-vote';
  my.nameDevice = 'mo-vote-device';

  // set group for all devices to share item values
  let params = get_url_params();
  console.log('params', params);
  my.group = params.group || 's0';
  console.log('my.group', my.group);
  if (my.group == 's0') {
    my.roomName = 'm0-vote';
  }

  // dbase shared values
  //
  my.vote_count = 0;
  my.vote_total_count = 0;

  my.x = 0;
  my.y = my.height / 2;
  my.xstep = 1;
  my.len = my.width * 0.8;

  my.colorGold = [187, 165, 61];
  my.colors = [[255, 0, 0], [0, 255, 0], my.colorGold];
}
