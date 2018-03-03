const Base = require('base');
const tasks = require('./');

const base = new Base();
base.use(tasks());

/**
 * Define tasks
 */

base.task('foo', function(cb) {
  console.log('this is foo!');
  cb();
});
base.task('bar', function(cb) {
  console.log('this is bar!');
  cb();
});

/**
 * Build tasks
 */

base.build(['foo', 'bar'])
  .then(() => {
    // this is foo!
    // this is bar!
    console.log('done!');
  })
  .catch(console.error)
