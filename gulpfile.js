let gulp=require('gulp');
let less=require('gulp-less');
let browserify=require('gulp-browserify');
let babelify=require('babelify')
let watch=require('gulp-watch');
let bs=require('browser-sync');
let clean=require('gulp-clean');
let postCss=require('gulp-postcss');
let cssnano=require('cssnano');
let uglify = require('gulp-uglify');
let postCssPlugin=[
	cssnano
];

gulp.task('clean', ()=>gulp.src('./dest').pipe(clean()))

gulp.task('html', ()=>
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dest/.'))
	.pipe(bs.stream())
	)

gulp.task('styles', ()=>
	gulp.src('src/styles/**/*.less')
	.pipe(less({
	}))
	.pipe(postCss(postCssPlugin))
	.pipe(gulp.dest('dest/styles/.'))
	.pipe(bs.stream())
	)

gulp.task('js', function (){
	return gulp.src(['src/js/index.js'])
	
	.pipe(browserify({
	}))
	.pipe(uglify())
	.pipe(gulp.dest('./dest/js'))
	.pipe(bs.stream())
})

gulp.task('sync', ()=>{
	bs.init({
		server:{baseDir:'dest/.'}
	})
})
gulp.task('build', gulp.parallel('html', 'styles', 'js'));
gulp.task('clean-build', gulp.series('clean', 'build'));
gulp.task('build-sync', gulp.series('clean-build', 'sync'));

gulp.task('watch',()=>{
	gulp.watch('src/styles/**/*.less',gulp.series('styles'));
	gulp.watch('src/**/*.html',gulp.series('html'));
	gulp.watch('src/js/**/*.js',gulp.series('js'));
})

gulp.task('default', gulp.parallel('build-sync', 'watch'));