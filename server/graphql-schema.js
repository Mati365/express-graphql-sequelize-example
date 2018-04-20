import Sequelize from 'sequelize';
import * as R from 'ramda';
import {resolver} from 'graphql-sequelize';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLDate,
  GraphQLBool,
} from 'graphql';

import Models from '../models';

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category task',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the category.',
    },
    name: {
      type: GraphQLString,
      description: 'The of the category.',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'User article',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the article.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the article.',
    },
    content: {
      type: GraphQLString,
      description: 'The content of the article.',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
    categories: {
      type: new GraphQLList(categoryType),
      args: {
        id: {
          description: 'id of the category',
          type: GraphQLInt
        }
      },
      resolve: resolver(Models.Article.Categories),
    },
  },
});

const taskType = new GraphQLObjectType({
  name: 'Task',
  description: 'User task',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the task.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the task.',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'The id of the user.',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user.',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user.',
    },
    age: {
      type: GraphQLInt,
      description: 'The age of the user',
    },
    articles: {
      type: new GraphQLList(articleType),
      resolve: resolver(Models.User.Articles),
      args: {
        id: {
          description: 'id of the article',
          type: GraphQLInt
        }
      },
    },
    tasks: {
      type: new GraphQLList(taskType),
      args: {
        id: {
          description: 'id of the task',
          type: GraphQLInt
        }
      },
      resolve: resolver(Models.User.Tasks),
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const userResolver = (type) => ({
  type,
  args: {
    id: {
      description: 'id of the user',
      type: GraphQLInt
    },
    query: {
      type: GraphQLString,
    },
    firstName: {
      description: 'firstName of the user',
      type: GraphQLString
    },
    lastName: {
      description: 'lastName of the user',
      type: GraphQLString
    },
    olderThan: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    },
    orderBy: {
      type: GraphQLString,
    },
    orderType: {
      type: GraphQLString,
    },
  },
  resolve: resolver(Models.User, {
    before: (findOptions, args) => {
      let where = {};
      if (args.query) {
        where["$or"] = [
          Sequelize.where(
            Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')),
            {
              like: `%${args.query}%`
            }),
          {lastName: {"$like": `%${args.query}%`}},
          {firstName: {"$like": `%${args.query}%`}},
        ];
      }

      if (args.olderThan) {
        where = R.merge(where, {
          age: {
            "$gt": args.olderThan,
          }
        });
      }

      if (!R.isNil(args.limit))
        findOptions.limit = args.limit;

      if (!R.isEmpty(where))
        findOptions.where = where;

      if (args.orderBy)
        findOptions.order = [[args.orderBy, args.orderType || 'ASC']];

      return findOptions;
    },
  })
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: userResolver(userType),
      users: userResolver(new GraphQLList(userType)),
      article: {
        type: articleType,
        resolve: resolver(Models.Article),
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
      },
    }
  })
});
