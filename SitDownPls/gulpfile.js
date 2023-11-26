const { src, dest, parallel, series, watch } = require('gulp');
const htmlMin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const image = require('gulp-image');
// const babel = require('gulp-babel');
// const notify = require('gulp-notify');
// const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
// очистка
const clean = () => {
  return del(['result'])
}

// перенос плагинов
const resources = () => {
  return src('./src/resources/**')
  .pipe(dest('./result/resources'))
}

// перенос шрифтов
const fonts = () => {
  return src('./src/fonts/**')
    .pipe(dest('./result/fonts'))
}

// стили
const styles_scss = () => {
  return src('./src/styles/scss/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(concat('style.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('./src/styles/css'))
  .pipe(browserSync.stream())
}
const styles = () => {
  return src(['src/styles/css/*.css'])
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(concat('style.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('./result/styles/'))
  .pipe(browserSync.stream());
}

// html
const htmlMinify = () => {
  return src('src/*.html')
  .pipe(htmlMin({
    collapseWhitespace: true,
  }))
  .pipe(dest('./result'))
  .pipe(browserSync.stream())
}

// изображения
const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.svg',
    'src/img/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('./result/img'))
}

// скрипты
const scripts = () => {
  return src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('main.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('./result/js'))
  .pipe(browserSync.stream());
}

// const scripts = () => {
//   return src('src/js/**')
//   .pipe(dest('result/js'))
//   .pipe(browserSync.stream())
// }
// const scripts = () => {
//   return src('src/js/script.js')
//   .pipe(sourcemaps.init())
//   .pipe(babel({
//     presets: ['@babel/env']
//   }))
//   // .pipe(uglify()).on('error', notify.onError())
//   .pipe(sourcemaps.write())
//   .pipe(dest('result/js'))
//   .pipe(browserSync.stream())
// }

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './result'
    }
  })
}

watch('./src/**/*.html', htmlMinify);
watch('./src/styles/**/*.scss', styles_scss);
watch('./src/styles/**/*.css', styles);
watch('./src/resources/**', resources);
watch('./src/js/**/*.js', scripts);

exports.default = series(clean, parallel(resources, fonts, htmlMinify, scripts, images), styles_scss, styles, watchFiles);

