'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const models = require('../../db/models');
const config = require('config')['News'];


module.exports.getAll = (req, res) => {
  models.User.where({ email: req.user.email }).fetch()
    .then((result) => {
      models.Stats.where({ city: result.attributes.destination }).fetch()
      .then((data) => {
        if (result.attributes.destination === 'san-francisco-bay-area') {
          result.attributes.destination = 'sanfrancisco';
        }
        request.get({
          url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
          qs: {
            'api-key': `${config.APIKey}`,
            'q': result.attributes.destination,
            'sort': 'newest'
          }
        }, function(err, response, body) {
          var body = JSON.parse(body);
          var news = body.response.docs;
          var newsData = {};
          var dataLength = 10;
          var currentIndex = 0;
          var validData = true;
          if ( typeof news === 'undefined' ) {
            res.send({});
          }
          while (news.length > 0 && dataLength > 0 && validData) {
            var newsObj = {};
            newsObj['headline'] = news[currentIndex].headline.main;
            newsObj['url'] = news[currentIndex].web_url;
            newsData[currentIndex] = newsObj;
            dataLength--;
            if (!news[currentIndex + 1]) {
              validData = false;
            }
            currentIndex++;
          }
          res.send(newsData);
        });
      });
    });
};
