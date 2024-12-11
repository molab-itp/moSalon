//
async function video_setup() {
  //
  console.log('video_setup await video_init');
  // my.video is set by video_init or movie_init
  //
  if (my.showCamera) {
    await video_init();
  } else {
    await movie_init();
  }
  // console.log('video_setup new eff_bars');
  //   my.bars = new eff_bars({ width: my.video.width, height: my.video.height });
  my.input = my.videoCapture.capture;
  my.input_aspect_hw = my.videoCapture.capture.height / my.videoCapture.capture.width;
  // my.effects_init_map = {
  //   seg: bodySeg_init,
  //   pose: bodyPose_init,
  //   hand: bodyHand_init,
  // };
  let init = my.effects_init_map[my.effectParam];
  if (!init) {
    console.log('no effect', my.effectParam);
    return;
  }

  if (my.reverseEffectOrder) {
    my.videoCaptures.reverse();
  }

  my.effects = [];
  let index = 0;
  let outline = 0;
  for (let video of my.videoCaptures) {
    let effect = init(video.capture, index, outline);
    effect.label = index;
    // effect.videoCapture = video;
    my.effects.push(effect);

    my.effect = effect;
    index++;
    // Disable triangle box shape
    outline = 1;
  }
  //   my.bestill = new eff_bestill({ factor: 10, input: my.output });
  console.log('video_setup return');
}

function change_video_order() {
  my.videoCaptures.reverse();
  my.effects.reverse();
  let index = 0;
  let outline = 0;
  for (let effect of my.effects) {
    effect.shapeIndex = index;
    effect.outline = outline;
    index++;
    // Disable triangle box shape
    outline = 1;
  }
}

// { effect, output, videoBack, video}
//
function draw_video_effects() {
  // console.log('draw_video_effects effTrails', my.effTrails);

  for (let index = 0; index < my.effects.length; index++) {
    let effect = my.effects[index];
    let videoMovieBack = index == 0;
    let videoBack = my.videoBack;
    if (!videoMovieBack) videoBack = null;
    let output = effect.output;
    let video = effect.input;
    draw_video_effect({ effect, output, videoBack, video, videoMovieBack });
  }
}

function draw_video_effect({ effect, output, videoBack, video, videoMovieBack }) {
  // console.log('draw_video_effect', effect.label, 'enabled', effect.enabled);
  if (videoBack) {
    draw_videoBack({ output, video });
  } else if (!my.effTrails) {
    // my.output.background(0);
    output.clear();
  }
  if (videoMovieBack) {
    draw_videoMovieBack(output);
  }

  if (effect.enabled) {
    effect.prepareOutput();
  }

  // let aspect = my.video.height / my.video.width;
  let w = output.width;
  let h = output.width * my.input_aspect_hw;
  if (my.flipcanvas) {
    // push();
    scale(-1, 1);
    image(output, -w, 0);
    // pop();
  } else {
    image(output, 0, 0, w, h);
  }
}

// show my.videoCapture.capture
//
function draw_videoBack({ output, video }) {
  // let aspect = my.video.height / my.video.width;
  let w = output.width;
  let h = output.width * my.input_aspect_hw;
  output.push();
  output.scale(-1, 1);
  output.image(my.videoCapture.capture, 0, 0, -w, h);
  output.pop();
}

function draw_video() {
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  image(my.videoCapture.capture, 0, 0, w, h);
}
