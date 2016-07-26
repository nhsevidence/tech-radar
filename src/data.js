'use strict';

var jsonQuery = require('json-query');

module.exports = function (categories, statusList) {

   var mappedCategories = categories.map(function(cat) {
        
        var viewTechList = cat.values.map(function(tech)
        {
            var status = jsonQuery('[id=' + tech.status +']', {
                    data: statusList
                }).value;
            var newTech = tech;
            newTech.status = status.name;
            return newTech;
        });
        cat.values = viewTechList;
        return cat;
     });
     return mappedCategories;

}
