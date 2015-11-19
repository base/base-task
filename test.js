'use strict';

require('mocha');
var Base = require('base-methods');
var assert = require('assert');
var tasks = require('./');
var base;

describe('tasks', function () {
  beforeEach(function() {
    base = new Base();
    base.use(tasks());
  });

  it('should add a `tasks` property:', function () {
    assert(base.tasks);
    assert.equal(typeof base.tasks, 'object');
  });

  it('should add a `task` method:', function () {
    assert.equal(typeof base.task, 'function');
  });

  it('should add a `build` method:', function () {
    assert.equal(typeof base.build, 'function');
  });

  it('should run a task:', function (done) {
    var res = null;
    base.task('a', function(cb) {
      res = 'abc';
      cb();
    });
    base.build('a', function(err) {
      assert.equal(res, 'abc');
      done();
    });
  });
});
