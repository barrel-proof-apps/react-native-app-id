const _ = require('lodash');
const fs = require('fs');


function transpose(newID, newName, target) {
    if (newID && newID.split('.').length <2) {
        console.log('Please type a valid bundle id e.g. com.solidstategroup.myapp');
        return;
    }

    const promises = []

    if (target == "android" || target == "both") {
        promises.push(require('./src/android')(newID, newName))
    }
    if (target == "ios" || target == "both") {
        promises.push(require('./src/ios')(newID, newName))
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
}

module.exports.transpose = transpose