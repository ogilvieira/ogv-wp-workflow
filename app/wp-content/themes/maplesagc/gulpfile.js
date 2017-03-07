var gulp = require('gulp');
var themeConfig = require('./themeConfig.json');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

themeConfig.text_domain = themeConfig.name.replace(/\s/g, '').toLowerCase();
themeConfig.theme_path = './app/wp-content/themes/'+themeConfig.text_domain;

/**
* FONTS TASKS
*/
gulp.task('fonts:copy', function(){
  var themeConfig = require('./themeConfig.json');
  gulp.src(themeConfig.fonts)
    .pipe(gulp.dest('./assets/fonts').on('error', function(e){
      console.log(e);
    }));
});


/**
* SASS TASKS
*/
gulp.task('sass', function () {
  // livereload.listen();
  return gulp.src('./src/assets/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed', 'sourceComments' : false }).on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css/'));
});

/**
* CSS TASKS
*/
gulp.task('css:minify', function () {
  return gulp.src(themeConfig.styles)
    .pipe(concatCss("app.min.css", { rebaseUrls: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./assets/css'))
    .pipe(livereload());
});

/**
* JS TASKS
*/
gulp.task('js:minify', function (cb) {
    return gulp.src(themeConfig.scripts)
      .pipe(concat("app.min.js"))
      .pipe(uglify({ preserveComments : "function" }).on('error', function(e){ console.log(e) }))
      .pipe(gulp.dest('./assets/js'))
      .pipe(livereload());
});

/**
* IMAGES TASKS
*/
gulp.task('imagemin', function () {
  return gulp.src('./src/assets/img/**/*.{jpeg,jpg,svg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/img'))
    .pipe(livereload());
});


gulp.task('build', ['sass','css:minify','js:minify','fonts:copy','imagemin']);

gulp.task('watch', ['build'], function(){
  livereload.listen();

  gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
  gulp.watch(themeConfig.styles, ['css:minify']);
  gulp.watch(themeConfig.scripts, ['js:minify']);
  gulp.watch(themeConfig.fonts, ['fonts:copy']);
  gulp.watch(themeConfig.fonts, ['fonts:copy']);
  gulp.watch(['./src/**/*.{jpeg,jpg,svg,png}'], ['imagemin']);

  gulp.watch(['./**/*.php']).on('change', function(e){
    livereload.reload(e.path);
  });
});