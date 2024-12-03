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

  my.videoCaptures = [];
  for (let mediaDev of my.mediaDevices) {
    let video = await mediaDevice_create_capture(mediaDev, { flipped: my.flipH });
    video.capture.hide();

    my.videoCaptures.push(video);
    my.videoCapture = video;

    console.log('video_init_capture mediaDev.label', mediaDev.label);
    console.log('video_init_capture video.width, video.height', video.width, video.height);
  }
}

function video_init_mask() {
  let { width, height } = my.videoCapture.capture;
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
