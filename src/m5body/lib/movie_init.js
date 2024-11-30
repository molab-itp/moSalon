//

// my.moviePaths = [
//   '../../external_media/movies/Flaring-Black-Hole-V404-Cygni.mp4',
//   '../../external_media/movies/Red-Green-Gold-Charles.mp4',
// ];

//   { movie, isVisible, shouldPlay }

async function movie_init() {
  //
  my.videoMovies = [];
  for (let spec of my.movieSpecs) {
    let movie = await movie_create(spec);
    my.videoMovies.push(movie);
  }
  // my.videoMovies[0].scale = 1.0;
  // my.videoMovies[1].scale = 0.3;
  my.videoMovie = my.videoMovies[0];
}

async function movie_create(spec) {
  // console.log('video_preflight enter');

  return new Promise(function (resolve, reject) {
    let movie = createVideo(spec.moviePath, function () {
      console.log('movie_create ready');
      console.log('movie_create moviePath', spec.moviePath);
      console.log('movie_create width height', movie.width, movie.height);
      movie.hide();
      movie.play();
      if (spec.loop) {
        movie.loop();
      }
      if (!spec.shouldPlay) {
        movie.pause();
      }
      if (spec.volume !== undefined) {
        movie.volume(spec.volume);
      }
    });
    // let offsetY = 0;
    spec.movie = movie;
    if (!spec.offsetY) spec.offsetY = 0;
    // spec.offsetY = offsetY;
    resolve(spec);
    // let isVisible = false;
    // let shouldPlay = false;
    // resolve({ movie, isVisible, shouldPlay, moviePath });
  });
}
