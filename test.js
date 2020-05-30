// let obj = {
//     name : "nazwa",
//     input : [1]
// }

// console.log(obj["input"]);

// let temp = obj["input"];
// temp.push(2,4,56,6);
// obj["input"] = temp;

// console.log(obj);


// let obj = {
//     name : "nazwa",
//     input : [[1]]
// }

// console.log(obj);

// let temp = obj["input"];
// temp.push([2,4,56,6]);
// temp.push([2]);

// obj["input"] = temp;

// console.log(obj);
// console.log(obj['input'].flat());


let objToAppend = {
    title:"Ankieta !",
    EntireQuestionNo1:{
        name:"Example textarea",
        type:"t",
        input:["odp1","odp2", "odp3"]         
    },
    EntireQuestionNo2:{
        name:"Example question checkbox ",
        type:"c",
        options:["Opcja do wiel  numer 0" ,"Opcja do wiel  numer 1", "Opcja do wiel  numer 2"],
        input: [[1], [2,3], [2,3]]
    },
    EntireQuestionNo3:{
        name:"Example question ",
        type:"r",
        options:["Option 0","Option 1", "Option 3"],
        input:[1,2,3]
    }
};

let obj =  {
    title:"Ankieta !",
    EntireQuestionNo1:{
        name:"Example textarea",
        type:"t",
        input:["chuj","chuj", "chuj"]         
    },
    EntireQuestionNo2:{
        name:"Example question checkbox ",
        type:"c",
        options:["Opcja do wiel  numer 0" ,"Opcja do wiel  numer 1", "Opcja do wiel  numer 2"],
        input: [111,222,333]
    },
    EntireQuestionNo3:{
        name:"Example question ",
        type:"r",
        options:["Option 0","Option 1", "Option 3"],
        input:[555]
    }
};

// console.log(Object.keys(objToAppend).length);


for(let i = 1; i < Object.keys(objToAppend).length; i++){
    // console.log(i);
    let question = objToAppend["EntireQuestionNo"+i];
    if(question["type"] == "r"){
        // console.log("radio");
        // console.log(i);
        // console.log("---------------------------");
        let temp = obj["EntireQuestionNo"+i]["input"][0];
        question["input"].push(temp);
       

    }
    if(question["type"] == "c"){
        // console.log("check");
        // console.log(i);
        // console.log("---------------------------");
        let temp = obj["EntireQuestionNo"+i]["input"];
        question["input"].push(temp);
    }
    if(question["type"] == "t"){
        // console.log("text");
        // console.log(i);
        // console.log("---------------------------");
        let temp = obj["EntireQuestionNo"+i]["input"];
        for( let j = 0; j < temp.length; j++){
            question["input"].push(temp[j]);
        }
        //question["input"].push(temp);
    }

     
}
console.log(objToAppend);
console.log(objToAppend["EntireQuestionNo2"]["input"][3]);


let jsonObj = JSON.stringify(objToAppend);
console.log(jsonObj);
