const gulp = require('gulp');
const zip = require('gulp-zip');
// everything to bundle as zip
function bundle() {
  return gulp.src([
    // wildcard of everything to bundle.
    "**/*",
    // ignore
    "!node_modules/**",
    "!src/**",
    "!bundled/**",
    "!gulpfile.js",
    "!package.json",
    "!package-lock.json",
    "!webpack.config.js",
    ".gitignore",
  ])
    .pipe(zip('cgr-first-gb.zip'))
    .pipe(gulp.dest("bundled"));
}

exports.bundle = bundle;