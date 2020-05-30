// let obj = {
//     name : "nazwa",
//     input : [1]
// }

// console.log(obj);

// let temp = obj["input"];
// temp.push(2,4,56,6);
// obj["input"] = temp;

// console.log(obj);


let obj = {
    name : "nazwa",
    input : [[1]]
}

console.log(obj);

let temp = obj["input"];
temp.push([2,4,56,6]);
temp.push([2]);

obj["input"] = temp;

console.log(obj);
console.log(obj['input'].flat());