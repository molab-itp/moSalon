//

// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/6-physics-libraries/1-matterjs-introduction
// https://brm.io/matter-js/
// https://editor.p5js.org/codingtrain/sketches/dian0t-5j
// 5.17 Matter.js tutorial

// https://editor.p5js.org/jht9629-nyu/sketches/LdXXFo6gn
// 5.17 Matter.js tutorial

// <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>

const { Engine, World, Bodies, Composite, Body } = Matter;

class MatterMgr {
  constructor(output, maxItems, width, height) {
    console.log('MatterMgr constructor width height', width, height);
    this.output = output;
    this.maxItems = maxItems;
    this.width = width;
    this.height = height;
    this.init();
  }
  // let engine;
  // let world;
  // let boxes = [];
  // let ground;

  init() {
    // createCanvas(400, 400);
    // create an engine
    this.boxes = [];
    this.engine = Engine.create();
    this.engine.gravity.y = 1;
    this.world = this.engine.world;
    this.createBoundary();
  }

  clear() {
    for (let elm of this.boxes) {
      Composite.remove(this.world, elm.body);
    }
    // Composite.remove(this.world, this.boxes);
    this.boxes = [];
  }
  addBox(x, y, w, h, c, yForce) {
    // mousePressed() {
    let box = new Box(this, x, y, w, h, c);
    // Apply an initial force upwards
    {
      let body = box.body;
      let x = 0;
      let y = -0.1 * yForce;
      Body.applyForce(body, { x: body.position.x, y: body.position.y }, { x, y });
    }
    this.boxes.push(box);
    let full = false;
    // this.boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    if (this.boxes.length >= this.maxItems) {
      let elm = this.boxes[0];
      this.boxes.splice(0, 1);
      Composite.remove(this.world, elm.body);
      full = true;
      console.log('addBox remove n boxes', this.boxes.length, 'maxItems', this.maxItems);
    }
    return full;
  }

  draw() {
    Engine.update(this.engine);
    for (let box of this.boxes) {
      box.show();
    }
  }

  createBoundary() {
    let options = {
      friction: 0.3,
      restitution: 0.6,
      isStatic: true,
    };
    let margin = 10;
    let w = this.width;
    let h = this.height;
    let ground = Bodies.rectangle(w * 0.5, h, w, margin, options);
    let wallLeft = Bodies.rectangle(0, h * 0.5, margin, h, options);
    let wallRight = Bodies.rectangle(w, h * 0.5, margin, h, options);
    let ceiling = Bodies.rectangle(w * 0.5, 0, w, margin, options);
    Composite.add(this.world, [ground, wallLeft, wallRight, ceiling]);
  }
}

class Box {
  constructor(parent, x, y, w, h, c) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    let options = {
      friction: 0.3,
      restitution: 0.6,
    };
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);

    Composite.add(this.parent.world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    // console.log('Box show', pos.x, pos.y, this.w, this.h);
    let layer = this.parent.output;
    let fillc = 0;
    if (this.parent.getColor) {
      fillc = this.parent.getColor(pos);
    }
    layer.push();
    layer.translate(pos.x, pos.y);
    layer.rotate(angle);
    layer.rectMode(CENTER);
    layer.strokeWeight(1);
    // layer.stroke(255); !!@ matter white box
    layer.stroke(this.c);
    layer.fill(fillc);
    layer.rect(0, 0, this.w, this.h);
    layer.pop();
  }
}

// 11/7/2024 13:22:17	sv2884@nyu.edu	Sai Ram Ved Vijapurapu	Week 09 (Media 2)
// https://www.notion.so/itp-tracker/Week-09-137d7eb4971b80d797c0eb525afa498a?pvs=4
// https://editor.p5js.org/sairamved/sketches/kHR1qrQC5

// class Boundary {
//   constructor(parent, x, y, w, h) {
//     console.log('Boundary x', x, 'y', y, 'w', w, 'h', h);
//     this.parent = parent;
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//     let options = {
//       friction: 0.3,
//       restitution: 0.6,
//       isStatic: true,
//     };
//     this.body = Bodies.rectangle(this.x + this.w * 0.5, this.y - this.h * 0.5, this.w, this.h, options);
//     // this.body = Bodies.rectangle(this.x + this.w * 0.5, this.y, this.w * 2, this.h, options);
//     // Composite.add(this.parent.world, this.body);
//   }

//   show() {
//     let pos = this.body.position;
//     let angle = this.body.angle;
//     push();
//     translate(pos.x, pos.y);
//     rotate(angle);
//     rectMode(CENTER);
//     strokeWeight(1);
//     noStroke();
//     fill(255);
//     rect(0, 0, this.w, this.h);
//     pop();
//   }
// }
