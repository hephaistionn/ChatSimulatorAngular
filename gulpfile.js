const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const gutil = require('gulp-util');
const watchify = require('watchify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const config = {
  entriesSass: './src/style.scss',
  output: './dist',
  browserifyOptions: {entries: ['./src/app.js'], debug: true},
  babelifyOptions: {presets: ['es2015']}
};

var bundler;

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest(config.output))
    .on('end', function() {
      gulp.src('./src/index.html')
        .pipe(gulp.dest(config.output));
      gulp.src('./src/**/template.html')
          .pipe(gulp.dest(config.output));
    });
}

gulp.task('watch-js', () => {
  bundler = watchify(browserify(config.browserifyOptions));
  bundler.transform(babelify.configure(config.babelifyOptions));
  //bundler.transform(es6ify);
  bundler.on('error', gutil.log);
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);
  return bundle();
});

gulp.task('build-js', () => {
  bundler = browserify(config.browserifyOptions);
  bundler.transform(babelify.configure(config.babelifyOptions));
  //bundler.transform(es6ify);//more speed than babelify
  //bundler.bundle().pipe(uglify().on('error', gutil.log));
  return bundle();
});

gulp.task('build-css', () => {
  return gulp.src(config.entriesSass)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.output));
});

gulp.task('watch-css', () => {
  gulp.watch('./src/**/*.scss', ['build-css']);
});
gulp.task('watch-template', () => {
  gulp.watch('./src/**/template.html', ['template-copy']);
});

gulp.task('template-copy', () => {
  gulp.src('./src/**/template.html')
      .pipe(gulp.dest(config.output));
});

/**
 * build
 */
gulp.task('build',['build-js', 'build-css']);

/**
 * watch updates
 */
gulp.task('dev', ['build-css', 'watch-css', 'watch-js', 'watch-template']);
