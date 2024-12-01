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
  my.input = my.video;
  my.input_aspect_hw = my.video.height / my.video.width;
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
    my.videos.reverse();
  }

  my.effects = [];
  let index = 0;
  for (let video of my.videos) {
    let effect = init(video, index);
    my.effects.push(effect);

    my.effect = effect;
    // Disable triangle box shape
    // index++;
  }
  //   my.bestill = new eff_bestill({ factor: 10, input: my.output });
  console.log('video_setup return');
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
  if (videoBack) {
    draw_videoBack({ output, video });
  } else if (!my.effTrails) {
    // my.output.background(0);
    output.clear();
  }
  if (videoMovieBack) {
    draw_videoMovieBack(output);
  }

  effect.prepareOutput();

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

// show my.video
//
function draw_videoBack({ output, video }) {
  // let aspect = my.video.height / my.video.width;
  let w = output.width;
  let h = output.width * my.input_aspect_hw;
  // output.image(my.video, 0, 0, w, h);
  output.push();
  output.scale(-1, 1);
  // output.image(video, 0, 0, -w, h);
  output.image(my.video, 0, 0, -w, h);
  output.pop();
}

function draw_video() {
  // let aspect = my.video.height / my.video.width;
  let w = my.output.width;
  let h = my.output.width * my.input_aspect_hw;
  image(my.video, 0, 0, w, h);
}
