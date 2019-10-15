'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/js/modules/**/*.js', $.gulp.series('js:foundation'));
    $.gulp.watch('./source/js/template/*.html', $.gulp.series('copy:template-js'));
    $.gulp.watch('./source/style/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/template/**/*.pug', $.gulp.series('pug-dev'));
    $.gulp.watch('./source/js/json/**/*.json', $.gulp.series('copy:json'));
    $.gulp.watch('./source/images/**/*.*', $.gulp.series('copy:image'));
  });
};
