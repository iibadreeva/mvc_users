'use strict';

module.exports = function() {
    $.gulp.task('sprite', function() {
        return $.gulp.src('./source/images/sprite/*.png')
            .pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
            .pipe($.gulp.dest($.config.root + '/assets/img/'))
    });
};
