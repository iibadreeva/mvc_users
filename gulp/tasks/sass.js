'use strict';

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('./source/style/app.scss')
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sassGlob())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      // .pipe($.cssunit({
      //     type     :    'px-to-rem',
      //     rootSize :    16
      // }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + '/assets/css'))
      .pipe($.browserSync.stream());
  });
  $.gulp.task('sass-prod', function() {
    return $.gulp.src('./source/style/app.scss')
      .pipe($.gp.sassGlob())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
        .pipe($.gp.insert.prepend('/* ' + $.data.v +', \n  '+ $.data.date + '*/ \n'))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
  });
};
