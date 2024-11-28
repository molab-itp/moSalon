//

class eff_bodyHand {
  static meta_props = {
    alpha: [255, 230, 180, 100, 10],
    ndetect: [1, 1, 2, 3],
    hflip: [1, 0],
    show_head: [1, 0],
  };
  constructor(props) {
    // console.log('eff_pose_net init');
    Object.assign(this, props);
    this.init();
  }
  clear() {
    this.points = [];
    this.lerpPoints = [];
    if (this.matterMgr) this.matterMgr.clear();
  }
  prepareOutput() {
    // console.log('eff_pose_net prepareOutput poseNet', this.bodyPose);
    if (this.bodyPose) {
      this.bodyPose.video = this.video;
    }
    window.a_poses = this.poses;

    if (this.matterMgr) {
      this.matterMgr.draw();
    }

    this.penLayer.clear();
    this.drawFigure(this.penLayer, this.poses);

    this.drawPointPairs(this.penLayer);

    this.output.image(this.penLayer, 0, 0);
  }
  initModel() {
    ui_message('loading model...');
    ml5.setBackend('webgl'); // !!@ webgpu issue
    // let options = { flipHorizontal: this.hflip, maxPoseDetections: this.ndetect };
    console.log('eff_bodyHand hflip', this.hflip);
    let flipped = this.hflip;
    this.bodyPose = ml5.bodyPose('MoveNet', { flipped }, () => {
      console.log('eff_bodyHand modelLoaded!');
      ui_message('');
      this.bodyPose.detectStart(this.input, (results) => {
        // console.log('eff_bodyHand results', results);
        this.poses = results;
        // confidence
        if (results.length > 0) {
          a_poses = results;
        }
      });
    });
  }
  drawPointPairs(layer) {
    layer.strokeWeight(this.pen_stroke_weight);
    let n = this.points.length;
    for (let index = 0; index < n; index += 3) {
      this.drawPoints(layer, index, 0);
      this.drawPoints(layer, index, 1);
      this.drawPoints(layer, index, 2);
    }
  }
  drawPoints(layer, index, offset) {
    // console.log('drawPoints', points);
    let points = this.points[index + offset];
    if (!points) return;
    let colr = dot_colors[offset];
    // colr[3] = 100;
    layer.stroke(colr);
    let prior = points[0];
    for (let index = 1; index < points.length; index++) {
      let now = points[index];
      layer.line(prior.x, prior.y, now.x, now.y);
      prior = now;
    }
    this.checkPointsDelete(points);
  }
  checkPointsDelete(points) {
    if (points.length >= this.penPointsMax) {
      points.splice(0, 1);
    }
  }
  blast() {
    let ew = my.eyeWidth;
    let full = false;
    let yForce = this.getyForce();
    do {
      let x = Math.trunc(random(width));
      let y = Math.trunc(random(height));
      let elm = { x, y };
      let partIndex = random([0, 1, 2]);
      // let ne = random([ew, ew * 0.5, ew * 0.25]);
      let ne = random([ew, ew * 0.5]);
      full = this.matter_addBox(elm, ne, partIndex, yForce);
    } while (!full);
    // console.log('blast Return', full);
    this.points = [];
    this.lerpPoints = [];
  }
  drawFigure(layer, poses) {
    my.teventOpenDiff = 0;
    // if (this.figure_color) {
    //   image_copy_to(this.img, this.init_input);
    // }
    let urect = this.eff_spec.urect;
    this.ux0 = urect.x0;
    this.uy0 = urect.y0;
    this.rx = urect.width / this.input.width;
    this.ry = urect.height / this.input.height;

    this.buffer = this.input.get();

    layer.strokeWeight(this.pen_stroke_weight);
    layer.stroke(0);

    // Loop through all the poses detected
    let n = min(this.ndetect, poses.length);
    let pointsBase = 0;
    for (let i = 0; i < n; i++, pointsBase += 3) {
      let pose = poses[i];

      this.draw_pose(layer, pose, pointsBase);

      my.teventOpenDiff = 1;
    }
  }
  draw_pose(layer, pose, pointsBase) {
    let eyeWidth = abs(pose.left_eye.x - pose.right_eye.x) * this.rx * this.penScale;
    this.pen_stroke_weight = eyeWidth * this.stroke_weight;
    if (!my.eyeWidth) {
      console.log('bodyHand draw_pose eyeWidth', eyeWidth);
      my.eyeWidth = eyeWidth;
      // layer.strokeWeight(this.pen_stroke_weight);
    }
    let x = pose.nose.x;
    let y = pose.left_eye.y + (pose.right_eye.y - pose.left_eye.y) * 0.5;
    this.draw_part(pointsBase, 0, layer, { x, y }, eyeWidth, pose.id);
    this.draw_part(pointsBase, 1, layer, pose.left_wrist, eyeWidth);
    this.draw_part(pointsBase, 2, layer, pose.right_wrist, eyeWidth);
  }

