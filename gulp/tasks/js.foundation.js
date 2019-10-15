'use strict';

const rollupOptions = [
    {
        plugins: [
            $.rp.babel({ runtimeHelpers: true }),
            $.rp.commonjs(),
            $.rp.resolve({ browser: true }),
            process.env.NODE_ENV === 'production' ? $.rp.terser() : false,
        ],
    },
    {
        file: 'foundation.js',
        format: 'iife',
    },
];

module.exports = function() {
    $.gulp.task('js:foundation', function() {
        return $.gulp.src($.path.jsFoundation)
            .pipe($.gp.plumber())
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.betterRollup(...rollupOptions))
            .pipe($.gp.sourcemaps.write('.'))
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    });
    $.gulp.task('js:foundation-prod', function() {
        return $.gulp.src($.path.jsFoundation)
            .pipe($.gp.plumber())
            .pipe($.gp.betterRollup(...rollupOptions))
            .pipe($.gp.insert.prepend('/* ' + $.data.v +', \n  '+ $.data.date + '*/ \n'))
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    })
};