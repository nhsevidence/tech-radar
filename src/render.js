'use strict';

var nunjucks = require("nunjucks");

module.exports = function(templatePath) {
  var env = nunjucks.configure(templatePath, {
    autoescape: true,
    noCache: true
  });

  function renderFn(templateId, model) {
    return env.render(templateId + '.njk', model);
  };

  return renderFn;  
};

