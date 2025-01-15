const fs = require("fs");


//sync write.... Blocking Request
// fs.writeFileSync('./text.txt', 'Hey there!, How are you Tushar');

//async write.... Non Blocking Request
// fs.writeFile('./text.txt', 'Hello World Async', (err)=> {});


// sync read....
// const result = fs.readFileSync('./contact.txt', 'utf-8');
// console.log(result);

//async read....
// this doent return anything rather it expects callback 
// function while the sync returns result

// fs.readFile('contact.txt','utf-8', (err, result) => {
//     if(!err){
//         console.log(result);
//     }
//     else{
//         console.log('Err', err);
//     }
// })

//sync append....
// fs.appendFileSync('./text.txt','Hey There!\n');


//async append....
// fs.appendFile('./text.txt',`Time is ${Date.now()}`, (err)=>{})

//sync copy....
// fs.cpSync('./text.txt','./copy.txt');


//async copy....
// fs.cp('./contact.txt','cpy.txt', (err)=>{});



//sync delete....
// fs.unlinkSync('./t1.txt');


//async delete....
// fs.unlink('./t2.txt',(err)=>{})



//sync stat
// console.log(fs.statSync('./contact.txt'));


//async stat
// console.log(fs.statSync('./text.txt', (err)=>{}));


//sync mkdir....
// fs.mkdirSync("my-docs/a/b", {recursive: true})


//async mkdir....
// fs.mkdirSync("my-docess/x/y", {recursive: true}, (err)=>{})