//PC Details using os NodeJS package
const os = require("os");

console.log("\n");
console.log("           |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|");
console.log("           |                      |");
console.log("           |   Know your PC 💻    |");
console.log("           |                      |");
console.log("           |______________________|");

console.log("\n♠️ C̲P̲U̲ ̲D̲e̲t̲a̲i̲l̲s̲");
console.log("   Chip Inside:                   ",os.cpus()[0].model);
console.log("   No. of CPU Cores:              ",os.cpus().length);
console.log("   CPU Speed (in Mhz):            ",os.cpus()[0].speed);
console.log("   CPU Architecture:              ",os.arch());

console.log("\n♦️ S̲t̲o̲r̲a̲g̲e̲ ̲D̲e̲t̲a̲i̲l̲s̲ ");
console.log("   Total system memory (in GBs):   ",os.totalmem()/(1024*1024*1024));
console.log("   Free system memory (in GBs):    ",(os.freemem()/(1024*1024*10)).toFixed(2));


console.log("\n♥️ O̲p̲e̲r̲a̲t̲i̲n̲g̲ ̲S̲y̲s̲t̲e̲m̲ ̲D̲e̲t̲a̲i̲l̲s̲");
console.log("   OS Type & Platform:            ",os.type());
console.log("   OS Release:                    ",os.release());
console.log("   Home Directory:                ",os.homedir());
console.log("   System Uptime (in Hrs):        ",(os.uptime()/3600).toFixed(0));
console.log("\n");