  draw_part(pointsBase, partIndex, layer, part, ew, id) {
    let index = pointsBase + partIndex;
    let colr = dot_colors[partIndex];
    // layer.stroke(colr);
    layer.fill(colr);

    let x1 = Math.trunc(part.x * this.rx + this.ux0);
    // !!@ fliph x1
    x1 = this.eff_spec.urect.width - x1;
    let y1 = Math.trunc(part.y * this.ry + this.uy0);
    let lpt = this.lerpPoints[index];
    if (!lpt) {
      lpt = { x: x1, y: y1 };
      this.lerpPoints[index] = lpt;
    } else {
      lpt.x = lerp(lpt.x, x1, 0.3);
      lpt.y = lerp(lpt.y, y1, 0.3);
      x1 = lpt.x;
      y1 = lpt.y;
    }
    let dh = this.pen_stroke_weight;
    if (partIndex === 0) {
      // nose/eye is circle
      let cy = y1 - ew / 2 + dh;
      layer.circle(x1, cy, ew);
      layer.fill(255);
      layer.strokeWeight(this.pen_stroke_weight * 0.5);
      layer.text(id, x1, cy + textAscent());
    } else if (partIndex === 1 || partIndex === 2) {
      // wrist is triangle
      let x2 = x1 - ew * 0.5;
      let y2 = y1 + ew;
      let x3 = x1 + ew * 0.5;
      let y3 = y2;
      layer.triangle(x1, y1, x2, y2, x3, y3);
    }
    let points = this.points[index];
    if (!points) {
      points = [];
      this.points[index] = points;
      // console.log('draw_hand_fist init index', index, 'points', points);
    }
    let n = points.length - 1;
    let prior = points[n];
    if (prior) {
      // if (prior.x != x1 && prior.y != y1) {
      let dmin = 4;
      if (Math.abs(prior.x - x1) > dmin || Math.abs(prior.y - y1) > dmin) {
        // console.log('draw_hand_fist index', index, 'pw', pw, prior.x, x1, prior.y, y1);
        points.push({ x: x1, y: y1 });
        let yForce = this.getyForce();
        // console.log('draw_part matter_addBox yForce', yForce);
        if (this.addBox_allow(partIndex, yForce)) {
          let elm = points[points.length - 1];
          this.matter_addBox(elm, ew, partIndex, yForce);
        }
      }
    } else {
      points.push({ x: x1, y: y1 });
    }
    // console.log('draw_hand_fist push index', index, 'points', points);
  }
  getyForce() {
    let yForce = this.output.width / 1920;
    if (yForce < 0.6) {
      yForce = yForce * 0.2;
    }
    return yForce * 0.2;
  }
  matter_addBox(elm, ew, partIndex, yForce) {
    let x = elm.x;
    let y = elm.y;
    let w = ew;
    let h = ew;
    if (!this.matterMgr) this.matter_init(ew);
    my.reportMaxPoints = this.matterMgr.boxes.length;
    // let ne = [ew, 2 * ew, 2 * ew][partIndex];
    let ne = ew * 0.5;
    let colr = dot_colors[partIndex];
    let full = this.matterMgr.addBox(x, y - ne, w, h, colr, yForce);
    // console.log('draw_part matter_addBox full', full);
    return full;
  }
  matter_init(ew) {
    let w = width;
    let h = height;
    // console.log('matter_init height', height, 'h', h);
    // let maxItems = this.penPointsMax * 10;
    let maxItems = Math.trunc((this.output.width / ew) * (this.output.height / ew));
    maxItems = maxItems * 2;
    my.reportMaxPointLimit = maxItems;
    console.log('matter_amatter_initddBox maxItems', maxItems, 'penPointsMax', this.penPointsMax);
    this.matterMgr = new MatterMgr(this.output, maxItems, w, h);
    this.matterMgr.getColor = (pos) => {
      // console.log('matterMgr.getColor pos', pos);
      let x = Math.trunc((pos.x - this.ux0) / this.rx);
      // !!@ fliph x
      x = this.input.width - x;
      let y = Math.trunc((pos.y - this.uy0) / this.ry);
      let c = this.buffer.get(x, y);
      // console.log('matterMgr.getColor x', x, 'y', 'c', c);
      // c[3] = 100;
      return c;
    };
  }
  addBox_allow(partIndex) {
    if (!this.addBox_time) {
      this.addBox_time = [];
      this.addBox_delaySec = 0.2;
    }
    if (!this.addBox_time[partIndex]) {
      this.addBox_time[partIndex] = Date.now() / 1000;
    }
    let now = Date.now() / 1000;
    if (now - this.addBox_time[partIndex] < this.addBox_delaySec) {
      return false;
    }
    this.addBox_time[partIndex] = now;
    return true;
  }
  draw_hand_ellipse(layer, wrist, ew) {
    let x1 = wrist.x * this.rx + this.ux0;
    let y1 = wrist.y * this.ry + this.uy0;
    layer.ellipse(x1, y1, ew, ew);
  }

