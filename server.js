const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');

const keys = require('./config/keys');
const walletRoutes = require('./routes/api/wallet');
const transactionRoutes = require('./routes/api/transaction');
const userRoutes = require('./routes/api/user');

const PORT = process.env.PORT || 5000;
const db = keys.mongoURI;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

//logging
app.use(morgan('dev'));

//use passport
app.use(passport.initialize());
require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello World'));

//Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, (req, res) => console.log(`listening on port ${PORT}`));
