//
function my_setup() {
  // updated to verify change on mobile
  my.version = '?v=40';
  my.isRemote = 1;
  my.videoFlag = 1;
  // show detailed log
  my.logLoud = 1;

  // Aspect ratio of video capture on mobile device
  let scale = 0.5;
  my.vwidth = 480 * scale;
  my.vheight = 640 * scale;

  if (my.isRemote) {
    my.width = my.vwidth;
    my.height = my.vheight;
  } else {
    my.width = windowWidth;
    my.height = windowHeight;
  }
}
