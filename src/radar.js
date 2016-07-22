'use strict';

module.exports = function (res, categories) {
  var model = { 
    title : 'NICE Tech Radar',
    categoryList : categories
  };
  
  res.render('index', model, function (err, html) {    
    res.send(html);
  });
};

