const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

function compilaSass() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./dist/styles/"));
}

function comprimeJs() {
  return gulp
    .src("./src/scripts/main.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/scripts/"));
}

function comprimeImg() {
  return gulp
    .src("./src/images/**.*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/imagess/"));
}

exports.watch = function () {
  gulp.watch(
    "./src/styles/**.scss",
    { ignoreInitial: false },
    gulp.parallel(compilaSass)
  );
  gulp.watch(
    "./src/scripts/main.js",
    { ignoreInitial: false },
    gulp.parallel(comprimeJs)
  );
  gulp.watch(
    "./src/images/**.*",
    { ignoreInitial: false },
    gulp.parallel(comprimeImg)
  );
};

exports.build = gulp.parallel(compilaSass, comprimeImg, comprimeJs);
