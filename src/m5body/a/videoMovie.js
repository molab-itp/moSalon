//

function draw_videoMovieBack(output) {
  for (let spec of my.videoMovies) {
    if (spec.isVisible) {
      draw_videoMovie(spec, output);
    }
  }
}

// {output}
function draw_videoMovie(videoMovie, output) {
  let mscale = videoMovie.scale;
  let movie = videoMovie.movie;
  let aspect_hw = movie.height / movie.width;
  let w = output.width;
  let h = output.width * aspect_hw;
  // output.image(videoMovie.movie, 0, 0, w, h);
  if (videoMovie.flipH) {
    output.push();
    output.scale(-1, 1);
    let x = 0;
    output.image(movie, x, 0, -w * mscale, h * mscale);
    output.pop();
  } else if (videoMovie.centerX) {
    let x = (width - width * mscale) * 0.5;
    let y = videoMovie.offsetY || 0;
    output.image(movie, x, y, w * mscale, h * mscale);
  } else {
    let y = videoMovie.offsetY || 0;
    output.image(movie, 0, y, w * mscale, h * mscale);
    if (videoMovie.scrollY && videoMovie.scrollEnabled) {
      if (videoMovie.offsetY < height * (1 - 0.25)) {
        videoMovie.offsetY = videoMovie.offsetY + 1;
      }
    }
  }
}
