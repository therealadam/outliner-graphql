/* An outliner
 * -----------
 *
 * Entrypoint for the whole thing. Set up the database connection, loggers, etc.
 * and then start the HTTP server.
 */

// var { graphql, buildSchema } = require('graphql');
//
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
//
// const root = {
//     hello: () => {
//         return 'hello howdy';
//     },
// };
// graphql(schema, '{ hello }', root).then( (response) => {
//     console.log(response);
// });

const db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./outline.sqlite3"
    }
});

export { db };

// TODO migration & seeds https://knexjs.org/#Migrations

const app = require('server');

app.listen(4000);

console.log("Running a GraphQL API at localhost:4000/graphql");

