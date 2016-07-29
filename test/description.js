"use strict";

var assert = require("assert"), // node.js core module
cheerio = require('cheerio'),
path = require('path'),
renderSetup = require('../src/render'),
desc = require("../src/description");

var renderFn = renderSetup(path.join( __dirname, '../src/views'));

describe('Description', function(){

  it('given a technology url it should show technology name', function(){
    var techUrl = 'Tech/url';

    var data = {
      categories : [
        {
            values : [
            {
              name : 'Name goes here',
              url : techUrl
            } 
          ] 
        }
      ]
    };

   	var html = desc(renderFn, techUrl, data);
	  let $ = cheerio.load(html);

    var name = $('.tech-name').text().trim();
    assert.equal(name, 'Name goes here'); 
  });

  it('given a technology url it should show a description', function(){
    var techUrl = 'Tech/url';

     var data = {
      categories : [
        {
            values : [
            {
              desc : 'description goes here',
              url : techUrl
            } 
          ] 
        }
      ]
    };

    var html = desc(renderFn, techUrl, data);
    let $ = cheerio.load(html);


    var description = $('.tech-desc').text().trim();
    assert.equal(description, 'description goes here'); 
  })

  it('given a technology url it should show a breadcrumb including category name', function(){
    var techUrl = 'Tech/url';

     var data = {
      categories : [
        {
            name : 'Category name goes here',
            values : [
            {
              url : techUrl,
              status : 'tech status goes here'
            } 
          ] 
        }
      ]
    };

    var html = desc(renderFn, techUrl, data);
    let $ = cheerio.load(html);


    var breadcrumb = $('.tech-breadcrumb').text().trim();
    assert.equal(breadcrumb, 'Category name goes here  tech status goes here'); 
  })

});