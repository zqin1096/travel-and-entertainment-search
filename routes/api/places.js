const express = require('express');
const router = express.Router();
const config = require('config');
const https = require('https');
const http = require('http');
const axios = require('axios');

// GET api/places/search
// A Nearby Search lets you search for places within a specified area.
router.get('/search', async (req, res) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latitude},${req.query.longitude}&radius=${req.query.radius}&type=${req.query.type}&keyword=${req.query.keyword}&key=${config.get('googleAPIsKey')}`);
        return res.send(response.data);
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
                const json = JSON.parse(body);
                const coordinate = {
                    latitude: json.lat,
                    longitude: json.lon
                };
                return res.send(coordinate);
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
    try {
        https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(req.query.location)}&key=${config.get('googleAPIsKey')}`, (response) => {
            let body = "";
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', function () {
                const json = JSON.parse(body);
                if (json.status !== 'OK') {
                    return res.send(json);
                }
                const coordinate = {
                    latitude: json.results[0].geometry.location.lat,
                    longitude: json.results[0].geometry.location.lng
                };
                return res.send(coordinate);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// GET api/places/additional_results
// Get the results of next page.
router.get('/additional_results/:token', async (req, res) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${req.params.token}&key=${config.get('googleAPIsKey')}`);
        return res.send(response.data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;