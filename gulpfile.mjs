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
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import svgSprite from 'gulp-svg-sprite';
import gulpIf from 'gulp-if';
import include from 'gulp-include';
import eslint from 'gulp-eslint';
import svgmin from 'gulp-svgmin';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

function optimizeSVG() {
    return src('app/images/src/*.svg')
        .pipe(svgmin())
        .pipe(dest('app/images/dist'));
}

function lintJS() {
    return src('app/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function fonts() {
    console.log('Converting TTF to WOFF & WOFF2 formats');

    return src('app/fonts/src/*.{ttf,otf}')
        .pipe(gulpIf(file => file.extname === '.ttf', fonter({ formats: ['woff'] })))
        .pipe(gulpIf(file => file.extname === '.ttf', ttf2woff2()))
        .pipe(dest('app/fonts'))
        .on('end', () => console.log('Fonts conversion completed'));
}

// Функция для работы с изображениями
function images() {
    src(['app/images/src/*.{jpg,png}'])
        .pipe(newer('app/images/dist'))
        .pipe(imagemin())
        .pipe(dest('app/images/dist'));

    // Конвертация в WebP
    src(['app/images/src/*.{jpg,png}'])
        .pipe(newer('app/images/dist'))
        .pipe(webp())
        .pipe(dest('app/images/dist'));

    // Конвертация в AVIF
    return src(['app/images/src/*.{jpg,png}'])
        .pipe(newer('app/images/dist'))
        .pipe(avif({ quality: 50 }))
        .pipe(dest('app/images/dist'));
}

function sprite() {
    return src('app/images/src/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "sprite.svg",
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/stack'));
}

// Функция для работы со скриптами
function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify.default())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

// Функция для работы со стилями
function styles() {
    const plugins = [
        autoprefixer(),
        cssnano()
    ];

    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(postcss(plugins))
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
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/js/**/*.js'], scripts)
    watch(['app/components/*', 'app/pages/*'], pages)
    watch(['app/*.html']).on('change', browserSync.reload)
}

// Функция для очистки директории dist
function cleanDist() {
    return src('dist', { read: false, allowEmpty: true })
        .pipe(clean())
}

// Функция для сборки проекта
function building() {
    return src([
        'app/css/style.min.css',
        'app/images/*.*',
        '!app/images/*.svg',
        '!app/images/stack/sprite.stack.html',
        'app/images/sprite.svg',
        'app/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html',
    ], { base: 'app', allowEmpty: true })
        .pipe(dest('dist'))
}

export {
    styles,
    images,
    fonts,
    pages,
    sprite,
    scripts,
    watching,
    cleanDist,
    building,
    lintJS,
    optimizeSVG
};

export const build = series(cleanDist, fonts, lintJS, optimizeSVG, building);
export default parallel(styles, images, scripts, pages, watching, lintJS);

