require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const connectDB = require('./database');
const Event = require('./models/event');

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

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
                    return { ...event._doc, _id: event._doc._id.toString() }
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
               return { ...result._doc };
           }).catch(err => {
               console.log(err);
               throw err;
           });
        }
    },
    graphiql: true
}));

connectDB();

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})