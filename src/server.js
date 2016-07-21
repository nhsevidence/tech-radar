'use strict';

const express = require('express'),
PORT = 1234,
path = require("path"),
app = express(),
jsonQuery = require('json-query'),
fs = require("fs"),
groupBy = require('group-by'),
nunjucks = require("nunjucks");

// Tells express we want to use jade and where we will keep our views
app.set("views", path.join( __dirname, "/views") );
app.set("view engine", "njk");

// Nunjucks view engine
var env = nunjucks.configure(path.join( __dirname, "/views") , {
	autoescape: true,
	noCache: true,
	express: app
});

app.use(express.static(__dirname + '/public'))
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