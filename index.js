/*!
 * base-task <https://github.com/base/base-task>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

const define = require('define-property');
const Composer = require('composer');

module.exports = function(name) {
  return function plugin(app) {
    for (const key of Object.getOwnPropertyNames(Composer.prototype)) {
      if (!(key in this) && key !== 'prototype' && key !== 'constructor' && key !== 'name') {
        define(this, key, Composer.prototype[key]);
      }
    }
    this.tasks = this.tasks || {};
    return plugin;
  };
};
