//

// !!@ flipH=true does not preview correctly
// unless capture is sized immediately
// let flipH = true;
// let flipH = true;

async function video_init() {
  //
  await mediaDevices_preflight();

  await video_init_capture();
}

// Create the webcam video and hide it
//
async function video_init_capture() {
  // console.log('video_init_capture enter');
  //
  await mediaDevices_enum();

  if (!my.mediaDevices.length) {
    console.log('video_init_capture No my.mediaDevices');
    return;
  }

  my.videos = [];
  for (let mediaDev of my.mediaDevices) {
    let video = await mediaDevice_create_capture(mediaDev, { flipped: my.flipH });
    video.hide();

    my.videos.push(video);
    my.video = video;

    console.log('video_init_capture mediaDev.label', mediaDev.label);
    console.log('video_init_capture video.width, video.height', video.width, video.height);
  }

  // Select the last camera
  // let n = my.mediaDevices.length;
  // let index = n - 1;
  // if (index < 0 || index >= n) index = 0;
  // let mediaDev = my.mediaDevices[index];
  // // my.flipH = true;
  // my.video = await mediaDevice_create_capture(mediaDev, { flipped: my.flipH });
  // my.video.hide();
  // video_init_mask();
}

function video_init_mask() {
  let { width, height } = my.video;
  my.videoMask = createGraphics(width, height);
  my.videoBuff = createGraphics(width, height);
}

// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight]

// let capture = createCapture(VIDEO, function (stream)
// try {
// } catch (err) {
//   console.log('init_device_capture err', err);
//   alert('init_device_capture err=' + err);
// }
