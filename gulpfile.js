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
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(prefix("last 2 versions"))
    .pipe(gulp.dest("public/css"))
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
    browser: "firefox",
    ghostMode: false
  });
});

// Watches for file changes and reloads browsers
gulp.task("default", ["styles", "browserSync"], function() {
  gulp.watch("public/scss/**/*.scss", ["styles"]);
  gulp.watch("public/**/*.html", reload);
});
