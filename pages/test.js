const {faker } = require('@faker-js/faker');
const { Module } = require('module');


const firstName = faker.person.firstName();
const middlename=faker.person.middleName();
const email= faker.internet.email();
const lastName = faker.person.lastName();
const mobileno='98'+faker.string.numeric(8);
const telno='01'+faker.string.numeric(7);
const address=faker.location.city();
const accountno=faker.string.numeric({min:20});
const panno=faker.number.int({min: 100000000, max: 999999999});
const identityno=faker.string.numeric({min:5})+ '/' +'-'+faker.string.numeric({max:100});

module.exports ={
    firstName,
    middlename,
    lastName,
    email,
    mobileno,
    telno,
    address,
    accountno,
    panno, 
    identityno

};




