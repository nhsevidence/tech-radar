'use strict';

const express = require('express'),
PORT = 1234,
path = require("path"),
app = express(),
jsonQuery = require('json-query'),
fs = require("fs"),
nunjucks = require("nunjucks"),
radar = require("./radar"),
dataMod = require("./data"),
desc = require("./description"),
renderSetup = require("./render");

const json = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const statusList = json.status;
const mappedCategories = dataMod(json.categories, statusList);
const viewStatusList = statusList.map(function(status) {
     return status.name;
   }); 

// Tells express we want to use njk and where we will keep our views
app.set("views", path.join( __dirname, "/views") );
app.set("view engine", "njk");
app.use(express.static(__dirname + '/public'))

// Nunjucks view engine
var templatePath = path.join( __dirname, "/views")
var renderFn = renderSetup(templatePath);

function GetTech(techUrl)
{
    var techData = jsonQuery('categories[]values[url=' + techUrl + ']', {
        data: json
    });
    var category = techData.value != null ? techData.parents[2].value.name : null;
    var tech = {
      data : techData.value,
      category : category
    }
    return tech;
}

// Our base url 
app.get('/', function (req, res) {
  var tech = GetTech(req.query.desc);
  var data = {
      categories : mappedCategories,
      statusList : viewStatusList,
      tech :  tech.data,
      category: tech.category
    };

  var html = radar(renderFn, data);
  res.write(html);
  res.end();
});

app.get('/technology/:tech', function (req, res) {
  var data = {
    categories : mappedCategories
  };

  var html = desc(renderFn, req.params.tech, data);
  res.write(html);
  res.end();
});



app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

