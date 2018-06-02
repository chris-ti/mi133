const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const passport = require('passport');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const config = require('./Database');
const LogBookRouter = require('./routes/route');

const initAuth = require('./authenticate/init');
const AuthAPI = require('./authenticate/AuthAPI')


mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
    });


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
initAuth(app);
AuthAPI(LogBookRouter);
app.use(express.static('build'));

app.get('*', (req, res) => {
    res.sendFile('/index.html', { root: 'Server/dist' });
});

app.use('/logbook',LogBookRouter);
app.listen(PORT, function(){
    console.log('Server is running on Port: ',PORT);
});