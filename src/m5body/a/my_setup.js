//
function my_init() {
  // updated to verify change on mobile
  my.version = '?v=47';

  my.reverseEffectOrder = 0;
  my.scroller_rate = 0.03;
  my.nscrollImages = 69;
  my.scrollerImagesPath = '../../external_media/images';
  my.moviesPath = '../../external_media/movies';

  // my.scrollByFaster = 15;
  // my.scrollByNormal = 1;
  // my.scrollBy = my.scrollByNormal;

  my.dim = { width: 1920, height: 1080 };
  my.matter_strokeWeight = 5;

  my.effects_init_map = {
    seg: bodySeg_init,
    pose: bodyPose_init,
    hand: bodyHand_init,
  };

  my.showCamera = 1;
  my.effTrails = 0;

  my.movieSpecs = [
    {
      moviePath: my.moviesPath + '/Flaring-Black-Hole-V404-Cygni.mp4',
      scale: 1.0,
      isVisible: 0,
      shouldPlay: 1,
      scrollY: 1,
      loop: 1,
      scrollEnabled: 1,
    },
    {
      moviePath: my.moviesPath + '/Red-Green-Gold-Charles.mp4',
      scale: 0.3,
      isVisible: 0,
      shouldPlay: 0,
      // flipH: 1,
      centerX: 1,
      volume: 1,
      loop: 1,
    },
    {
      moviePath: my.moviesPath + '/marching-Zeshan-B.mp4',
      // scale: 0.333,
      scale: 0.5,
      isVisible: 0,
      shouldPlay: 0,
      // flipH: 1,
      // offsetX: 1,
      centerX: 1,
      offsetY: 40,
      volume: 1,
      loop: 1,
    },
  ];
  my.appTitle = 'm5body';
  my.isRemote = 1;
  // show detailed log
  my.logLoud = 1;

  my.add_action_delay = 0.5;
  my.teventOpenDiff = 0;

  my.fireb_config = 'jht9629';
  // my.fireb_config = 'jht1493';
  // my.fireb_config = 'jhtitp';
  my.dbase_rootPath = 'm0-@r-@w-';
  my.mo_app = 'mo-m5body';
  my.mo_room = 'm5body';
  my.mo_group = 'facemesh';
  my.nameDevice = 'm5body';

  my.photo_index = 0;
  my.photo_max = 512;
  // my.photo_max = 4;
  my.photo_list = [];

  let scale = 0.5;
  // let scale = 1.0;
  my.vwidth = 480 * scale;
  my.vheight = 640 * scale;
  // my.vwidth = 640 * scale;
  // my.vheight = 480 * scale;
  // my.top_percent = 80;
  my.top_percent = 100;
  my.long = 0;

  // my.imageQuality = 1;
  my.imageQuality = 0.5;
  my.imageExt = '.jpg';
  my.effectParam = 'hand'; // seg | pose | hand

  init_query();

  if (my.long) {
    [my.vwidth, my.vheight] = [my.vheight, my.vwidth];
  }
  console.log('my.vwidth, my.vheight', my.vwidth, my.vheight, 'my.long', my.long);

  my.show_mesh = 1;

  my.footerHeight = '288px';
  my.qrCodeWidth = '15%';

  if (my.mo_group == 's0') {
    my.mo_room = 'm0-posenet';
    my.showButtons = 1;
    my.showRemove = 1;
  }
  if (my.showRemove) {
    my.photo_max = Number.MAX_SAFE_INTEGER;
  }
  my.qrcode_url = () => {
    return `qrcode-${my.mo_group}/${my.mo_group}.png`;
  };
  my.showQRCode = (options) => {
    options.hide_footer = 1;
    // qrCode is only shown for screen width greater than 800
    return window.innerWidth > 800;
  };

  window_resized();
}

function init_query() {
  //
  my.query = get_url_params();
  if (!my.query) return;

  my.mo_room = my.query.room || my.mo_room;
  my.mo_group = my.query.group || my.mo_group;
  my.isRemote = parseFloat(my.query.remote || my.isRemote);
  my.photo_max = parseFloat(my.query.photo_max || my.photo_max);
  my.top_percent = parseFloat(my.query.top_percent || my.top_percent);
  my.long = parseFloat(my.query.long || my.long);
  my.showButtons = parseFloat(my.query.show_buttons || my.showButtons);
  my.showRemove = parseFloat(my.query.show_remove || my.showRemove);

  my.params = {};
  my.effTrails = parseFloat(my.query.trail || 0);
  my.showCamera = parseFloat(my.query.camera || my.showCamera);
  my.flipH = !!parseFloat(my.query.fliph || my.flipH);
  my.invert = !!parseFloat(my.query.invert || my.invert);
  // effect = seg | pose
  my.effectParam = my.query.effect || my.effectParam;

  my.flipcanvas = !!parseFloat(my.query.flipcanvas || my.flipcanvas);

  //  seg_model: BodyPix
  //    seg_mask: parts | background | person,
  //  seg_model: SelfieSegmentation
  //    seg_mask: background | person,

  my.seg_model = my.query.seg_model || 'BodyPix'; // 'BodyPix',
  my.seg_mask = my.query.seg_mask || 'background'; // 'background',

  if (my.query.dim) {
    // &dim=960x540
    let dim = my.query.dim.split('x');
    my.dim = { width: dim[0] || 960, height: dim[1] || 540 };
    my.dim.width = parseFloat(my.dim.width);
    my.dim.height = parseFloat(my.dim.height);
  }
}

window.addEventListener('resize', window_resized);

function window_resized() {
  my.gallery_margin = '40px';
  let perRow = 4.4; // 6.1
  my.thumbWidth = Math.floor(windowWidth) / perRow;
  // console.log('window_resized my.thumbWidth', my.thumbWidth);
  if (my.thumbWidth < 120) {
    perRow = 4.5;
    my.thumbWidth = Math.floor(windowWidth) / perRow;
    my.gallery_margin = '20px';
  }
  // console.log('window_resized windowWidth', windowWidth, 'my.thumbWidth', my.thumbWidth);
}

/*

cd /Users/jht2/Documents/projects/2024-moSalon/moRelease/media
ls -1

2013-JHT-YR2-231n-15s.mov
2013-JHT-YR2-231n-1h-2s-src.mp4
2023-10-18-IMG_0524-30min-silent.mov
JHT-2010-Ashtanga-02-silent.m4v

 */
