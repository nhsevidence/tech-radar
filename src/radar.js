'use strict';

module.exports = function (res, data) {
  var model = { 
    title : 'NICE Tech Radar',
    categoryList : data.categories,
    statusList: data.statusList,
     tech : data.tech,
     category: data.category
  };
  
  res.render('index', model, function (err, html) {    
    res.send(html);
  });
};

