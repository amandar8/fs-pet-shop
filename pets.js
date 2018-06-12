'use strict';

// provides an API for interacting with file system. Require allows us to utilize a library of modules
let fs = require('fs');
// path module handles and transforms file modules
let path = require('path');
// __dirname is the directory name of the current module (/Users/amandarutherfoord/..)
// Path.join joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path.
let petsPath = path.join(__dirname, 'pets.json');

// console.log(typeof(petsPath));

// path.basename returns the last portion of the path
// process.argv returns an array containing the command line arguments
let commands = ["read", "create", "update", "destroy"];
let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

// if the command's index is anything greater than -1
if (commands.indexOf(cmd) > -1) {

} else {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

if (cmd === 'read') {
  // fs.readFile asynchronously reads the entire contents of a file.
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      // stops execution of program
      throw err;
    }
    // turns JSON string into object
    let pets = JSON.parse(data);

    let index = process.argv[3];

    if (!((pets[index] == undefined) || !(index))) {
      console.log(pets[index]);
    } else {
      console.log(pets);
      console.error('Usage: node pets.js read INDEX');
    }
  });

} else if (cmd === 'create') {
  // fs.readFile asynchronously reads the entire contents of a file.
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    // JSON.parse turns the JSON data into a javascript object
    let pets = JSON.parse(data);

    // parseInt turns a string into an integer
    let age = parseInt(process.argv[3]);
    let kind = process.argv[4];
    let name = process.argv[5];
    let pet = {
      age,
      kind,
      name
    };

    if (!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    //adds to the array
    pets.push(pet);

    // converts a Javascript value into a JSON string
    let petsJSON = JSON.stringify(pets);

    // this asynchronously writes data to a file, replacing the file if it already exists
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);

}
// if (cmd === 'update') {
//   fs.readFile(petsPath, 'utf8', function(readErr, data) {
//     if (readErr) {
//       throw readErr;
//     }
//
//     let index = process.argv[3];
//     let age = parseInt(process.argv[4]);
//     let kind = process.argv[5];
//     let name = process.argv[6];
//     let pet = pets[index]
//   });
// }
