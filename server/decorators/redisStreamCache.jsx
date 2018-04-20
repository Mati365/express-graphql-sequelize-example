import React from 'react';
import ReactDOMServer from 'react-dom/server';
import redis from 'redis';

import {Readable} from 'stream';
import {promisify} from 'util';

import * as R from 'ramda';

import cacheStream from '../helpers/cacheStream';

const stringStream = (str) => {
  const s = new Readable();
  s._read = function() {};
  s.push(str);
  s.push(null); // eos
  return s;
};

/**
 * Create component that renders to string and caches to redis
 */
const redisStreamCache = R.curry(
  (redisClientConfig, cacheKeyFn) => Component => {
    const client = redis.createClient(redisClientConfig);
    const getRedisAsync = promisify(client.get).bind(client);
    
    client.on('error', (error) => {
      console.log(`Error: ${error}`);
    });

    return {
      async __renderStream(res, props, children, cacheableProps) {
        const {
          key, 
          expire = 2*60, // 2 mins
        } = cacheKeyFn(props);

        const data = await getRedisAsync(key);
        let stream = null;
        if (!data) {
          const cachedProps = cacheableProps && (await cacheableProps(props));
          stream = ReactDOMServer.renderToNodeStream(
            <Component 
              {...props}
              {...cachedProps}
            >
              {children}
            </Component>
          );
          
          stream.pipe(cacheStream(
            data => {
              client.setex(key, expire, data, redis.print);
            },
          ));
        } else
          stream = stringStream(data);

        stream.pipe(res, {
          end: false,
        });
          
        stream.on('end', () => {
          res.end();
        });

        return stream;
      }
    };
  }
);

export default redisStreamCache;
