//
function my_setup() {
  //
  my.version = '?v=119';

  // my.primaryPortion = 0.333;
  my.primaryPortion = 0.5;
  // let bottomMargin = 0;
  let bottomMargin = 90;

  my.canvas = createCanvas(windowWidth, windowHeight - bottomMargin);
  my.canvas.mousePressed(canvas_mousePressed);
  my.canvas.mouseReleased(canvas_mouseReleased);
  my.width = width;
  my.height = height;
  my.paneRatio = 12 / 16;
  // my.isPortrait = height > width;
  my.isPortrait = 1;
  my.scanFlag = 0;

  my.anim_time = 5;

  my.refBox = new RefBox(refBox_init);

  create_panes();

  my.pane = my.pane1;

  create_ui();

  focusAction();

  my.cycleCount = 1;

  setup_dbase();
}
