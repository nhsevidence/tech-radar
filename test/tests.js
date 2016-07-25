var assert = require("assert"); // node.js core module
var cheerio = require('cheerio');
var res = require('./fake_res');
var radar = require("../src/radar");

describe('Tech radar', function(){

  describe('Categories', function(){

    it('should show a category with its name', function(){

      var data = {
        categories : [
          {
              name : 'Category name goes here'
          }
        ]
      }

     	radar(res, data);

  	  let $ = cheerio.load(res.html());

      var name = $('.tech-container h4').text().trim();
      assert.equal(name, 'Category name goes here'); 
    });

    it('should show multiple categories', function(){

      var data = {
        categories : [
            {
              name : 'Category 1'
            },
            {
              name : 'Category 2'
            }
          ]
      }

     	radar(res, data);

  	  let $ = cheerio.load(res.html());

      var count = $('.tech-container h4').length;
      assert.equal(count, 2); 
    });
  });

  describe('Status filters', function(){

    it('should show each status filter with a label', function(){

      var data = {
        statusList : ['Status goes here']
      };

      radar(res, data);

      let $ = cheerio.load(res.html());

      var name = $('label.control').text().trim();
      assert.equal(name, 'Status goes here'); 
    });

    it('should show each status filter with a checkbox', function(){

      var data = {
        statusList : ['Status1']
      };

      radar(res, data);

      let $ = cheerio.load(res.html());

      var checkboxes = $('input[type="checkbox"]').length;
      assert.equal(checkboxes, 1); 
    });

    it('should show multiple status filters', function(){

      var data = {
        statusList : ['Status1', 'Status2']
      };

      radar(res, data);

      let $ = cheerio.load(res.html());

      var checkboxes = $('.control').length;
      assert.equal(checkboxes, 2); 
    });
  });

  describe('Data', function() {
    it('should apply the status name to each technology using id', function(){

      var status = [
        {
          id : 1,
          name : 'Assessing'
        }
      ];

      var categories = [
        {               
          values : [
            { 
                status : 1
            }
          ]
        }
      ];
      

      var viewModel = createViewModel(categories, status);

      assert.equal(viewModel[0].values[0].status = 'Assessing');
    });
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
