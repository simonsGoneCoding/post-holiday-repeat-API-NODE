// http://numbersapi.com/random/year?json

const fetch = require("node-fetch");

const year = process.argv[2] || Math.floor(Math.random() * 2021);

console.log("searching info for year", year);

fetch(`http://numbersapi.com/${year}/year?json`)
  .then(response => response.json())
  .then(data => console.log(data.text))
  .catch(err => console.log("ERROR!!!", err));
