/*!
 * base-task <https://github.com/base/base-task>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

const define = require('define-property');
const Composer = require('composer');

module.exports = function(options) {
  return function(app) {
    this.composer = new Composer(options);
    this.tasks = this.composer.tasks;
    define(this, 'build', this.composer.build.bind(this.composer));
    define(this, 'task', this.composer.task.bind(this.composer));
    define(this, 'parallel', this.composer.parallel.bind(this.composer));
    define(this, 'series', this.composer.series.bind(this.composer));
    this.composer.on('build', this.emit.bind(this, 'build'));
    this.composer.on('task', this.emit.bind(this, 'task'));
  };
};
