"use strict";

var assert = require("assert"); // node.js core module
var dataMod = require("../src/data");

describe('Tech radar', function(){
    describe('Data', function() {
        it('should apply the status name to each technology using id as lookup', function(){

        var statusList = [
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
        

        var viewModel = dataMod(categories, statusList);

        assert.equal(viewModel[0].values[0].status, 'Assessing');
        });


         it('should order the tech by status', function(){

        var statusList = [
            {
            id : 1,
            name : 'Assessing'
            },{
            id : 2,
            name : 'Trialling'
            },
            {
            id : 3,
            name : 'Adopted'
            }
        ];

        var categories = [
            {               
            values : [
                { 
                    name: "Second",
                    status : 2
                },
                 { 
                    name: "Third",
                    status : 3
                },
                 { 
                    name: "First",
                    status : 1
                }
            ]
            }
        ];
        

        var viewModel = dataMod(categories, statusList);

        assert.equal(viewModel[0].values[0].status, 'Assessing');
        assert.equal(viewModel[0].values[1].status, 'Trialling');
        assert.equal(viewModel[0].values[2].status, 'Adopted');
        });
  });
});
