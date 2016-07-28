"use strict";

var assert = require("assert"); // node.js core module
var dataMod = require("../src/data");

describe('Tech radar', function(){
    describe('When reading the data', function() {
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
                    id : 1
                },
                {
                    id : 2
                },
                {
                    id : 3
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

            assert.equal(viewModel[0].values[0].name, 'First');
            assert.equal(viewModel[0].values[1].name, 'Second');
            assert.equal(viewModel[0].values[2].name, 'Third');
        });
        
        it('should order the tech alphabetically by name within each status', function(){

            var statusList = [
                {
                    id : 1,
                    name : ''
                }
            ];

            var categories = [
                {               
                    values : [
                        { 
                            name: "B",
                            status : 1
                        },
                        { 
                            name: "A",
                            status : 1
                        }
                    ]
                }
            ];
            

            var viewModel = dataMod(categories, statusList);

            assert.equal(viewModel[0].values[0].name, 'A');
            assert.equal(viewModel[0].values[1].name, 'B');
        });
  });
});
