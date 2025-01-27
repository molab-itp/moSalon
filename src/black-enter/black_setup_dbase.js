async function black_setup_dbase() {
  //
  await dbase_app_init(my);

  observe_meta();

  observe_comment_store();
}

function observe_meta() {
  dbase_app_observe({ observed_item }, 'meta');
  function observed_item(item) {
    console.log('observed_item item', item);
    console.log('observed_item item.blackfacts_index', item.blackfacts_index);
    if (item.blackfacts_index != undefined) {
      my.blackfacts_index = item.blackfacts_index;
    }
    my.index_update_pending = 1;
  }
}

function observe_comment_store() {
  dbase_app_observe({ observed_event }, 'comment_store');
  my.comment_store = {};
  function observed_event(event, key, item) {
    console.log('observed_event ', event, key, item);
    switch (event) {
      case 'add':
      case 'change':
        my.comment_store[key] = item;
        break;
      case 'remove':
        delete my.comment_store[key];
        my.comment_prune_pending = 1;
        break;
    }
    my.comment_update_pending = 1;
  }
}
