var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Doctor Anywhere Assignment' });
});

/* GET PatientList page. */
router.get('/patientlist', function(req, res) {
    var db = req.db;
    var collection = db.get('patient');
    collection.find({},{},function(e,docs){
        res.render('patientlist', {
            "patientlist" : docs
        });
    });
});

/* GET New Patient page. */
router.get('/newpatient', function(req, res) {
    res.render('newpatient', { title: 'Add New Patient' });
});

/* POST to Add Patient */
router.post('/addpatient', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var firstName = req.body.firstName;
    var lastname = req.body.lastname;
    var contact = req.body.contact;
    var address = req.body.address;

    // Set our collection
    var collection = db.get('patient');

    // Submit to the DB
    collection.insert({
        "firstName" : firstName,
        "lastname" : lastname,
        "contact" : contact,
        "address" : address
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("patientlist");
        }
    });
});

module.exports = router;
