const express = require('express');
const graphqlHTTP = require('express-graphql');
var { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => {
        return 'hello howdy';
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root
}));
app.listen(4000);

console.log("Running a GraphQL API at localhost:4000/graphql");

// graphql(schema, '{ hello }', root).then( (response) => {
//     console.log(response);
// });