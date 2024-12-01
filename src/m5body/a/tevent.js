// tevent.js;

function tevent_clear() {
  my.teventOpenDiff = 0;
}

function track_teventDiff() {
  if (my.face_hidden) {
    let lapse = teventOpenLapseSecs();
    // console.log('track_teventDiff face_hidden lapse', lapse);
    if (lapse < my.add_action_delay) {
      // console.log('track_teventDiff return lapse', lapse, 'my.teventOpenState', my.teventOpenState);
      if (!teventActive()) {
        my.teventOpenState = 0;
      }
      return;
    }
  }
  if (teventActive()) {
    if (my.teventOpenState == 0) {
      // edge into teventopened
      my.teventOpenStartTime = Date.now();
      my.teventOpenCount++;
      // console.log('teventopen my.teventOpenCount', my.teventOpenCount, 'my.teventOpenDiff', my.teventOpenDiff);
      // console.log('my.teventOpenState', my.teventOpenState, 'openSecs', teventOpenLapseSecs());
      my.teventOpenState = 1;
    } else if (my.teventOpenState == 1) {
      // teventalready open
      let lapse = teventOpenLapseSecs();
      if (lapse > my.add_action_delay) {
        if (my.add_action_timeoutid) {
          console.log('track_teventDiff return add_action_timeoutid', my.add_action_timeoutid);
          return;
        }
        console.log('teventopen add_action', teventOpenLapseSecs());
        add_action();
        add_action_block(my.add_action_delay);
        my.teventOpenState = 2;
      }
    } else {
      // teventopen already tevent add
      // console.log('my.teventOpenState', my.teventOpenState, 'openSecs', teventOpenLapseSecs());
    }
  } else {
    // teventNOT open
    if (my.teventOpenState) {
      teventOpenLapseSecs();
    }
    my.teventOpenState = 0;
  }
}

function teventActive() {
  return my.teventOpenDiff > 0.05;
}

function teventOpenLapseSecs() {
  if (!teventActive()) {
    my.teventOpenStartTime = Date.now();
    return 0;
  }
  let lapse = (Date.now() - my.teventOpenStartTime) / 1000;
  // console.log('teventOpenLapseSecs lapse', lapse);
  return lapse;
}

function add_action_block(delay) {
  let mdelay = delay * 1000;
  my.add_action_timeoutid = setTimeout(add_action_unblock, mdelay);
}

function add_action_unblock() {
  console.log('add_action_unblock add_action_timeoutid', my.add_action_timeoutid);
  my.add_action_timeoutid = 0;
}
