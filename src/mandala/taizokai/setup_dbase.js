//
async function setup_dbase() {
  //
  my.appTitle = 'mind-taizokai';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-taizokai';
  my.mo_room = 'm1-taizokai';
  my.mo_group = 's0';
  my.nameDevice = 'taizokai';

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';

  my.refBox_inited = 0;

  await dbase_app_init(my);

  dbase_app_observe({ observed_item }, 'item');

  function observed_item(item) {
    // console.log('observed_item item', item);

    let refBox = item.refBox;
    console.log('observed_item refBox', refBox);
    console.log('observed_item my.refBox_inited', my.refBox_inited);
    if (refBox && !my.refBox_inited) {
      my.refBox_inited = 1;
      my.refBox.restore_refBox(refBox);
      refIndexSync();
    }
  }
}

//   dbase_issue_action('action_rewind', 'item');
