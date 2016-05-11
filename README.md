# base-task [![NPM version](https://img.shields.io/npm/v/base-task.svg?style=flat)](https://www.npmjs.com/package/base-task) [![NPM downloads](https://img.shields.io/npm/dm/base-task.svg?style=flat)](https://npmjs.org/package/base-task) [![Build Status](https://img.shields.io/travis/node-base/base-task.svg?style=flat)](https://travis-ci.org/node-base/base-task)

base plugin that provides a very thin wrapper around [https://github.com/doowb/composer](https://github.com/doowb/composer) for adding task methods to your application.

You might also be interested in [base-watch](https://github.com/node-base/base-watch).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install base-task --save
```

## Usage

```js
var Base = require('base-methods');
var tasks = require('base-task');
Base.use(tasks());

var base = new Base();
base.task('foo', function(cb) {
  console.log('this is foo!');
  cb();
});
base.task('bar', function(cb) {
  console.log('this is bar!');
  cb();
});

base.build(['foo', 'bar'], function(err) {
  // this is foo!
  // this is bar!
  console.log('done!');
});
```

See the [composer](https://github.com/jonschlinkert/composer) documentation for more details, or to create bug reports related to running or registering tasks.

## API

### .task

Register a task

**Params**

* `name` **{String}**: Task name to register (tasks are cached on `app.tasks`)
* `dependencies` **{String|Array|Function}**: String, list or array of tasks.
* `callback` **{Function}**: Function to be called when the task is executed. Task functions should either return a stream or call the callback to let [composer](https://github.com/doowb/composer) know when the task is finished.

**Examples**

Register a task.

```js
app.task('default', function() {
  // return the stream to signal "done"
  return app.src('pages/*.hbs')
    .pipe(app.dest('dist'));
});
```

Register a task with dependencies (other tasks to run before executing the task):

```js
app.task('site', ['styles'], function() {
  return app.src('pages/*.hbs')
    .pipe(app.dest('dist'));
});

app.task('default', ['site']);
```

**Get a task**

```js
var task = app.task('site');
```

### .build

Run a task or array of tasks.

**Example**

```js
app.build('default', function(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
});
```

### .series

Compose task or list of tasks into a single function that runs the tasks in series.

**Params**

* `tasks` **{String|Array|Function}**: List of tasks by name, function, or array of names/functions.
* `returns` **{Function}**: Composed function that may take a callback function.

**Example**

```js
app.task('foo', function(cb) {
  console.log('this is foo');
  cb();
});

var fn = app.series('foo', function(cb) {
  console.log('this is bar');
  cb();
});

fn(function(err) {
  if (err) return console.error(err);
  console.log('finished');
});
//=> this is foo
//=> this is bar
//=> finished
```

### .parallel

Compose task or list of tasks into a single function that runs the tasks in parallel.

**Params**

* `tasks` **{String|Array|Function}**: List of tasks by name, function, or array of names/functions.
* `returns` **{Function}**: Composed function that may take a callback function.

**Example**

```js
app.task('foo', function(cb) {
  setTimeout(function() {
    console.log('this is foo');
    cb();
  }, 500);
});

var fn = app.parallel('foo', function(cb) {
  console.log('this is bar');
  cb();
});

fn(function(err) {
  if (err) return console.error(err);
  console.log('finished');
});
//=> this is bar
//=> this is foo
//=> finished
```

## Events

The following events are emitted by [composer](https://github.com/jonschlinkert/composer). See the composer docs for more details

### starting

Emitted when a `build` is starting.

```js
app.on('starting', function(app, build) {});
```

The event emits 2 arguments:

1. the current instance of [composer](https://github.com/jonschlinkert/composer) as the `app` and
2. An object with `build` runtime information:

* `.date`: an object with the `.start` time as a `Date` object.
* `.hr`: an object with the `.start` time as an `hrtime` array.

### finished

Emitted when a `build` is finished.

```js
app.on('finished', function(app, build) {});
```

The event emits 2 arguments:

1. `app`: instance of [composer](https://github.com/jonschlinkert/composer)
2. `build`: an object with build runtime information:

* `.date`: object with `.start` and `.end` properties, with staring and ending times of the build as `Date` objects.
* `.hr`: object with `.start`, `.end`, `.duration`, and `.diff` properties with timing information calculated using `process.hrtime`

### error

Emitted when an error occurrs during a `build`.

```js
app.on('error', function(err) {});
```

### task:starting

Emitted when a task is starting.

```js
app.on('task:starting', function(task, run) {});
```

### task:finished

Emitted when a task has finished.

```js
app.on('task:finished', function(task, run) {});
```

### task:error

Emitted when an error occurrs while running a task.

```js
app.on('task:error', function(err) {});
```

## History

**v0.3.0**

* Bumped [composer](https://github.com/doowb/composer) to v0.11.0, so the `.watch` method is no longer included by default. To add `.watch`, use the [base-watch](https://github.com/node-base/base-watch) plugin.

## Related projects

Other base plugins you might be interested in:

* [base-cli](https://www.npmjs.com/package/base-cli): Plugin for base-methods that maps built-in methods to CLI args (also supports methods from a… [more](https://www.npmjs.com/package/base-cli) | [homepage](https://github.com/node-base/base-cli)
* [base-generators](https://www.npmjs.com/package/base-generators): Adds project-generator support to your `base` application. | [homepage](https://github.com/node-base/base-generators)
* [base-option](https://www.npmjs.com/package/base-option): Adds a few options methods to base, like `option`, `enable` and `disable`. See the readme… [more](https://www.npmjs.com/package/base-option) | [homepage](https://github.com/node-base/base-option)
* [base-plugins](https://www.npmjs.com/package/base-plugins): Upgrade's plugin support in base applications to allow plugins to be called any time after… [more](https://www.npmjs.com/package/base-plugins) | [homepage](https://github.com/node-base/base-plugins)
* [base-store](https://www.npmjs.com/package/base-store): Plugin for getting and persisting config values with your base-methods application. Adds a 'store' object… [more](https://www.npmjs.com/package/base-store) | [homepage](https://github.com/node-base/base-store)
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/node-base/base-task/issues/new).

## Building docs

Generate readme and API documentation with [verb][]:

```sh
$ npm install verb && npm run docs
```

Or, if [verb][] is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/node-base/base-task/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 11, 2016._