const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
require('dotenv').config()
var cors = require('cors');
const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(cors());

// DB Config
// const db = config.get('mongoURI');
let db_pass = encodeURIComponent(process.env.DB_PASS);
const db = `${process.env.DB_HOST}${process.env.DB_USER}:${db_pass}${process.env.DB_DOMAIN}${process.env.DB_SSL}`

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: false,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }) 
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
