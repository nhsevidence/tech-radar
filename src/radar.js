'use strict';

module.exports = function (renderFn, data) {
  var model = { 
    title : 'NICE Tech Radar',
    categoryList : data.categories,
    statusList: data.statusList,
     tech : data.tech,
     category: data.category
  };
  
  return renderFn('index', model);
};

