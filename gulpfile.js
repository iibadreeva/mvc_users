'use strict';

global.$ = {
    server: {
        stub: '__assetsPathStub/',
        prod: 'Content/OpeningManager/',
        dev: './'
    },
    package: require('./package.json'),
    config: require('./gulp/config'),
    path: {
        task: require('./gulp/paths/tasks.js'),
        jsFoundation: require('./gulp/paths/js.foundation.js'),
        cssFoundation: require('./gulp/paths/css.foundation.js'),
    },
    gulp: require('gulp'),
    del: require('del'),
    spritesmith: require('gulp.spritesmith'),
    browserSync: require('browser-sync').create(),
    minify: require('gulp-minify'),
    insert: require('gulp-insert'),
    gp: require('gulp-load-plugins')(),
    data: {
        v: 'version: 0.0.1',
        date: 'date: ' + new Date()
    },
    rollup: require('rollup'),
    rp: {
        babel: require('rollup-plugin-babel'),
        commonjs: require('rollup-plugin-commonjs'),
        resolve: require('rollup-plugin-node-resolve'),
        terser: require('rollup-plugin-terser').terser,
    },
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    'sprite',
  $.gulp.parallel(
    'sass',
    'pug-dev',
    'js:foundation',
    'copy',
    'css:foundation'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

$.gulp.task('release', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass-prod',
        'pug-prod',
        'js:foundation-prod',
        'copy-release',
        'css:foundation'
    )
));
