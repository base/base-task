'use strict';

require('mocha');
var Base = require('base');
var assert = require('assert');
var tasks = require('./');
var base;

describe('tasks', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(tasks());
  });

  it('should register the plugin', function() {
    assert(base.isRegistered('base-task'));
  });

  it('should not register the plugin more than once', function() {
    var count = 0;
    base = new Base();
    base.isApp = true;
    base.on('plugin', function() {
      count++;
    });

    base.use(tasks());
    base.use(tasks());
    base.use(tasks());
    base.use(tasks());
    assert.equal(count, 1);
  });

  it('should add a `tasks` property:', function() {
    assert(base.tasks);
    assert.equal(typeof base.tasks, 'object');
  });

  it('should add a `task` method:', function() {
    assert.equal(typeof base.task, 'function');
  });

  it('should add a `build` method:', function() {
    assert.equal(typeof base.build, 'function');
  });

  it('should run a task:', function(cb) {
    var count = 0;
    base.task('a', function(next) {
      count++;
      next();
    });
    base.build('a', function(err) {
      assert.equal(count, 1);
      cb();
    });
  });
});
