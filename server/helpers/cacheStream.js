import {Transform} from 'stream';

/* Writes pipe data to buffer and calls cacheFn with buffer
 * after whole pipe is done.
 *
 * @param {Function}  cacheFn
 */
const cacheStream = (cacheFn) => {
  let cacheEntry = '';

  return new Transform({
    transform(chunk, env, callback) {
      cacheEntry += chunk;
      callback(null, chunk);
    },

    flush(callback) {
      cacheFn(cacheEntry);
      callback();
    },
  });
};

export default cacheStream;
