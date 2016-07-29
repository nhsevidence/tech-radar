'use strict';
  
var jsonQuery = require('json-query');

function GetTech(techUrl, data)
{
    var techData = jsonQuery('categories[]values[url=' + techUrl + ']', {
        data: data
    });
    var category = techData.value != null ? techData.parents[2].value.name : null;
    var tech = {
      data : techData.value,
      category : category
    }
    return tech;
}

module.exports = function (renderFn, techUrl, data) {
	var tech = GetTech(techUrl, data);

  	return renderFn('partials/description', { 
    	tech :  tech.data,
    	category: tech.category
    });
};