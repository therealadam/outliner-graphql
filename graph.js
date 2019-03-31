/* Graph Schema & Resolvers
 * ------------------------
 *
 * GraphQL types, schema, and resolvers declare how to turn queries into function calls.
 */

const { buildSchema } = require('graphql');
const crypto = require('crypto');

const schema = buildSchema(`
  input NewOutline {
    text: String!
  }
  
  type Outline {
    id: ID!
    name: String!
    
  }
  
  type Query {
    getOutline(id: ID!): Outline
  }
  
  
  type Mutation {
      createOutline(input: NewOutline): Outline
  }
`);

// TODO replace with export from model?
class Outline {

    constructor(id, { name }) {
        this.id = id;
        this.name = name;
    }
}

let fakeDatabase = {};

const makeId = () => {
    crypto.randomBytes(10).toString('hex');
};

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

        fakeDatabase[id] = input

        return new Outline(id, input);
    }
};
// const root = {
//     fetchOutline: () => {
//         return "Not exactly an outline";
//     },
//     // XXX really a mutation
//     createOutline: ({name}) => {
//         return Outline({ name });
//     }
// };

export { schema, root };