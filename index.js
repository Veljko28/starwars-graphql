const {ApolloServer} = require('apollo-server-express');
const {importSchema} = require('graphql-import');
const express = require('express');

const app = express();

const typeDefs = importSchema('./schema.graphql');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});


app.listen({port: 4000},() => { console.log("Server running on http://localhost:4000/graphql")})