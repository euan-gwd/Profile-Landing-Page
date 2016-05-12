var gulp = require('gulp');
var	sass = require('gulp-sass');
var	prefix = require('gulp-autoprefixer');
var	browserSync = require('browser-sync');
var	reload = browserSync.reload;
var	plumber = require('gulp-plumber');
var	nodemon = require('gulp-nodemon');


// Compile Sass into CSS
gulp.task('sass', function() {
  return gulp.src('public/scss/**/*.scss') // Gets all files ending with .scss in public/scss and Converts Sass to CSS with gulp-sass
      .pipe(plumber())
			.pipe(sass())
			.pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))  //Adds vendor prefixes if needed
      .pipe(gulp.dest('public/css')) // Outputs CSS to public/css
      .pipe(reload({ stream: true }));
});

// Checks for errors in JS files
gulp.task('scripts', function() {
  return gulp.src('public/js/**.*.js')
    .pipe(plumber())
    .pipe(gulp.dest('public/js'))
    .pipe(reload({ stream: true }));
});

// Watches for file changes and reloads express server
gulp.task('nodemon', function(cb) {
  var started = false;

  return nodemon({
    script: 'server.js'}).on('start', function() {
    if (!started) {
      cb();
      started = true;
    } // To avoid nodemon being started multiple times
  });
});


// Starts browserSync server
gulp.task('browserSync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    ui: false,
    port: 4000,
  });
});

// Watches for file changes and reloads browsers
gulp.task('default', ['scripts', 'browserSync'], function() {
  gulp.watch('public/scss/**/*.scss', ['sass']);
  gulp.watch('public/js/**/*.js', ['scripts']);
  gulp.watch('public/*.html', reload);
});
