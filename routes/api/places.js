const express = require('express');
const router = express.Router();
const config = require('config');
const https = require('https');
const http = require('http');

// GET api/places/search
// A Nearby Search lets you search for places within a specified area.
router.get('/search', async (req, res) => {
    try {
        console.log(req.query.latitude, req.query.longitude, req.query.radius);
        // Initital a GET request.
        https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${req.query.keyword}&type=${req.query.type}&location=${req.query.latitude},${req.query.longitude}&radius=${req.query.radius}&key=${config.get('googleAPIsKey')}`, (response) => {
            let body = "";
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', function () {
                return res.end(body);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// GET api/places/current_location
// Get the current location of the user.
router.get('/current_location', async (req, res) => {
    try {
        http.get('http://ip-api.com/json', (response) => {
            let body = "";
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', function () {
                return res.end(body);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// GET api/places/geocode
// Converting addresses (like a street address) into geographic coordinates
// (like latitude and longitude), which you can use to place markers on a map,
// or position the map.
router.get('/geocode', async (req, res) => {

});

module.exports = router;