var assert = require("assert"); // node.js core module
var cheerio = require('cheerio');
var res = require('./fake_app');
var radar = require("../src/radar");

describe('Tech radar', function(){

  it('should show a single category including name', function(){

    var categories = [{
    	name : 'Category name goes here'
    }];

   	radar(res, categories);

	  let $ = cheerio.load(res.html());

    var name = $('.tech-container h4').text().trim();
    assert.equal(name, 'Category name goes here'); 
  });

  it('should show multiple categories', function(){

    var categories = [
    	{
    		name : 'Category 1'
    	},
    	{
    		name : 'Category 2'
    	}
    ];

   	radar(res, categories);

	  let $ = cheerio.load(res.html());

    var count = $('.tech-container h4').length;
    assert.equal(count, 2); 
  });


/*
  it('should show the technologies within a category', function(){

    var categories = [{
    	name : 'Name goes here'
    	values : [
        	{
        		name : "Name goes here",
                url : "",
                status : "",
                desc : ""
            } 
        ] 
    }];

   	var html = radar(app, categories);

	let $ = cheerio.load(html);
    var name = $('.tech-container h4').html();
    assert.equal(name, 'Name goes here'); 
  })
  */
});
