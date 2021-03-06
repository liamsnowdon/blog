import fs from 'fs';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import mqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import merge from 'merge-stream';
import inject from 'gulp-inject';
import nunjucksRender from 'gulp-nunjucks-render';
import sitemap from 'gulp-sitemap';
import revision from 'gulp-rev';

import manageEnvironment from '../environment';
import Utilities from '../src/helpers/utilities';
import sitemapConfig from '../sitemap.config';

const cdnHost = process.env.CDN_HOST || '';

/**
 * Plugins to use with PostCSS
 * 
 * autoprefixer - automatically adds prefixes to properties based on browserlist config
 * mqPacker - merges all media queries into one
 * csssnano - minify
 */
const postcssPlugins = [
  autoprefixer({ cascade: false }),
  mqPacker(),
  cssnano()
];

/**
* Better handling of errors when piping
* 
* @param {string} name 
*/
function createErrorHandler(name) {
  return function (err) {
      console.error(`Error from ${name} in task ${err.toString()}`);
  };
}

/**
 * Serve production via browsersync
 */
export const serve = () => {
  browserSync.init({
      server: {
          baseDir: './dist',
          index: "index.html",
          serveStaticOptions: {
            extensions: ["html"]        
          }
      }
  });
};

/**
 * Copy and move some files to dist that are not processed
 * 
 * 1. Root files including favicon stuff
 * 2. Tags
 * 3. Categories
 * 4. Posts
 * 5. Font files (fontawesome)
 * 6. Images
 */
export const copyAndMoveFiles = () => {
  const rootFiles = gulp.src(['./src/*.{png,xml,ico,svg,webmanifest,txt}', './src/CNAME'])
      .pipe(gulp.dest('./dist'));

  const fonts = gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest('./dist/assets/fonts'));

  const images = gulp.src('./src/assets/images/**/*')
    .pipe(gulp.dest('./dist/assets/images'));

  return merge(rootFiles, fonts, images);
};

/**
* CSS files
* 
* 1. Compile Sass
* 2. Pass through PostCSS plugins
*/
export const css = () => {
  return gulp.src('./src/assets/scss/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(postcssPlugins))
      .pipe(revision())
      .pipe(gulp.dest('./dist/assets/css'));
};

/**
 * JavaScript files
 * 
 * 1. Concatenate third party and core file
 * 2. Minify all JS
 */
export const js = () => {
  return gulp.src(['./src/assets/third-party/**/*.js', './src/assets/js/core.js'])
      .pipe(concat('main.js'))
      .pipe(uglify().on('error', createErrorHandler('uglify')))
      .pipe(revision())
      .pipe(gulp.dest('./dist/assets/js'));
}

/**
 * Injects the main javascript and css files into the html
 */
export const injectAssets = () => {
  const sources = gulp.src(['./dist/assets/js/main*.js', './dist/assets/css/styles*.css'], { read: false });

  return gulp.src('./dist/**/*.html')
    .pipe(inject(sources, { ignorePath: 'dist', addRootSlash: false, addPrefix: cdnHost }))
    .pipe(gulp.dest('./dist'));
};

/**
* Builds html files from nunjucks pages
*/
export const nunjucks = () => {
  // Gets .html and .njk files in pages
  return gulp.src('./src/pages/**/*.+(html|njk)')
      // Renders template with nunjucks
      .pipe(nunjucksRender({
          path: ['./src/templates'],
          manageEnv: manageEnvironment
      }))
      .pipe(gulp.dest('./dist'));
};

/**
 * Creates a JSON file of recent posts to be used on my portfolio site
 * 
 * @param cb 
 */
export const createPortfolioJson = (cb) => {
  let posts = JSON.parse(fs.readFileSync('./src/data/posts.json'));
  const categories = JSON.parse(fs.readFileSync('./src/data/categories.json'));
  const tags = JSON.parse(fs.readFileSync('./src/data/tags.json'));

  posts.sort((a, b) => {
    return new Date(b.datePosted) - new Date(a.datePosted);
  });

  posts = posts.slice(0, 4);

  const recentPosts = posts.map(post => {
    return {
      ...post,
      datePosted: Utilities.shortDate(post.datePosted),
      category: categories.find(cat => cat.id === post.category),
      tags: post.tags.map(tag => tags.find(t => t.id === tag))
    };
  })

  if (!fs.existsSync('./dist/data')) {
    fs.mkdirSync('./dist/data');
  }

  fs.writeFileSync('./dist/data/portfolio-recent-posts.json', JSON.stringify(recentPosts, null, 4));

  cb();
};

export const createSitemap = () => {
  return gulp.src('./dist/**/*.html', { read: false })
    .pipe(sitemap(sitemapConfig))
    .pipe(gulp.dest('./dist'));
}