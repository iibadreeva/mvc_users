'use strict';

module.exports = function() {
  $.gulp.task('css:foundation', function() {
    return $.gulp.src($.path.cssFoundation)
      .pipe($.gp.concatCss('foundation.css'))
      .pipe($.gp.csso())
        .pipe($.gp.insert.prepend('/* ' + $.data.v +', \n  '+ $.data.date + '*/ \n'))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
  })
};
