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
    // original constructor reference
    var ctor = this.constructor;
    Composer.call(this, name);
    this.visit('define', Composer.prototype);

    // restore original constructor
    this.constructor = ctor;
  };
};
