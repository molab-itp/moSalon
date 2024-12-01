//
async function video_setup() {
  //
  console.log('video_setup await video_init');
  // my.video is set by video_init or movie_init
  //
  if (my.showCamera) {
    await video_init();
  } else {
    movie_init();
  }
  // console.log('video_setup new eff_bars');
  //   my.bars = new eff_bars({ width: my.video.width, height: my.video.height });
  my.input = my.video;
  my.input_aspect_hw = my.video.height / my.video.width;
  // my.effects_init_map = {
  //   seg: bodySeg_init,
  //   pose: bodyPose_init,
  //   hand: bodyHand_init,
  // };
  let init = my.effects_init_map[my.effectParam];
  if (init) {
    my.effect = init();
    my.output = my.effect.output;
  } else {
    console.log('no effect', my.effectParam);
  }
  //   my.bestill = new eff_bestill({ factor: 10, input: my.output });
  console.log('video_setup return');
}

function draw_videoBack() {
  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  // my.output.image(my.video, 0, 0, w, h);
  my.output.push();
  my.output.scale(-1, 1);
  my.output.image(my.video, 0, 0, -w, h);
  my.output.pop();
}

function draw_video() {
  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  image(my.video, 0, 0, w, h);
}

function draw_video_effects() {
  // my.output.background(my.avg_color);
  // console.log('draw_video_effects effTrails', my.effTrails);
  if (my.videoBack) {
    draw_videoBack();
  } else if (!my.effTrails) {
    // my.output.background(0);
    my.output.clear();
  }
  draw_videoMovieBack();

  my.effect.prepareOutput();

  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  if (my.flipcanvas) {
    // push();
    scale(-1, 1);
    image(my.output, -w, 0);
    // pop();
  } else {
    image(my.output, 0, 0, w, h);
  }
}
