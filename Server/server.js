const express = require('express');
const app = express();
const passport = require('passport');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const config = require('./Database');
const LogBookRouter = require('./routes/route');
mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
    });

var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/logbook',LogBookRouter);
app.listen(PORT, function(){
    console.log('Server is running on Port: ',PORT);
});