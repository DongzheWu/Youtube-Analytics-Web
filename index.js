const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

//Load NoSQL data schema models.
require('./models/User');
require('./models/Record');
require('./models/Video');
require('./models/Topic');

//Load passort to support google account sign in.
require('./services/passport');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(express.static('client/build'));

app.use(
    cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Load routes modules to handle requests from client.
require('./routes/authRoute')(app);
require('./routes/searchRoute')(app);
require('./routes/topicRoutes')(app);
require('./routes/mapRoute')(app);
require('./routes/trackRoute')(app);
require('./routes/trendRoute')(app);
require('./routes/recordRoute')(app);
require('./routes/timer')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});