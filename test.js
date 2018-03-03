'use strict';

require('mocha');
var Base = require('base');
var assert = require('assert');
var tasks = require('./');
var base;

describe('tasks', function() {
  beforeEach(function() {
    base = new Base();
    base.use('base-task', tasks());
  });

  it('should register the plugin', function() {
    assert(base.isRegistered('base-task'));
  });

  it('should not register the plugin more than once', function() {
    let count = 0;
    base = new Base();
    base.on('plugin', () => (count++));
    base.use(tasks());
    base.use(tasks());
    base.use(tasks());
    base.use(tasks());
    assert.equal(count, 1);
  });

  it('should decorate a `tasks` property', function() {
    assert(base.tasks);
    assert.equal(typeof base.tasks, 'object');
  });

  it('should decorate a `task` method', function() {
    assert.equal(typeof base.task, 'function');
  });

  it('should decorate a `build` method', function() {
    assert.equal(typeof base.build, 'function');
  });

  it('should run a task', function(cb) {
    let count = 0;
    base.task('a', function(next) {
      count++;
      next();
    });
    base.build('a', function(err) {
      assert.equal(count, 1);
      cb();
    });
  });

  it('should run multiple tasks', function(cb) {
    let count = 0;
    base.task('a', function(next) {
      count++;
      next();
    });

    base.task('b', function(next) {
      count++;
      next();
    });

    base.build(['a', 'b'], function(err) {
      assert.equal(count, 2);
      cb();
    });
  });

  it('should return a promise', function(cb) {
    let count = 0;
    base.task('a', function(next) {
      count++;
      next();
    });

    base.task('b', function(next) {
      count++;
      next();
    });

    base.build(['a', 'b'])
      .then(() => {
        assert.equal(count, 2);
        cb();
      });
  });

  it('should emit task events', function(cb) {
    let count = 0;

    base.on('task', task => {
      switch (task.status) {
        case 'register':
          count++;
          break;
        case 'starting':
          count++;
          break;
        case 'finished':
          count++;
          break;
        default: {
          break;
        }
      }
    });

    base.task('a', next => next());
    base.task('b', next => next());

    base.build(['a', 'b'], function(err) {
      assert.equal(count, 6);
      cb();
    });
  });
});
