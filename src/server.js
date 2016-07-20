'use strict';

const express = require('express'),
PORT = 1234,
app = express(),
jsonQuery = require('json-query'),
fs = require("fs");

// Tells express we want to use jade and where we will keep our views
app.set('views', __dirname + '/views/')
app.set('view engine', 'jade')

// Our base url 
app.get('/', function (req, res) {
  var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var categories = jsonQuery('categories[]', {
        data: json
    });

  res.render('index',
  { 
    title : 'NICE Tech Radar',
    categories : categories.value,
    }
  )
});

app.get('/languages-and-frameworks', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    var query = jsonQuery('categories[name=Languages and Frameworks]', {
        data: obj
    }).value;
    var values = query["values"];
  res.render('category',
  { 
    title : 'Languages and Frameworks',
    category : query["name"],
    catslug : query["slugName"],
    json : query["values"]
    }
  )
})

app.get('/platforms-and-infrastructure', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    var query = jsonQuery('categories[name=Platforms and Infrastructure]', {
        data: obj
    }).value;
    var values = query["values"];
  res.render('category',
  { 
    title : 'Platforms and Infrastructure',
    category : query["name"],
    catslug : query["slugName"],
    json : query["values"]
    }
  )
})

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);