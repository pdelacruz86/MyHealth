/**
 * Created by pdelacruz on 8/19/15.
 */
console.log("example1 browserify.js");

// w/out var it becomes a package scoped variable
nightmare1 = require('nightmare');  // exports a function
http1 = require('http');  // exports a function

// we'll make this one global scoped via api.export() in package.js
nightmare = nightmare1;
http = http1;


if (process.env.NODE_ENV === 'production')
    console.log('it\'s production!!');
else
    console.log('it\'s development...');