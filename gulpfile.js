/*
 * Repotenshoku.com
 * © 2018, Sppoted, Inc.
 */

// ~~ IMPORTS ~~
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const named = require('vinyl-named');
const webpackStream = require('webpack-stream');
const path = require('path');

// ~~ VARS ~~

const PATH = {
  DIST: './dist',
  SRC: './src'
};

// ~~ TASKS ~~

// Lint the JS code.
gulp.task(
  'lint',
  () => {
    gulp
      .src([`${PATH.SRC}/**/*.js`])
      .pipe(eslint())
      .pipe(eslint.format())
  }
);

// Transpile, parse and bundle javascript files
gulp.task('build', (cb) => {
  const webpackConfig = {
    mode: 'production',

    devtool: 'source-map',

    resolve: {
      modules: [path.resolve('node_modules'), path.resolve('src')]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };

  gulp
    .src([`${PATH.SRC}/detectr.js`])
    .pipe(named())
    .pipe(
      webpackStream(webpackConfig).on('error', () => { })
    )
    .pipe(gulp.dest(PATH.DIST));

  cb();
});

// Start development ...
gulp.task('default', gulp.series(['lint', 'build']));
