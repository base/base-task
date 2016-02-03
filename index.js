/*!
 * base-task <https://github.com/node-base/base-task>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(name) {
  var Composer = require('composer');

  return function() {
    if (this.isRegistered('base-task')) return;

    // original constructor reference
    var ctor = this.constructor;
    Composer.call(this, name);
    this.visit('define', Composer.prototype);

    // restore original constructor
    this.constructor = ctor;
  };
};
