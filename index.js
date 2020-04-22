#!/usr/bin/env node

const newID = process.argv[2];
const newName = process.argv[3];
const target = process.argv[4];
const _ = require('lodash');
const fs = require('fs');

if (newID && newID.split('.').length <2) {
    console.log('Please type a valid bundle id e.g. com.solidstategroup.myapp');
    return;
}

const promises = []

if (target == "android" || target == "both") {
    promise.push(require('./src/android')(newID, newName))
}
if (target == "ios" || target == "both") {
    promise.push(require('./src/ios')(newID, newName))
}



Promise.all(promises)
    .then((items) => {

        const ios = items[0];
        const android = items[1];

        _.each(ios, (data, location) => {
            console.log(`Writing ${location}`);
            fs.writeFileSync(location, data);
        });

        _.each(android, (data, location) => {
            console.log(`Writing ${location}`);
            fs.writeFileSync(location, data);
        });

    })
    .catch(e => console.log(e));
