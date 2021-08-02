const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass')); //sass
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(sass|scss)")
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) //sass
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"], //overrideBrowserslist: ["last 5 versions"],
             //browsers: ['last 2 versions'] 
            cascade: false  //cascade: true //cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(sass|scss)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));