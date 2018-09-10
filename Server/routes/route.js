const express = require('express');
const app = express();
const LogBookRouter = express.Router();
const ensureAuthenticated = require('../util/ensureAuthenticated');
var User = require('../models/user');
const LogBook = require('../models/logbook');
const Boat = require('../models/boat');
const Destination = require('../models/destination');

LogBookRouter.route('/registerBoat').post(function (req, res) {
    var boatname =  req.body.boat.boatName;

    //boat already there?
    Boat.findOne({'boatName': boatname},function(err,boat){
      if(err){
        console.log('Error in boat Register: ' + err);
      }
      if(boat){
        console.log('Boat already exists');
        return res.send('Boat Already Exists');
      }
      else{
        //create new boat
        let newBoat = new Boat();
        newBoat.boatName = req.body.boat.boatName;
        newBoat.crewName = [];
        newBoat.maxCrew = req.body.boat.maxCrew;
        newBoat.available = true;

        //register new boat
        newBoat.save(function(err){
          if(err){
            console.log('Error while saving Boat' + err);
            throw err;
          }
          console.log('Boat Registration successful');
          return res.send(newBoat);
        })
      }

    })

});

LogBookRouter.route('/registerDestination').post(function (req, res) {
    var destname =  req.body.destination.destination;

    //destination already there?
    Destination.findOne({'destination': destname },function(err,destination){
      if(err){
        console.log('Error in destination Register: ' + err);
      }
      if(destination){
        console.log('Destination already exists');
        return res.send('Destination Already Exists');
      }
      else{
        //create new destination
        let newDestination = new Destination();
        newDestination.destination = req.body.destination.destination;
        newDestination.travelTime = req.body.destination.travelTime;

        //register new destination
        newDestination.save(function(err){
          if(err){
            console.log('Error while saving Destination' + err);
            throw err;
          }
          console.log('Destination Registration successful');
          return res.send(newDestination);
        })
      }

    })

});

LogBookRouter.route('/getAllUsers').get(ensureAuthenticated,function (req, res) {
    User.find(function (err,result){
        res.send(result)
    });
});

LogBookRouter.route('/getBoats').get(ensureAuthenticated,function (req, res) {
    Boat.find(function (err,result){
        res.send(result)
    });
});

LogBookRouter.route('/getDestinations').get(ensureAuthenticated,function (req, res) {
    Destination.find(function (err,result){
        res.send(result)
    });
});

LogBookRouter.route('/getLogbook').get(function(req, res){

    LogBook.find()
    .populate({path: 'destination',model: Destination})
    .exec(function(err,logbooks){
      if(err){ console.log(err); return res.send(err);};
      res.send(logbooks);
    })
});

LogBookRouter.route('/deleteUser/:userId').delete(ensureAuthenticated,function (req, res) {
    const {userId} = req.params;
    User.deleteOne({'_id': userId}, function (err, result) {
        if (err){
            console.log('Error in removing user: '+err);
            return res.send(err);
        }
    });
    res.status(200).send('User Removed Successfully');

});

LogBookRouter.route('/deleteBoat/:boatId').delete(ensureAuthenticated,function (req, res) {
    const {boatId} = req.params;
    Boat.deleteOne({'_id': boatId}, function (err, result) {
        if (err){
            console.log('Error while removing boat: '+ err);
            return res.send(err);
        }
    });
    res.status(200).send('Boat Removed Successfully');
});

LogBookRouter.route('/deleteDestination/:destId').delete(ensureAuthenticated,function (req, res) {
    const {destId} = req.params;
    Destination.deleteOne({'_id': destId}, function (err, result) {
        if (err){
            console.log('Error while removing destination: '+ err);
            return res.send(err);
        }
    });
    res.status(200).send('Destination Removed Successfully');
});


module.exports = LogBookRouter;
