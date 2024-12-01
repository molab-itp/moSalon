//

function bodyPose_init(input) {
  // my.output = createGraphics(width, height);
  // // my.output.noStroke();
  // my.output.clear();
  let eff_spec = {
    eff_label: 'bodyPose',
    urect: {
      x0: 0,
      y0: 0,
      width: width,
      height: height,
    },
  };
  let props = {
    eff_spec,
    input, // : my.video,
    hi_rez: 1,
    alpha: 255,
    figure_color: 1,
    stroke_weight: 0,
    points: 0,
    points_size: 10,
    points_color_offset: 0,
    skel: 0,
    skel_weight: 0,
    skel_color_offset: 0,
    // hflip: 0,
    hflip: my.flipH,
    show_head: 1,
    ndetect: 1,
  };
  return new eff_bodyPose(props);
  // my.effect = new eff_bodyPose(props);
  // my.output = my.effect.output;
}

// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=pose
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=pose&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=1&invert=0&effect=pose&dim=960x540

// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=1&effect=seg&flipcanvas=1&seg_model=BodyPix&seg_mask=parts&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=1&invert=0&effect=pose&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=pose&dim=960x540&flipcanvas=1
