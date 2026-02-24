var faker = require('faker');
var async = require('async');
var request = require('request');

export default function Faker1 () {
var number_of_signups = 5;
var identities = [];

for (var i=0; i < number_of_signups; i++) {
  identities.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'Admin'
  });
}

function submit(identity, callback) {
  var opts = {
    url: 'http://localhost:5000/api/users/register',
    method: 'POST',
    json: identity
  };
  request(opts, function(err, connection, body) {
    if(err) return callback(err);
    callback();
  });
}

async.each(identities, submit, function(err) {
  if(err) throw err;
  console.log('done...');
});
return null;
}