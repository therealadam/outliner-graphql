const express = require('express');
const graphqlHTTP = require('express-graphql');

const { schema, root } = require('graph');

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root
}));

export { app };
