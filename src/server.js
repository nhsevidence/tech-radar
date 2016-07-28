'use strict';

const express = require('express'),
PORT = 1234,
path = require("path"),
app = express(),
jsonQuery = require('json-query'),
fs = require("fs"),
nunjucks = require("nunjucks"),
radar = require("./radar"),
dataMod = require("./data");

const json = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const statusList = json.status;
const mappedCategories = dataMod(json.categories, statusList);
const viewStatusList = statusList.map(function(status) {
     return status.name;
   }); 


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
  var techData = null;
  var category = null;
  if(req.query.desc != null)
  {
      techData = jsonQuery('categories[]values[url=' + req.query.desc + ']', {
        data: json
      });
     category = techData != null ? techData.parents[2].value.name : null;
  }

  var data = {
      categories : mappedCategories,
      statusList : viewStatusList,
      tech : techData != null ? techData.value : null,
      category: category
    }
  radar(res, data);
});

app.get('/technology/:tech', function (req, res) {
        var techData = jsonQuery('categories[]values[url=' + req.params.tech + ']', {
        data: json
    });
    var category = techData.value != null ? techData.parents[2].value.name : null;
      res.render('partials/description',
    { 
      tech : techData != null ? techData.value : null,
      category: category
    });
});


app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

