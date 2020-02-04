'use strict';

const fs = require('fs');
const path = require('path');
const resolver = require('opensphere-build-resolver/utils');

// if opensphere isn't linked in node_modules, assume it's a sibling directory
const appPath = resolver.resolveModulePath('opensphere') || path.join(__dirname, '..', 'opensphere');
const versionFile = path.join(appPath, '.build', 'version');
const version = fs.readFileSync(versionFile, 'utf8').trim().replace(/.*\//, '');

module.exports = {
  basePath: __dirname,
  appPath: appPath,
  appVersion: version,
  distPath: path.join(appPath, 'dist', 'opensphere'),
  templates: [{
    // add video libraries to main index page
    id: 'index',
    // don't generate index files here, only resolve the resources
    skip: true,
    resources: [{
      source: resolver.resolveModulePath('video.js/dist', __dirname),
      target: 'vendor/video.js',
      scripts: ['video.min.js'],
      css: ['video-js.min.css']
    },
    {
      source: resolver.resolveModulePath('@videojs/http-streaming/dist', __dirname),
      target: 'vendor/video.js',
      scripts: ['videojs-http-streaming.min.js']
    }]
  }]
};
