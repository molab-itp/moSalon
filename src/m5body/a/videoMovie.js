//

function draw_videoMovieBack() {
  for (let spec of my.videoMovies) {
    if (spec.isVisible) {
      draw_videoMovie(spec);
    }
  }
}

function draw_videoMovie(videoMovie) {
  let mscale = videoMovie.scale;
  let movie = videoMovie.movie;
  let aspect_hw = movie.height / movie.width;
  let w = my.output.width;
  let h = my.output.width * aspect_hw;
  // my.output.image(videoMovie.movie, 0, 0, w, h);
  if (videoMovie.flipH) {
    my.output.push();
    my.output.scale(-1, 1);
    let x = 0;
    my.output.image(movie, x, 0, -w * mscale, h * mscale);
    my.output.pop();
  } else if (videoMovie.centerX) {
    let x = (width - width * mscale) * 0.5;
    let y = videoMovie.offsetY || 0;
    my.output.image(movie, x, y, w * mscale, h * mscale);
  } else {
    let y = videoMovie.offsetY || 0;
    my.output.image(movie, 0, y, w * mscale, h * mscale);
    if (videoMovie.scrollY && videoMovie.scrollEnabled) {
      if (videoMovie.offsetY < height * (1 - 0.25)) {
        videoMovie.offsetY = videoMovie.offsetY + 1;
      }
    }
  }
}
