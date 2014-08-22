'use strict';

var fs = require('fs');

module.exports = function (path, options) {
  var versionedAppCache;
  var stats = fs.statSync(path);
  
  if (!stats || !stats.isFile()) {
    throw new Error('Appcache manifest file not found');
  }
  
  var lastModifiedDate = stats.mtime;
  var manifest = fs.readFileSync(path, { encoding: 'utf8' });
  var lines = manifest.split(/\r\n|\r|\n/);
  
  if (lines[0].trim() !== 'CACHE MANIFEST') {
    throw new Error('Not a valid appcache manifest file');
  }
  
  var manifestSectionRegex = /^(CACHE|FALLBACK|NETWORK|SETTINGS):$/;
  var matches, section, lastLineIndex;
  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    
    // Determine on what line to tag `lastModifiedDate`.
    if (i === lines.length - 1) {
      lastLineIndex = (line.indexOf('#lastModifiedDate=') === 0) ? i : i + 1;
    }
    
    // Skip blank lines or comments.
    if (line === '' || line.indexOf('#') === 0) {
      continue;
    }
    
    // Capture the section label, if we're at one.
    matches = line.match(manifestSectionRegex);
    if (matches) {
      section = matches[0];
      continue;
    }
    
    // Update `lastModifiedDate` considering the resource, if we're at one.
    if (!section || section === 'CACHE') {
      var resourceStats = fs.statSync(line);
  
      if (!resourceStats || !resourceStats.isFile()) {
        throw new Error('Appcache resource file not found');
      }
      
      var resourceModified = resourceStats.mtime;
      if (resourceModified >= lastModifiedDate) {
        lastModifiedDate = resourceModified;
      }      
    }
  }
  
  lines[lastLineIndex] = '#lastModifiedDate=' + lastModifiedDate.toString();
  versionedAppCache = lines.join('\r\n');
  
  return function (req, res, next) {
    if (options.disable) {
      return res.send(404);
    }
    
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    res.contentType('text/cache-manifest');
    res.send(versionedAppCache);
  };
};