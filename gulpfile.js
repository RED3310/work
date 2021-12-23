"use strict";

let project_folder = "dist";
let sourse_folder = "src";

let path = {

    build: {
        html: project_folder + "/",
        css: project_folder + "/style",
        js: project_folder + "/js",
        img: project_folder + "/images",
    },
    src: {
        pug: sourse_folder + "/pug/*.pug",
        scss: sourse_folder + "/sass/index.scss",
        js: sourse_folder + "/js/script.js",
        img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
        pug: sourse_folder + "/**/*.pug",
        css: sourse_folder + "/sass/**/*.scss",
        js: sourse_folder + "/js/**/*.js",
        img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp');
let gulp = require('gulp');

let browsersync = require('browser-sync').create();
let pug = require('gulp-pug');
let sass = require('gulp-sass')(require('sass'));
let fileinclude = require('gulp-file-include');
var concat = require("gulp-concat");

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function html() {
    return src(path.src.pug)
        .pipe(fileinclude())
        .pipe(pug({ pretty: true }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function style() {
    return src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function scripts() {
    return src([
        path.src.js,
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    ])

        .pipe(concat("scripts.min.js"))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.pug], html)
    gulp.watch([path.watch.css], style)
    gulp.watch([path.watch.js], scripts)
    gulp.watch([path.watch.img], images)
}

let build = gulp.series(gulp.parallel(html, style), scripts, images);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.scripts = scripts;
exports.style = style;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
