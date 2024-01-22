import gulp from 'gulp';
const { src, dest, watch, parallel, series } = gulp;

import * as sass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass(sass);

import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';

import browserSyncLib from 'browser-sync';
const browserSync = browserSyncLib.create();

import clean from 'gulp-clean';
import avif from 'gulp-avif';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import webp from 'gulp-webp';

// Функция для работы с изображениями
function images() {
    return src(['app/images/src/*.{jpg,png}'])
        .pipe(newer('app/images/dist'))
        .pipe(imagemin())
        .pipe(dest('app/images/dist'))

        .pipe(src(['app/images/src/*.{jpg,png}']))
        .pipe(avif({ quality: 50 }))
        .pipe(dest('app/images/dist'))

        .pipe(src(['app/images/src/*.{jpg,png}']))
        .pipe(webp())
        .pipe(dest('app/images/dist'));
}


// Функция для работы со скриптами
function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify.default())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

// Функция для работы со стилями
function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

// Функция для отслеживания изменений
function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/images/src'], images);
    watch(['app/js/**/*.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

// Функция для очистки директории dist
function cleanDist() {
    return src('dist', { read: false, allowEmpty: true })
        .pipe(clean());
}

// Функция для сборки проекта
function building() {
    return src([
        'app/css/style.min.css',
        'app/images/dist/*.*',
        'app/js/main.min.js',
        'app/**/*.html',
        'app/images/dist/**/*'
    ], { base: 'app' })
        .pipe(dest('dist'));
}

export {
    styles,
    images,
    scripts,
    watching,
    cleanDist,
    building
};

export const build = series(cleanDist, building);
export default parallel(styles, images, scripts, watching);

