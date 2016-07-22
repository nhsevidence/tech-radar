'use strict';

const express = require('express'),
PORT = 1234,
path = require("path"),
app = express(),
jsonQuery = require('json-query'),
fs = require("fs"),
groupBy = require('group-by'),
nunjucks = require("nunjucks"),
radar = require("./radar");

// Tells express we want to use njk and where we will keep our views
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
  var json = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

  var categories = jsonQuery('categories[]', {
        data: json
    }).value
    
var statusList = [];
for (var i = 0; i < categories.length; i++) {
  for(var y = 0; y < categories[i].values.length; y++) {
    var tech = categories[i].values[y].status;
     if(statusList.indexOf(tech) < 0)
      {
     statusList.push(tech);
      }
  }
 
}


 var data = {
      categories :categories,
      statusList : statusList
    }

  radar(res, data);
 
});


app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

