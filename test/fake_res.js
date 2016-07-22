var nunjucks = require("nunjucks");
var path = require("path");


var env = nunjucks.configure(path.join( __dirname, '../src/views'));
var _html = "";

// Mock the node app with the render fucntion to template using nunjucks
module.exports = {
    render: function(template_id, model, callback){
  		html = env.render(template_id + '.njk', model);
  		callback('notused', html);
	},
	send: function(h){
		_html = h
	},
	html: function() {
		return _html;
	}
};