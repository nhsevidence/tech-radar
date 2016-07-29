"use strict";

var assert = require("assert"), // node.js core module
cheerio = require('cheerio'),
path = require('path'),
renderSetup = require('../src/render'),
radar = require("../src/radar");

var renderFn = renderSetup(path.join( __dirname, '../src/views'));

describe('Status filters', function(){

  it('should show each status filter with a label', function(){

    var data = {
      statusList : ['Status goes here']
    };

    var html = radar(renderFn, data);

    let $ = cheerio.load(html);

    var name = $('label.control').text().trim();
    console.log(name);
    assert.equal(name, 'Status goes here'); 
  });

  it('should show each status filter with a checkbox', function(){

    var data = {
      statusList : ['Status1']
    };

    var html = radar(renderFn, data);

    let $ = cheerio.load(html);

    var checkboxes = $('input[type="checkbox"]').length;
    assert.equal(checkboxes, 1); 
  });

  it('should show multiple status filters', function(){

    var data = {
      statusList : ['Status1', 'Status2']
    };

    var html = radar(renderFn, data);

    let $ = cheerio.load(html);

    var checkboxes = $('.control').length;
    assert.equal(checkboxes, 2); 
  });
});