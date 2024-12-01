//

function bodySeg_init() {
  let eff_spec = {
    eff_label: 'bodySeg',
    urect: {
      x0: 0,
      y0: 0,
      width: width,
      height: height,
    },
  };
  //  modelName: BodyPix
  //    maskType: parts | background | person,
  //  modelName: SelfieSegmentation
  //    maskType: background | person,
  let props = {
    eff_spec,
    input: my.video,
    hi_rez: 1,
    modelName: my.seg_model, // 'BodyPix',
    maskType: my.seg_mask, // 'background',
    // !!@ flipped cause failure with width zero
    hflip: my.flipH,
    invert: my.invert,
  };
  return new eff_bodySeg(props);
  // my.effect = new eff_bodySeg(props);
  // my.output = my.effect.output;
}

// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=0&effect=seg&flipcanvas=1
// http://127.0.0.1:5502/src/m5body/index.html?camera=0&fliph=0&invert=1&effect=seg&flipcanvas=0&seg_model=BodyPix&seg_mask=parts
// http://127.0.0.1:5502/src/m5body/index.html?camera=0&fliph=0&invert=0&effect=seg&flipcanvas=0&seg_model=BodyPix&seg_mask=background
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=1&effect=seg&flipcanvas=1&seg_model=BodyPix&seg_mask=parts
// http://127.0.0.1:5502/src/m5body/index.html?camera=1&fliph=0&invert=1&effect=seg&flipcanvas=1&seg_model=BodyPix&seg_mask=parts&dim=960x540
// http://127.0.0.1:5502/src/m5body/index.html?dim=1920x1080&flipcanvas=0&effect=hand
// http://127.0.0.1:5502/src/m5body/index.html?dim=960x540&flipcanvas=0&effect=hand
