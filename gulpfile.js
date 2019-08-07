var gulp = require("gulp");

var sass = require('gulp-sass')
var mincss = require('gulp-minify-css');

var minimg = require('gulp-imagemin');

var babel = require('gulp-babel');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var connect = require('gulp-connect')


gulp.task("watchall",async ()=>{
	gulp.watch('*.html',async ()=>{
		gulp.src('*.html')
		.pipe(gulp.dest("D:\\phpStudy\\WWW\\xiaomi"));
	})
	
	gulp.watch("php/*.php",async ()=>{
		gulp.src("php/*.php")
		.pipe(gulp.dest("D:\\phpStudy\\WWW\\xiaomi\\php"));
	})

	gulp.watch("sass/**/*",async ()=>{
		gulp.src("sass/**/*") 
		.pipe(sass())
		.pipe(gulp.dest('D:\\phpStudy\\WWW\\xiaomi\\css'));
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

		// .pipe(concat('tools.js'))	
		// .pipe(babel({  "presets": [  "es2015" ] }))
		// .pipe(uglify())
		// .pipe(rename('tools.min.js'))
		// .pipe(gulp.dest('D:\\phpStudy\\WWW\\xiaomi\\js'));
	})
});


// gulp.task("minjs",async ()=>{
	
// 	gulp.src('js/*.js')
// 	.pipe(concat('tools.js'))	
// 	.pipe(babel({  "presets": [  "es2015" ] }))
// 	.pipe(uglify())
// 	.pipe(rename('tools.min.js'))
// 	.pipe(gulp.dest('dist\\js'));
// });

// gulp.task('server',async ()=>{
// 	connect.server({
// 		root:'dist',
// 		livereload:true
// 	})
// })

// gulp.task('yun',gulp.series('server',"minjs"));