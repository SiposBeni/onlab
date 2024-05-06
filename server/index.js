const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes');
const authRouter = require('./routes/auth');


/**
 * Setup mongoose connection
 */
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.locals.db = mongoose.connection.db;
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch(err => console.error("Failed to connect to MongoDB", err));


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.use(session({
  secret: 'szupertitkos',
  resave: false,
  saveUninitialized: false
}));

/**
 * So all the views can see logged in user
 */
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});


app.use('/', routes);
app.use('/', authRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('An unexpected error occurred');
});
