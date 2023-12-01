const { src, dest, series, parallel, task, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

function clean(cb) {
	cb();
}

function compileCss(cb) {
	return src('./src/app/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(concat('app.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(dest('./src/public/assets'))
	;
}

function compileJs(cb) {
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

function watchFiles() {
	watch([
		'./src/app/app.scss'
	], compileCss);
}

// Определение задач
task('clean', clean);
task('css', compileCss);
task('js', compileJs);
task('watch', watchFiles);

// Основная задача сборки
exports.build = series(clean, parallel('css', 'js'));