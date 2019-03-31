/* Graph Schema & Resolvers
 * ------------------------
 *
 * GraphQL types, schema, and resolvers declare how to turn queries into function calls.
 */

const { buildSchema } = require('graphql');
const crypto = require('crypto'); // Stand-in for generating random hex IDs

// Build a GraphQL schema/IDL from text. There's also an option to construct one from JS/data, but
// this is pretty good for now.
const schema = buildSchema(`
  # The essentials of an outline. Presumably there's a way to extend this type to a fully-formed
  # Outline-with-an-ID but I haven't gone that deep yet.
  input NewOutline {
    name: String! # Any bang-type is required; hooray for driving out nulls!
  }
  
  # So for now, the body of the Outline type is reproduced here
  type Outline {
    id: ID!
    name: String!
    
  }
  
  # All the reads go in the Query type. Its odd to me that data types and the API "entry points" for reads and writes both use 'type' but okay
  type Query {
    getOutline(id: ID!): Outline
  }
  
  
  type Mutation {
      createOutline(input: NewOutline): Outline
  }
`);

// A stand-in Outline type
// TODO replace with export from model?
class Outline {

    constructor(id, { name }) {
        this.id = id;
        this.name = name;
    }

    // A thing you can do with the JS GraphQL library is define the operations
    // in a class like this, as instance functions. Not sure how I feel about that,
    // and don't need to do it here just yet.
}

// In lieu of writing some query/SQL bits...
let fakeDatabase = {};

// In lieu of letting a database generate identifiers for me...
const makeId = () => {
    return crypto.randomBytes(10).toString('hex');
};

// Not sure why 'root' is the idiomatic name for "the thing that does the querying and mutating",
// but here we are, where the magic happens. Each function here is a query or mutator as defined
// by the schema.
const root = {
    getOutline: ({id}) => {
        const outline = fakeDatabase[id];
        if (!outline) {
            throw new Error(`no outline found for ${id}`)
        }

        return new Outline(id, outline);
    },

    createOutline: ({input}) => {
        const id = makeId();

        fakeDatabase[id] = input;

        return new Outline(id, input);
    }
};

module.exports = { schema, root };