let date1 = new Date(process.argv[2]);

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

let date2 = new Date(
  `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    date < 10 ? `0${date}` : `${date}`
  }`
);

let timeDifferenceInDays =
  (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

console.log("\n");
console.log("           |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|");
console.log("           |                      |");
console.log("           |   Your Age across    |");
console.log("           |   our Solar System   |");
console.log("           |                      |");
console.log("           |______________________|");
console.log("\n");

console.log(
  "Your age on Mercury:   ",
  (timeDifferenceInDays / 87.97).toFixed(2),
  "Mercurian Years"
);
console.log(
  "Your age on Venus:     ",
  (timeDifferenceInDays / 224.7).toFixed(2),
  "Venusian Years"
);
console.log(
  "Your age on Earth:     ",
  (timeDifferenceInDays / 365.26).toFixed(2),
  "Earth Years"
);
console.log(
  "Your age on Mars:      ",
  (timeDifferenceInDays / 686.2).toFixed(2),
  "Martian Years"
);
console.log(
  "Your age on Jupiter:   ",
  (timeDifferenceInDays / 4328.9).toFixed(2),
  "Jovian Years"
);
console.log(
  "Your age on Saturn:    ",
  (timeDifferenceInDays / 10752.9).toFixed(2),
  "Saturnain Years"
);
console.log(
  "Your age on Uranus:    ",
  (timeDifferenceInDays / 30663.65).toFixed(2),
  "Uranian Years"
);
console.log(
  "Your age on Neptune:   ",
  (timeDifferenceInDays / 60148.35).toFixed(2),
  "Neptunian Years"
);
console.log(
  "Your age on Pluto:     ",
  (timeDifferenceInDays / 90735.35).toFixed(2),
  "Plutonian Years"
);
console.log("\n");