// console.log("Hello there");


// const marks = [40, 50, 80, 10, 70];

// console.log(Math.max(...marks));

// const num = +process.argv[2];
// function double(num) {
//     return num * 2;
// }
// console.log("The double is: ", double(num));


// const num1 = +process.argv[2];
// const num2 = +process.argv[3];
// function sum(num1, num2) {
//     return num1 +  num2;
// }
// console.log("The sum is: ", sum(num1, num2));

const fs = require("fs");


// fs.appendFile('./nice.txt', "\nGood afternoon as well!!", 'utf8', (err, data) => {
// })


fs.readFile('./nice.txt','utf8' , (err, data) => {
    console.log(data);
})

// fs.copyFile('./nice.txt', './good.txt', 0, (err, date) => {
//     console.log(err);
// })

// fs.rename('./good.txt', './awesome.txt', (err, data) => {
//     console.log("file renamed");
// })

// fs.readFile('./good.txt','utf8' , (err, data) => {
//     console.log(data);
// })

// fs.writeFile('./video.mp4')



