'use strict';

module.exports = function() {
    $.gulp.task('pug-dev', function() {
        return $.gulp.src('./source/template/pages/*.pug')
            .pipe($.gp.plumber())
            .pipe($.gp.pug({ pretty: true }))
            .pipe($.gp.replace($.server.stub, $.server.dev))
            .pipe($.gulp.dest($.config.root));
    });
    $.gulp.task('pug-prod', function() {
        return $.gulp.src('./source/template/pages/*.pug')
            .pipe($.gp.plumber())
            .pipe($.gp.pug({ pretty: true }))
            .pipe($.gp.replace($.server.stub, $.server.dev))
            .pipe($.gp.insert.prepend('<!-- ' + $.data.v +', '+ $.data.date + '-->\n'))
            .pipe($.gulp.dest($.config.root));
    });
};
