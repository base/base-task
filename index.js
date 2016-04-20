/*!
 * base-task <https://github.com/node-base/base-task>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(name) {
  var Composer = require('composer');

  return function baseTask(app) {
    if (!isValidInstance(app)) return;

    // original constructor reference
    var ctor = this.constructor;
    Composer.call(this, name);
    this.visit('define', Composer.prototype);

    // restore original constructor
    this.constructor = ctor;
    return baseTask;
  };
};

function isValidInstance(app) {
  var fn = app.options.validatePlugin;
  if (typeof fn === 'function' && !fn(app)) {
    return false;
  }
  if (app.isRegistered('base-task')) {
    return false;
  }
  if (app.isCollection || app.isView || app.isItem) {
    return false;
  }
  return true;
}
