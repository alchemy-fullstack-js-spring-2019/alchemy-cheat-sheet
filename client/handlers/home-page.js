const inquirer = require('inquirer');
const { get } = require('../commons/request');
const request = require('superagent');

//module.exports = async() => { await get('/topics'); };

let notes = [];
const test = async()=>  await get('/topics')
  .then(result=>{console.log(result.body);
    
    notes = result.body;
  });
test();
// let test2;
// async()=>{
//   test2 = await get('/topics');
// };

try {
  // console.log('test2', test2);
  // console.log('tryuign to run test');
  console.log(notes);
  
} catch(error){
  console.log(error);
}

