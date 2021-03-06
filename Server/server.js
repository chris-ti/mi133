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
const AuthAPI = require('./authenticate/AuthAPI');

const User = require('./models/user.js');
const Destination = require('./models/destination.js');
const Logbook = require('./models/logbook.js');
const Boat = require('./models/boat.js');

mongoose.connect(config.DB).then(
    () => {
      console.log('Database is connected');

      let createSampleData = false;
      let deleteSampleData = false;

      if(deleteSampleData){
      User.remove({}, function(err) {
       if(err) return console.error(err);
      console.log('users removed')
      });
      Boat.remove({}, function(err) {
       if(err) return console.error(err);
      console.log('boats removed')
      });
      Destination.remove({}, function(err) {
       if(err) return console.error(err);
      console.log('destinations removed')
      });
      Logbook.remove({}, function(err) {
       if(err) return console.error(err);
      console.log('logbookentries removed')
      });
      };

      if(createSampleData){
      var user1= new User({name: "Brenda", username: "brenda1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "MEMBER"});
      var user2= new User({name: "Kelly", username: "kelly1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "MEMBER"});
      var user3= new User({name: "Steve", username: "steve1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "MEMBER"});
      var user4= new User({name: "Bob", username: "bob1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "MEMBER"});
      var admin1= new User({name: "Chris", username: "chris1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "ADMIN"});
      user1.save(function (err, user1) {
        if(err) return console.error(err);
      })
      user2.save(function (err) {
        if(err) return console.error(err);
      })
      user3.save(function (err) {
        if(err) return console.error(err);
      })
      user4.save(function (err) {
        if(err) return console.error(err);
      })
      user5.save(function (err) {
        if(err) return console.error(err);
      })
      admin1.save(function (err) {
        if(err) return console.error(err);
      })
      console.log("created User");

      var destination1 = new Destination({destination: "Kiel Heikendorf", travelTime: "2"})
      var destination2 = new Destination({destination: "Kiel Strande", travelTime: "1"})
      var destination3 = new Destination({destination: "Kiel Holtenau", travelTime: "3"})
      destination1.save(function (err) {
        if(err) return console.error(err);
      })
      destination2.save(function (err) {
        if(err) return console.error(err);
      })
      destination3.save(function (err) {
        if(err) return console.error(err);
      })
      console.log("created destinations");

      var boat1 = new Boat({boatName: "Columbus", crewName: [user1.name,user2.name], maxCrew: 4, available: true});
      var boat2 = new Boat({boatName: "Seagull", crewName: [user3.name,user4.name],  maxCrew: 6, available: true});
      boat1.save(function (err) {
        if(err) return console.error(err);
      })
      boat2.save(function (err) {
        if(err) return console.error(err);
      })
      console.log("created boats");

      var logbook1 = new Logbook({boatName: boat1.boatName,crewName: [user1.name,user2.name], destination: destination1.destination, departure: new Date('September 1, 2018 12:00:00') , arrival: new Date('September 1, 2018 12:30:00')});
      var logbook2 = new Logbook({boatName: boat2.boatName,crewName: [user3.name,user4.name], destination: destination2.destination, departure: new Date('September 1, 2018 14:00:00') , arrival: new Date('September 1, 2018 15:30:00')});
      logbook1.save(function (err) {
        if(err) return console.error(err);
      })
      logbook2.save(function (err) {
        if(err) return console.error(err);
      })
      console.log('created logbookentries');
      };


        //setup socket connection
        const io = require('socket.io')(server);
        io.on("connection", socket => {
        console.log("New client connected")
        socket.on("disconnect", () => {console.log("Client disconnected")});

        //create changestreams to watch for database changes
        var db = mongoose.connection;
        const changeStreamLogbook = db.collection('logbook').watch();
        const changeStreamBoat = db.collection('boat').watch();
        const changeStreamDestination = db.collection('destination').watch();
        const changeStreamUser = db.collection('user').watch();

        changeStreamLogbook.on('change', function(change){
          console.log('collection logbook has changed');
          socket.emit('changeLogbook');
        });

        changeStreamBoat.on('change', function(change){
          console.log('collection boat has changed');
          socket.emit('changeBoat');
        });

        changeStreamDestination.on('change', function(change){
          console.log('collection destination has changed');
          socket.emit('changeDestination');

        });
        changeStreamUser.on('change', function(change){
          console.log('collection user has changed');
          socket.emit('changeUser');
        });

      });


    },
    err => { console.log('Can not connect to the database' +err)
    });

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
initAuth(app);
AuthAPI(LogBookRouter);
app.use(express.static('build'));

app.use('/api',LogBookRouter);
const server = app.listen(PORT, function(){
    console.log('Server is running on Port: ',PORT);
});
