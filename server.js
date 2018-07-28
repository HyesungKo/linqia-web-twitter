const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const Twitter = require('twitter');
const config = require('./twitterConfig')
var twitter = new Twitter(config)

app.get('/api/tweets', (req, res) => {   
    
    //configure parameters to search tweets using twitter api
    //q: query(hashtag)
    //count: the number of tweets a user wants
    //result_type: 'popular', 'recent', or mixed
    var params = {
        q: `#${req.query.hashtag}`,
        count: req.query.count,
        result_type: req.query.result_type,
    }

    //call twitter api to search tweets with the configured parameters and send data to client
    twitter.get('search/tweets', params, function(err, data, response) {
        if(!err){
            res.send(data)
        } else {
            console.log(err);
        }
    })
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    //Handle React routing, return all requests to React ap
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));