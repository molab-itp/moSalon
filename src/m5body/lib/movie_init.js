//

function movie_init() {
  //

  // my.video = wait mediaDevice_create_capture(mediaDev, { flipped: flipH });
  my.videoMovie = createVideo(my.moviePath, function () {
    console.log('movie_init ready');

    my.videoMovie.loop();
  });

  my.videoMovie.hide();
  // my.videoMovie.showControls();

  console.log('movie_init moviePath', my.moviePath);
  console.log('movie_init my.videoMovie.width, my.video.height', my.videoMovie.width, my.videoMovie.height);
}
