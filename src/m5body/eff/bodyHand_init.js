//

function bodyHand_init() {
  // my.output = createGraphics(width, height);
  // // my.output.noStroke();
  // my.output.clear();
  let eff_spec = {
    eff_label: 'bodyPose',
    urect: {
      x0: 0,
      y0: 0,
      width: width,
      // height: height,
      height: width * my.input_aspect_hw,
    },
  };
  let props = {
    eff_spec,
    input: my.video,
    hi_rez: 1,
    alpha: 255,
    figure_color: 0,
    // hflip: 0,
    hflip: my.flipH,
    show_head: 1,
    // ndetect: 10,
    // ndetect: Number.MAX_SAFE_INTEGER,
    ndetect: 1,
    penScale: 0.5,
    penPointsMax: 50,
    stroke_weight: 0.2,
  };
  my.effect = new eff_bodyHand(props);

  my.output = my.effect.output;
}

// https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet

// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=pose
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=pose&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=1&invert=0&effect=pose&dim=960x540

// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=1&effect=seg&flipcanvas=1&seg_model=BodyPix&seg_mask=parts&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=1&invert=0&effect=pose&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=pose&dim=960x540&flipcanvas=1

// http://127.0.0.1:5502/src/m5body/index.html?dim=1920x1080&flipcanvas=1&effect=hand
// http://127.0.0.1:5502/src/m5body/index.html?dim=1920x1080&flipcanvas=1&trail=1
// http://127.0.0.1:5502/src/m5body/index.html?dim=960x540&flipcanvas=0&effect=hand

// http://127.0.0.1:5502/src/m5body/index.html?&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?&dim=640x480
// http://127.0.0.1:5502/src/m5body/index.html?&dim=1920x1080
