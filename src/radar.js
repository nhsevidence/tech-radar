'use strict';

module.exports = function (app, categories) {
  var model = { 
    title : 'NICE Tech Radar',
    categoryList : categories
  };

  var html = "";
  app.render('index', model, function (err, h) {
  	html = h;
  });
  
  return html;
};

