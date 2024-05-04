const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes');
const authRouter = require('./routes/auth');


// mongoose setup
const uri = "mongodb+srv://webserver:asdf1234@onlab.k1cnug0.mongodb.net/?retryWrites=true&w=majority&appName=Onlab";
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

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});


app.use('/', routes);
app.use('/', authRouter);
