/*!
 * base-task <https://github.com/node-base/base-task>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';


module.exports = function(name, fn) {
  var isValidInstance = require('is-valid-instance');
  var isRegistered = require('is-registered');
  var Composer = require('composer');

  if (typeof name === 'function') {
    fn = name;
    name = undefined;
  }

  return function baseTask(app) {
    if (!isValid(app)) return;

    // original constructor reference
    var ctor = this.constructor;
    Composer.call(this, name);
    this.visit('define', Composer.prototype);

    // restore original constructor
    this.constructor = ctor;
    return baseTask;
  };


  function isValid(app) {
    if (!isValidInstance(app)) {
      return false;
    }
    if (isRegistered(app, 'base-task')) {
      return false;
    }
    return true;
  }
};

