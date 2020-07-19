const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');

// GET api/yelp/match
// This endpoint lets you match business data from other sources against
// businesses on Yelp, based on provided business information.
router.get('/match', async (req, res) => {
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/matches?name=${req.query.name}&address1=${req.query.address1}&city=${req.query.city}&state=${req.query.state}&country=${req.query.country}&match_threshold=default&limit=1`,
            {
                headers: {
                    'Authorization': `Bearer ${config.get('yelpAPIKey')}`
                }
            });
        return res.send(response.data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

// GET api/yelp/reviews
// This endpoint returns up to three review excerpts for a given business.
router.get('/reviews', async (req, res) => {
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.query.id}/reviews`,
            {
                headers: {
                    'Authorization': `Bearer ${config.get('yelpAPIKey')}`
                }
            });
        return res.send(response.data);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;