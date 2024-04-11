require('rootpath')();
require('dotenv').config();
require('./config/s3');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index.routes');
const cookieSession = require('cookie-session');
const { errorMiddleware } = require('./middleware/error.middleware');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours,
    resave: false,
    httpOnly: true,
    saveUninitialized: true,
    secure: true,
    sameSite: 'strict'
}));

app.use('/api', router);

app.use(errorMiddleware);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(process.env.PORT, () => {
    console.log('The magic happens on port ' + process.env.PORT);
});