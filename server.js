const express = require('express');
const dotenv = require("dotenv");
dotenv.config()
const connectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}localhost:27017`;
const app = express();

const port = process.env.PORT || 3000;

app.use('/' , require('./routes'));

app.listen(port, () => {console.log(`Runnning on port ${port}`)});
 