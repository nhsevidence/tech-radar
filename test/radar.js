"use strict";

var assert = require("assert"), // node.js core module
cheerio = require('cheerio'),
path = require('path'),
renderSetup = require('../src/render'),
radar = require("../src/radar");

var renderFn = renderSetup(path.join( __dirname, '../src/views'));

describe('Results', function(){
  describe('Categories', function(){

    it('should show a category with its name as header', function(){

      var data = {
        categories : [
          {
              name : 'Category name goes here'
          }
        ]
      }

     	var html = radar(renderFn, data);

  	  let $ = cheerio.load(html);

      var name = $('.tech-container h4').text().trim();
      assert.equal(name, 'Category name goes here'); 
    });

    it('should show multiple categories as headers', function(){

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

     	var html = radar(renderFn, data);

  	  let $ = cheerio.load(html);

      var count = $('.tech-container h4').length;
      assert.equal(count, 2); 
    });
  });

  describe('Technologies within a category', function() {
    it('should show a technology by name', function(){

      var data = {
        categories : [{
        	values : [
            	{
            		name : "Name goes here"
              } 
            ] 
        }]
      };

     	var html = radar(renderFn, data);

  	   let $ = cheerio.load(html);
      var name = $('.tech-name').html();
      assert.equal(name, 'Name goes here'); 
    })

    it('should show multiple technologies within a category', function(){

      var data = {
        categories : [{
          values : [
              {
                name : "Tech1"
              },
              {
                name : "Tech2"
              }
            ] 
        }]
      };

      var html = radar(renderFn, data);

       let $ = cheerio.load(html);
      var techCount = $('.tech-name').length;
      assert.equal(techCount, 2); 
    })
  });
});