  init() {
    // console.log('eff_pose_net this.input.elt', this.input.elt);
    // this.penScale = 0.5;
    this.hflip = !!this.hflip; // convert to boolean
    let w = this.input.width;
    let h = this.input.height;
    if (this.hi_rez) {
      w = this.eff_spec.urect.width;
      h = this.eff_spec.urect.height;
    }
    console.log('eff_pose_net w, h', w, h);
    this.output = createGraphics(w, h);
    this.output.noStroke();
    this.output.clear();

    this.penLayer = createGraphics(w, h);
    this.penLayer.noStroke();
    // this.penLayer.clear();

    this.video = this.input.elt;
    this.poses = [];
    this.points = [];
    this.lerpPoints = [];

    // if (this.figure_color) {
    //   // Copy of input for getting color
    //   let w = this.input.width;
    //   let h = this.input.height;
    //   this.img = createImage(w, h);
    //   this.init_input = this.input;
    // }

    this.initModel();
  }

  ready() {
    return this.poses;
  }
}

// let a_alpha = 255; // will be overriden by meta_props
// let dot_colors = [
//   // [0, 0, 0, a_alpha],
//   [255, 255, 0, a_alpha],
//   [255, 0, 0, a_alpha],
//   [0, 255, 0, a_alpha],
// ];

// For debugging
// let a_poses;

// https://learn.ml5js.org/#/reference/posenet
// https://editor.p5js.org/ml5/sketches/PoseNet_webcam

// https://editor.p5js.org/codingtrain/sketches/9O6KbYyiX
// BodyPose - Nose with Lerp

// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-bodypose/pose-detection

// https://docs.ml5js.org/#/reference/bodypose

// https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet#create-a-detector

// https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet

// https://github.com/ml5js/ml5-next-gen/issues/231#issuecomment-2496490520
// !!@ webgpu issue
