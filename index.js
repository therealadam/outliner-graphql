/* An outliner
 * -----------
 *
 * Entrypoint for the whole thing. Set up the database connection, loggers, etc.
 * and then start the HTTP server.
 */

if (false) {
    const db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: "./outline.sqlite3"
        }
    });
// TODO migration & seeds https://knexjs.org/#Migrations
}

const express = require('express');
const graphqlHTTP = require('express-graphql');

const { schema, root } = require('./graph');

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root
}));

app.listen(4000);

console.log("Running a GraphQL API at localhost:4000/graphql");

