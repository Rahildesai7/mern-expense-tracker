const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log('Connected to database');
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const expensesRouter = require('./routes/expense.router');
const usersRouter = require('./routes/user.router');

app.use('/expenses', expensesRouter);
app.use('/users', usersRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port: ` + port );
});