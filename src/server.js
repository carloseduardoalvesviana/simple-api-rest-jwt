const express = require('express');
const mongoose =require('mongoose');
const database = require('./database/config');
const routes = require('./routes');
const server = express();

mongoose.connect(database.uri, database.options)
.then(() => {
  console.log('Database is running');
}).catch((err) => {
  console.log(err);
});

server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 3333;
server.listen(3333, () => {
  console.log(`Api is running at port ${PORT}`)
});