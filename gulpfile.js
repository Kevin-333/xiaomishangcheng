var gulp = require("gulp");

let mincss = require('gulp-minify-css');

let minimg = require('gulp-imagemin');

const babel = require('gulp-babel');

let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');

// gulp.task("copy-js",async ()=>{
// 	gulp.src('js/*.js')
// 		.pipe(gulp.dest('D:\\phpStudy\\WWW\\xiaomi\\js'))
// });


gulp.task("watchall",async ()=>{
	gulp.watch('*.html',async ()=>{
		gulp.src('*.html')
		.pipe(gulp.dest("D:\\phpStudy\\WWW\\xiaomi"));
	})

	gulp.watch("css/*.css",async ()=>{
		gulp.src("css/*.css")
		.pipe(mincss())
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\xiaomi\\css'));
	})

	gulp.watch("img/**/*.{jpg,png}",async ()=>{
		gulp.src("img/**/*.{jpg,png}")
		.pipe(minimg())
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\xiaomi\\img'));
	})

	gulp.watch('js/*.js', async ()=>{
		gulp.src('js/*.js')
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\xiaomi\\js'));
	})
});