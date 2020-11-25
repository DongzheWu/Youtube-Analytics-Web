const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require("body-parser");
const cors = require('cors');


require('./models/User');
require('./models/Record');
require('./models/Video');
require('./models/Topic');
require('./services/passport');


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

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

require('./routes/authRoute')(app);
require('./routes/searchRoute')(app);
require('./routes/recordRoute')(app);
require('./routes/topicRoutes')(app);
require('./routes/topRoute')(app);
require('./routes/trackRoute')(app);
require('./routes/trendRoute')(app);
require('./routes/timer')(app);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path. resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);