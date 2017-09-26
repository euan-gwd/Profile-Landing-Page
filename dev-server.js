var browserSync = require("browser-sync");

browserSync({
  server: "public",
  files: ["public/*.html", "public/css/*.css"],
  ui: false
});
