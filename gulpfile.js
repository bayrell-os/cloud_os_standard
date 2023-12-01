const { src, dest, series, parallel, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

function clean(cb) {
	cb();
}

function compileBootstrap(cb) {
	return src('./src/app/bootstrap.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(concat('bootstrap.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(dest('./src/public/assets'))
	;
}

function compileApp(cb) {
	return src([
			'./src/public/assets/vue.runtime.global.prod.js',
			'./src/public/assets/runtime.js',
			'./src/public/assets/app.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(dest('./src/public/assets'))
	;
}

// Определение задач
task('clean', clean);
task('app', compileApp);
task('bootstrap', compileBootstrap);

// Основная задача сборки
exports.build = series(clean, parallel('app', 'bootstrap'));