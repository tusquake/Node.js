const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);

// console.log("1");

// //? Blocking Request....

// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);
// console.log("2");

// //? Non Blocking Request....

console.log("1");
fs.readFile("./contact.txt", "utf-8", (err, result) => {
    if(!err){
        console.log(result);
    }
    else{
        console.log("Error", err);
    }
});
console.log("2");


// Default Thread Pool Size = 4
// Max? - 8  core cpu -8
