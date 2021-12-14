require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const connectDB = require('./database');
const Event = require('./models/event');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String! 
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find().then(events => {
                return events.map(event => {
                    return { ...event._doc }
                });
            }).catch(err => {
                console.log(err);
                throw err;
            });
        },
        createEvent: (args) => {
           const event = new Event({
               title: args.eventInput.title,
               description: args.eventInput.description,
               price: args.eventInput.price,
               date: new Date(args.eventInput.date)
           });
           return event.save().then(result => {
               return { ...result._doc, _id: result._doc._id.toString()  };
           }).catch(err => {
               console.log(err);
               throw err;
           });
        },
        createUser: (args) => {
            const user = new User({
                email: args.userInput.email,
                password: args.userInput.password
            });
            return user.save().then(result => ({ ...result._doc, password: null, _id: result.id.toString() })).catch(err => {console.log(err); throw err;});
        }
    },
    graphiql: true
}));

connectDB();

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})