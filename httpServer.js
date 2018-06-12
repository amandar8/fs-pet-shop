'use strict';


let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json'); // __dirname is the directory name of the current module (/Users/amandarutherfoord/..)
// Path.join joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path.

let http = require('http'); //built in module called HTTP which allows node.js to transfer data over the HTTP
let port = process.env.PORT || 8000; // sets the environment variable to port which tells out server where to listen on


let server = http.createServer(function(req, res) { //creates an HTTP server on my computer
  if (req.method === 'GET' && req.url === '/pets') { //if the request method = 'GET' and the request URL is = /pets
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) { //asynchronously reads the contents of the petsPath and returns either an error or the data from pets.json
      if (err) {
        console.error(err.stack);
        res.statusCode = 500; // status response
        res.setHeader('Content-Type', 'text/plain'); //sets a single header HTTP response
        return res.end('Internal Server Error'); //ends the response process
      }

      res.setHeader('Content-Type', 'application/json'); //sends the http json header to the browser to inform it what kind of data to expect
      res.end(petsJSON); //petsJSON = data
    });
  }
  else if (req.method === 'GET' && req.url === '/pets/0') { //if the request method is GET and the request URL is /pets/0
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      let pets = JSON.parse(petsJSON);   // JSON.parse turns the JSON data into a javascript object
      let petJSON = JSON.stringify(pets[0]); // converts a Javascript valueof the data at index 0 into a JSON string

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      let pets = JSON.parse(petsJSON); // JSON.parse turns the JSON data into a javascript object
      let petJSON = JSON.stringify(pets[1]); // converts a Javascript value of the data at index 1 into a JSON string

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, function() { //asynchronous function
  console.log('Listening on port', port);
});

module.exports = server;
