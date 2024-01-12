const { src, dest, series, parallel, task, watch } = require('gulp');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

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
			'./src/lib/Runtime.Widget.CodeMirror/resources/codemirror/lib/codemirror.css',
		])
		.pipe(sourcemaps.init())
		.pipe(minifyCSS())
		.pipe(concat('app.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(dest('./src/public/assets'))
	;
}

function compileJs() {
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
		'./src/public/assets/runtime.js',
		'./src/public/assets/app.js'
	], compileJs);
}

// Определение задач
task('clean', clean);
task('vue', copyVue);
task('js', compileJs);
task('css', compileCss);
task('watch', watchFiles);

// Основная задача сборки
exports.build = series('clean', 'vue', parallel('css', 'js'));