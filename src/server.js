'use strict';

const express = require('express'),
PORT = 1234,
path = require("path"),
app = express(),
jsonQuery = require('json-query'),
fs = require("fs"),
groupBy = require('group-by'),
nunjucks = require("nunjucks");

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
  var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  var categories = jsonQuery('categories[]', {
        data: json
    }).value;
var statusList = [];
for (var i = 0; i < categories.values.length; i++) {
  addtoStatusList(categories[i]);
}

  res.render('index',
  { 
    title : 'NICE Tech Radar',
    categoryList : categories
    }
  )
});


app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

function addtoStatusList(tech)
{

}

