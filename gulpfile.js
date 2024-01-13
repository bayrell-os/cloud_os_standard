const { src, dest, series, parallel, task, watch } = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
var through = require('through2');

function clean(cb) {
	cb();
}

function copyVue() {
	return src([
			'./node_modules/vue/dist/vue.runtime.global.js',
			'./node_modules/vue/dist/vue.runtime.global.prod.js',
		])
		.pipe(dest('./src/public/assets'))
	;
}

function compileCss() {
	return src([
		])
		.pipe(sourcemaps.init())
		.pipe(minifyCSS())
		.pipe(concat('lib.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(dest('./src/public/assets'))
	;
}

function compileApp() {
	return src([
			'./src/public/assets/vue.runtime.global.prod.js',
			'./src/public/assets/runtime.js',
			'./src/public/assets/app.js',
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
		'./src/public/assets/runtime.js',
		'./src/public/assets/app.js'
	], compileJs);
}

// Определение задач
task('clean', clean);
task('vue', copyVue);
task('app', compileApp);
task('watch', watchFiles);

// Основная задача сборки
exports.build = series('clean', parallel('vue'), 'app');
