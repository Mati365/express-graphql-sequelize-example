import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import * as R from 'ramda';

import redisStreamCache from './decorators/redisStreamCache';

import Models from '../models';
import HTMLSkeleton from '../client/components/HTMLSkeleton.jsx';

const app = express();
const appComponentRedisCache = redisStreamCache(
  require('../config/config.json')[process.env.NODE_ENV || 'development'].redis
);

const SEOTableDescriptor = ({name, children}) => (
  <div itemScope itemType="http://schema.org/Table">
    <h2 itemProp="about">{name}</h2>
    {children}
  </div>
);

const UsersTable = ({users}) => {
  const mapList = placeholder => R.compose(
    R.when(
      R.isEmpty,
      R.always(placeholder),
    ),
    R.map(
      ({dataValues: {id: articleId, title}}) => `ID: ${articleId} Title: ${title}`,
    ),
    R.defaultTo([])
  );

  return (
    <SEOTableDescriptor name='Workers description list'>
      <table>
        <thead>
          <tr>
            <th>Name:</th>
            <th>Surname:</th>
            <th>Articles:</th>
            <th>Tasks:</th>
          </tr>
        </thead>

        <tbody>
          {R.addIndex(R.map)(
            ({dataValues: user}, index) => (
              <tr 
                key={user.id}
                style={{
                  background: (index % 2 === 0) ? '#ded' : '#fff'
                }}

                itemScope
                itemProp='creator'
                itemType='https://schema.org/Product'
              >
                <td itemProp='name'>{user.firstName}</td>
                <td itemProp='additionalName'>{user.lastName}</td>
                <td>
                  {mapList('No articles')(user.Articles)}
                </td>
                <td>
                  {mapList('No tasks')(user.Tasks)}
                </td>
              </tr>
            ), 
            users
          )}
        </tbody>
      </table>
    </SEOTableDescriptor>
  );
};

const AppSkeleton = appComponentRedisCache(
  R.always({
    key: 'html-skeleton-app-key', // REDIS DB KEY
    expire: 10, // 10s
  }),
)(
  ({users}) => (
    <HTMLSkeleton>
      <h1>App Users</h1>
      <div style={{marginTop: 10, marginBottom: 10}} />
      <UsersTable users={users} />
    </HTMLSkeleton>
  )
);

app
  .get('/', (req, res) => {
    AppSkeleton.__renderStream(
      res, 
      null,
      null,
      async () => ({
        users: await Models.User.findAll({
          limit: 200,
          attributes: ['firstName', 'lastName', 'id'],
          include: [
            {
              model: Models.Article,
              attributes: ['id', 'title'],
            },
            {
              model: Models.Task,
              attributes: ['id', 'title'],
            }
          ],
        }), 
      }));
  });

app.listen(process.env.APP_PORT || 80);
