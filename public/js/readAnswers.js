class pytanie{
    /**
     * Klasa opisująca każde pytanie
     * @param {string} name 
     * @param {char} type 
     * @param {String Array} options 
     * @param {String|integer Array} input 
     */
    constructor(name, type, options, input) {
        this.name = name;
        this.type = type;
        this.options = options;
        this.input = input;
      }
}
let questionListR = []
let jsonAnswers;
/**
 * Liczenie odpowiedzi pytania typu jednokrotnego wyboru
 * 
 * @param {DOM} handle 
 * @param {integer} numerPytania 
 */
function answerRadio(handle, numerPytania){
    let name;
    let type = "r";
    let options= [];
    let input= [];
    let sel = 0;

    let nextHandle = handle.childNodes;
    name = nextHandle[1].innerHTML;
    
    handle = handle.nextElementSibling;
    while(1){
        if(handle.id == "Q"+numerPytania+"o"+sel){
            
            nextHandle = handle.childNodes;
            
            if(nextHandle[1].checked){
                input.push( sel);
            }
            options.push(nextHandle[3].innerHTML);
            sel = sel + 1;
            handle = handle.nextElementSibling;

        }else{
            break;
        }
    }
    let temp = new pytanie(name,type,options,input);
    questionListR.push(temp);
}
/**
 * Liczenie odpowiedzi pytania typu wielokrotnego wyboru
 * 
 * @param {DOM} handle 
 * @param {integer} numerPytania 
 */
function answerCheck(handle, numerPytania){
    let name;
    let type = "c";
    let options= [];
    let input=[];
    let sel = 0;

    let nextHandle = handle.childNodes;
    name = nextHandle[1].innerHTML;
    
    handle = handle.nextElementSibling;
    while(1){
        if(handle.id == "Q"+numerPytania+"o"+sel){
             
            nextHandle = handle.childNodes;
            
            if(nextHandle[1].checked){
                input.push(sel);
            }
            options.push(nextHandle[3].innerHTML);
            sel = sel + 1;
            handle = handle.nextElementSibling;

        }else{
            break;
        }
    }
    let temp = new pytanie(name,type,options,input);
    questionListR.push(temp);
}

/**
 * Liczenie odpowiedzi pytania typu otwartego
 * @param {DOM} handle 
 * @param {integer} numerPytania 
 */
function answerText(handle, numerPytania){
    let name;
    let type = "t";
    let options= "";
    let input = [];

    // console.log(handle);

    let nextHandle = handle.childNodes;
    // console.log(nextHandle[1].innerHTML);
    name = nextHandle[1].innerHTML;
    // console.log(name);
    nextHandle = nextHandle[1].nextElementSibling.childNodes;
    input.push (nextHandle[3].value);
    

    let temp = new pytanie(name,type,options,input);
    questionListR.push(temp);
}




/**
 * Funkcja licząca pytania pobrane z pliku JSON
 * @param {DOM} handle 
 * @param {integer} numerPytania 
 */
function readAnswers(){
    let Title;
    let prefix = "EntireQuestionNo";
    let numerPytania = 1;

    Title = document.getElementById("title").innerHTML;

    while(1){
        handle = document.getElementById(prefix+numerPytania);
        if(handle == null){
            break;
        }        
        let typ  = handle.getAttribute("xd");
        if(typ == "Radio"){
            
            answerRadio(handle, numerPytania);
            
        }else if(typ == "Check"){
            
            answerCheck(handle, numerPytania);
            
        }else if(typ == "Text"){
            
            answerText(handle, numerPytania);
            
        }
        
        numerPytania=numerPytania+1;
    }

    //console.log(questionListR)

    numerPytaniaJson =1;
    let tablicaPytanDoZapisu ={};
    tablicaPytanDoZapisu["title"] = Title;
    for(let i =0 ; i<questionListR.length; i++){
        tablicaPytanDoZapisu[prefix+numerPytaniaJson]=questionListR[i];
        numerPytaniaJson++;
    }
    
    // tablicaPytanDoZapisu["CCV"] = "";
    // TODO: Genereacja CCV

    // console.log(tablicaPytanDoZapisu);
    jsonAnswers = JSON.stringify(tablicaPytanDoZapisu);
    // console.log(jsonAnswers);

}