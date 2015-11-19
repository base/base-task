/*!
 * base-tasks <https://github.com/jonschlinkert/base-tasks>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Composer = require('composer');

module.exports = function(name) {
  return function() {
    Composer.call(this, name);
    for (var key in Composer.prototype) {
      this.constructor.prototype[key] = Composer.prototype[key].bind(this);
    }
  };
};

