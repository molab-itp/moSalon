//

// {
//  maskType: parts | background,
//  modelName: BodyPix | SelfieSegmentation
// }
class eff_bodySeg {
  static meta_props = {
    // alpha: [255, 230, 180, 100, 10],
    // ndetect: [4, 1, 2, 3],
  };
  constructor(props) {
    // console.log('eff_pose_net init');
    Object.assign(this, props);
    this.init();
  }
  initModel() {
    ui_message('loading model...');
    let options = {
      maskType: 'parts',
      // maskType: 'background', //
      // !!@ flipped cause failure with width zero
      // flipped: this.hflip,
    };
    if (this.maskType) {
      options.maskType = this.maskType;
    }
    // let modelName = 'SelfieSegmentation';
    let modelName = this.modelName;
    console.log('modelName', modelName, 'options', options);
    this.bodySeg = ml5.bodySegmentation(modelName, options, () => {
      // this.bodySeg = ml5.bodySegmentation('BodyPix', options, () => {
      console.log('eff_bodySeg modelLoaded!');
      ui_message('');
      this.bodySeg.detectStart(this.video, (results) => {
        // console.log('eff_bodySeg results', results);
        a_results = results;
        this.segmentation = results;
      });
    });
  }
  prepareOutput() {
    // console.log('eff_pose_net prepareOutput bodySeg', this.bodySeg);
    my.teventOpenDiff = 1;
    let layer = this.output;
    let segmentation = this.segmentation;
    // console.log('eff_bodySeg prepareOutput segmentation', segmentation);
    if (segmentation) {
      let mask = segmentation.mask;
      if (this.maskType == 'parts') {
        layer.image(mask, 0, 0, layer.width, layer.height);
      } else {
        this.video.mask(mask);
        layer.image(this.video, 0, 0, layer.width, layer.height);
      }
      if (this.invert) {
        layer.filter(INVERT);
      }
    }
  }
  init() {
    // console.log('eff_pose_net this.input.elt', this.input.elt);
    let w = this.input.width;
    let h = this.input.height;
    if (this.hi_rez) {
      w = this.eff_spec.urect.width;
      h = this.eff_spec.urect.height;
    }
    console.log('eff_pose_net w, h', w, h);
    this.output = createGraphics(w, h);
    this.output.noStroke();
    // this.video = this.input.elt;
    this.video = this.input;
    if (!this.modelName) {
      this.modelName = 'BodyPix';
    }
    this.initModel();
  }
  ready() {
    return this.segmentation;
  }
}

// For debugging
let a_results;

// https://learn.ml5js.org/#/reference/posenet
// https://editor.p5js.org/ml5/sketches/PoseNet_webcam

// https://editor.p5js.org/ml5/sketches/KNsdeNhrp

// https://docs.ml5js.org/#/reference/body-segmentation

// modelName: Optional. A string specifying which model to use. Types of model:
// SelfieSegmentation(default): A model that can be used to segment people from the background.
// BodyPix: A model that can be used to segment people and body parts.

// results.mask under different maskType options:
// background: A mask of the background. results.mask is an image with transparent pixels on the background and black pixels on the person.
// body: A mask of the person. results.mask is an image with black pixels on the background and transparent pixels on the person.
// parts: BodyPix only. results.mask is an image with white pixels on the background and various color pixels for each body part.

/*

bodySegmentation.detectStart(media, callback);

media: An HTML or p5.js image, video, or canvas element to run the segmentation on.

callback(output, error): Optional. A callback function to handle the results of the body segmentation.

{
  mask: {}, // a p5 Image object, can be directly passed into p5 image() function
  maskImageData: {}, // the mask as an ImageData object
  data: [], // an array of raw detection results
  imageData: {}, // an ImageData object of the raw detection results
}

The data array contains the underlying segmentation result of the image, stored
as one number per pixel of the input image. (With the BodyPix model, the right
hand is e.g. the number 11, which is the same as bodySegmentation.LEFT_HAND.)

https://github.com/tensorflow/tfjs-models/blob/master/body-segmentation/src/body_pix/README.md#create-a-detector
multiSegmentation
segmentBodyParts
flipHorizontal
maxDetections

my. effect.bodySeg.RIGHT_HAND

*/
