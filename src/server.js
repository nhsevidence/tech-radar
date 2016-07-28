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
  var tech = GetTech(req.query.desc);

  var data = {
      categories : mappedCategories,
      statusList : viewStatusList,
      tech :  tech.data,
      category: tech.category
    }
  radar(res, data);
});

app.get('/technology/:tech', function (req, res) {
      var tech = GetTech(req.params.tech);
      res.render('partials/description',
    { 
      tech :  tech.data,
      category: tech.category
    });
});

function GetTech(tech)
{
    var techData = jsonQuery('categories[]values[url=' + tech + ']', {
        data: json
    });
    var category = techData.value != null ? techData.parents[2].value.name : null;
    var tech = {
      data : techData.value,
      category : category
    }
    return tech;
}


app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

