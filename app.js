//Ex1
// http://numbersapi.com/random/year?json

// const fetch = require("node-fetch");

// const year = process.argv[2] || Math.floor(Math.random() * 2021);

// console.log("searching info for year", year);

// fetch(`http://numbersapi.com/${year}/year?json`)
//   .then(response => response.json())
//   .then(data => console.log(data.text))
//   .catch(err => console.log("ERROR!!!", err));

// Ex2
// `http://numbersapi.com/${number}/${type}?json`

// const fetch = require("node-fetch");

// const arg = process.argv[2];
// let type = "";
// let number = "";

// if (arg.indexOf("--year") === 0) {
//   console.log("looking for year... ");
//   type = "year";
// } else if (arg.indexOf("--trivia") === 0) {
//   console.log("looking for trivia... ");
//   type = "trivia";
// } else if (arg.indexOf("--math") === 0) {
//   console.log("looking for interesting number... ");
//   type = "math";
// } else {
//   console.log("command not recognized");
//   type = "";
// }

// const equalSign = arg.search("=");

// // console.log(equalSign);
// if (equalSign === -1) {
//   console.log("number not given");
// } else {
//   number = arg.slice(equalSign + 1);
//   if (isNaN(number) || number === "") {
//     console.log("number not given");
//     process.exit();
//   }
// }

// fetch(`http://numbersapi.com/${number}/${type}?json`)
//   .then(res => res.json())
//   .then(data => console.log(data.text))
//   .catch(err => console.log("ERROR!!!", err));

//Ex 3  NBP - API
// `http://api.nbp.pl/api/exchangerates/rates/a/${code}/`

const request = require("request");
const fs = require("fs");

const validCodes = ["USD", "GBP", "EUR"];
const code = process.argv[2];

// console.log(code);

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;

const isValid = validCodes.find(currency => currency === code) ? true : false;
console.log(isValid);
// if (!isValid) process.exit();

request(url, { json: true }, (err, response, body) => {
  if (err) {
    return console.log("ERROR!", err);
  }
  if (response.statusCode !== 200) {
    return console.log("something went wrong... check URL");
  }
  const message = `average currency for ${body.code} on ${body.rates[0].effectiveDate} is: ${body.rates[0].mid} PLN`;

  fs.appendFile("currencies.txt", message + "\n", err => {
    console.log("added sucessfully");
  });

  console.log(message);
});
