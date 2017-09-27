var gulp = require("gulp");
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var reload = browserSync.reload;

// complies scss to css
gulp.task("styles", function() {
  return gulp
    .src("public/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR")) //adds vendor prefixes if needed
    .pipe(gulp.dest("public/css")) // outputs CSS to public/css
    .pipe(
      reload({
        stream: true
      })
    );
});

// starts browserSync server
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "public/"
    },
    ui: false,
    port: 3000,
    browser: "firefox"
  });
});

// Watches for file changes and reloads browsers
gulp.task("default", ["styles", "browserSync"], function() {
  gulp.watch("public/scss/**/*.scss", ["styles"]);
  gulp.watch("public/**/*.html", reload);
});
