/**
 * Created by User on 11.02.2017.
 */
'use strict';

module.exports = function() {

    $.gulp.task('copy:fonts', function() {
        return $.gulp.src('./source/fonts/**/*.*', { since: $.gulp.lastRun('copy:fonts') })
            .pipe($.gulp.dest($.config.root + '/assets/fonts'));
    });
    $.gulp.task('copy:image', function() {
        return $.gulp.src('./source/images/**/*.*', { since: $.gulp.lastRun('copy:image') })
            .pipe($.gulp.dest($.config.root + '/assets/img'));
    });
    $.gulp.task('copy:image-release', function() {
        return $.gulp.src('./source/images/**/*.*', { since: $.gulp.lastRun('copy:image') })
            .pipe($.gp.tinypng('Qt0rYOPqMmad983gXtwnOEhNrMCaFELA'))
            .pipe($.gulp.dest($.config.root + '/assets/img'));
    });
    $.gulp.task('copy:template-js', function() {
        return $.gulp.src('./source/js/template**/*.*', { since: $.gulp.lastRun('copy:template-js') })
            .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
    $.gulp.task('copy:json', function () {
        return $.gulp.src('./source/js/json**/*.*', { since: $.gulp.lastRun('copy:json') })
            .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
    $.gulp.task('copy',
        $.gulp.parallel(
            'copy:fonts',
            'copy:image',
            'copy:template-js',
            'copy:json'
        ));
    $.gulp.task('copy-release',
        $.gulp.parallel(
            'copy:fonts',
            'copy:image',
            'copy:template-js',
        ));
};
