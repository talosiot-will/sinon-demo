const assert = require("assert");

const sinon = require("sinon");

const greeter = require("../greeter.js");
const DBfunc = require("../dbfuncs.js");


//reset the sandbox after every test
//this keeps the tests from messing up each other
afterEach(() => {
    sinon.restore();
});

describe("just a silly test", function(){
    it("checks a sum", function(){
        assert.equal(2+2, 4);
    });
});


describe("testing the greeter", function(){
    it("checks the greet function", function(){
        var clock = sinon.useFakeTimers( new Date(2021, 0, 15));
        assert.equal(greeter.greet('nice person'), 'Hello, nice person! Today is Friday, January 15, 2021');
        //shouldnt need to manually restore the clock because we sinon.restore after every test
        //clock.restore();
    });
});


describe("stub a DB call", function(){
    it("replaces the DB call with a stub", function(){
        //before the stub is put in place
        assert.equal(DBfunc.getFromDB("customer"), "DB_customer");

        var getFromDB = sinon.stub(DBfunc, "getFromDB").returns("no db was harmed");

        //after the stub is put in place
        assert.equal(DBfunc.getFromDB("it doesnt matter what I put here"), "no db was harmed");
        //put the function back where you found it
        getFromDB.restore();
        assert.equal(DBfunc.getFromDB("customer"), "DB_customer");

    });
});


describe("stub a DB call for another function", function(){
    it("replaces the DB call with a stub then calls a different function", function(){
        var getFromDB = sinon.stub(DBfunc, "getFromDB").returns("NO DB");
        //notice that stubbing the getFromDB function gives you the new behavior 
        //in other functions that call it
        assert.equal(greeter.useDBdata("customer"), "loaded: NO DB");

        //something sneaky.  This doesnt work if both getFromDB and useDBdata
        //are in the same module
        //https://stackoverflow.com/questions/42135426/how-to-mock-a-function-inside-another-function-which-i-am-testing-using-sinon
        //so if one function depends on another function its a good sign you need to
        //separate them into different modules

    });

});
