'use strict';

const express = require('express'),
PORT = 1234,
app = express(),
jsonQuery = require('json-query'),
fs = require("fs"),
groupBy = require('group-by');

// Tells express we want to use jade and where we will keep our views
app.set('views', __dirname + '/views/')
app.set('view engine', 'jade')

// Our base url 
app.get('/', function (req, res) {
  var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var categories = jsonQuery('categories[]', {
        data: json
    });
  //var statusTypes = jsonQuery('categories[name=Languages and Frameworks]', {
     //   data: obj
    //}).value;
   // var techs = groupBy(query["values"], "status");

  res.render('index',
  { 
    title : 'NICE Tech Radar',
    categories : categories.value,

    }
  )
});


app.listen(PORT);

console.log('Running on http://localhost:' + PORT);