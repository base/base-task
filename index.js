/*!
 * base-tasks <https://github.com/jonschlinkert/base-tasks>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Composer = require('composer');

module.exports = function(name) {
  return function(app) {
    Composer.call(app, name);
    app.constructor.inherit(app.constructor, Composer);
  };
};
