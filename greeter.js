const DBfunc = require("./dbfuncs.js")

function greet(name) {    
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var now  = new Date();
    var formattedDate = now.toLocaleDateString("en-US", options);
    return `Hello, ${name}! Today is ${formattedDate}`;
}

function useDBdata(customer_id){

    return "loaded: "+DBfunc.getFromDB(customer_id);
}

module.exports = {greet, useDBdata};
