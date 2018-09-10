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

      if(false){
      // CREATE sample data to work with
      var user1= new User({name: "Bob", username: "bob1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "User"});
      var user2= new User({name: "Emily", username: "emily1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "User"});
      var user3= new User({name: "Jess", username: "jess1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "User"});
      var user4= new User({name: "Michael", username: "michael1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "User"});
      var user5= new User({name: "Nicole", username: "nicole1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "User"});
      var admin1= new User({name: "Chris", username: "chris1", password: "$2b$10$r30TSMaRWCRfV3ocInepmO3XLUH.Ht/cuZOeZspSHnr/V34KIrVBa", role: "Admin"});
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


      var destination1 = new Destination({destination: "Kiel Heikendorf", TravelTime: "60"})
      var destination2 = new Destination({destination: "Kiel Strande", TravelTime: "240"})
      var destination3 = new Destination({destination: "Kiel Holtenau", TravelTime: "120"})
      destination1.save(function (err) {
        if(err) return console.error(err);
      })
      destination2.save(function (err) {
        if(err) return console.error(err);
      })
      destination3.save(function (err) {
        if(err) return console.error(err);
      })

      var boat1 = new Boat({boatName: "Columbus", crewName: ["Bob","Emily","Jess",user4.name], crewid:[user1._id,user2._id,user3._id,user4._id], maxCrew: 4, available: true});
      var boat2 = new Boat({boatName: "ColumbusII", crewName: [user1.name], crewid:[user1._id], maxCrew: 6, available: true});
      boat1.save(function (err) {
        if(err) return console.error(err);
      })
      boat2.save(function (err) {
        if(err) return console.error(err);
      })

      var logbook1 = new Logbook({boat: boat1._id, destination: destination1._id, departure: new Date('September 1, 2018 12:00:00') , arrival: new Date('September 1, 2018 12:30:00')});
      var logbook2 = new Logbook({boat: boat2._id, destination: destination2._id, departure: new Date('September 1, 2018 14:00:00') , arrival: new Date('September 1, 2018 15:30:00')});
      logbook1.save(function (err) {
        if(err) return console.error(err);
      })
      logbook2.save(function (err) {
        if(err) return console.error(err);
      })
      };

      //drop the content of all model to start fresh
      if(false){
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
const io = require('socket.io')(server);

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => io.emit('change'),
    20000
  );
  socket.on('unsubscribe', () => {socket.disconnect(); console.log('server unsub')});
  socket.on("disconnect", () => console.log("Client disconnected"));

});
