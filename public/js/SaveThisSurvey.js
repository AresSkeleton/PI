
class pytanie{
    /**
     * Klasa opisująca każde pytanie
     * @param {string} name  - Tytuł pytania z ankiety
     * @param {char} type  - Typ pytania z ankiety
     * @param {Array} options - Dostępne opcje do wyboru z ankiety
     * @param {Array} input - Wartość dodana przez użytkownika
     */
    constructor(name, type, options, input) {
        this.name = name;
        this.type = type;
        this.options = options;
        this.input = input;
      }
}
/**
 * Lista pytań ankiety
 */
let questionListR = []
/**
 * Generowany plik JSOn
 */
let jsonSurvey;
/**
 * Zapisywanie odpowiedzi z pytania jednokrotnego wyboru
 * @param {DOM} handle - Uchwyt obiektu DOM ze strony do wypełniania ankiet
 * @param {integer} numerPytania - Numer aktualnego pytania
 */
function surveyRadio(handle, numerPytania){
    let name;
    let type = "r";
    let options= [];
    let input;
    let sel = 0;

    let nextHandle = handle.childNodes;
    name = nextHandle[3].innerHTML;
    // console.log(name);
    
    // handle = handle.nextElementSibling;
    while(1){
        handle = document.getElementById("Q"+numerPytania+"o"+sel);
        if(handle!= null){
             
            nextHandle = handle.childNodes;
            // console.log(nextHandle[3].innerHTML);
            
            options.push(nextHandle[3].innerHTML);
           
            sel++;

        }else{
            break;
        }
    }
    let temp = new pytanie(name,type,options,"");
    questionListR.push(temp);
   
}
/**
 * Zapisywanie odpowiedzi z pytania wielokrotnego wyboru 
 * @param {DOM} handle - Uchwyt obiektu DOM ze strony do wypełniania ankiet
 * @param {integer} numerPytania - Numer aktualnego pytania
 */
function surveyCheck(handle, numerPytania){
    let name;
    let type = "c";
    let options= [];
    let input=[];
    let sel = 0;

    let nextHandle = handle.childNodes;
    name = nextHandle[3].innerHTML;
    // console.log(name);
    
    // handle = handle.nextElementSibling;
    while(1){
        handle = document.getElementById("Q"+numerPytania+"o"+sel);
        if(handle!= null){
            // console.log(handle);
             
            nextHandle = handle.childNodes;
            // console.log(nextHandle[3].innerHTML);
            
            // if(nextHandle[1].checked){
            //     input.push(sel);
            // }
            options.push(nextHandle[3].innerHTML);
            // sel = sel + 1;
            // handle = handle.nextElementSibling;
            sel++;

        }else{
            break;
        }
    }
    let temp = new pytanie(name,type,options,"");
    questionListR.push(temp);
}

/**
 * Zapisywanie odpowiedzi z pytania otwartego
 * @param {DOM} handle - Uchwyt obiektu DOM ze strony do wypełniania ankiet
 * @param {integer} numerPytania - Numer aktualnego pytania
 */
function surveyText(handle, numerPytania){
    let name;
    let type = "t";
    let options= "";
    let input= "";

    // console.log(handle);

    let nextHandle = handle.childNodes;
    name = nextHandle[3].innerHTML;    
    // console.log(name);

    

    let temp = new pytanie(name,type,options,input);
    questionListR.push(temp);
}




/**
 * Zapisywanie odpowiedzi z ankiety do pliku Json 
 * @yields {JSON}  - Plik Json z zapisaną ankietą 
 */
function writeSurvey(){
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
            
            surveyRadio(handle, numerPytania);
            
        }else if(typ == "Check"){
            
            surveyCheck(handle, numerPytania);
            
        }else if(typ == "Text"){
            
            surveyText(handle, numerPytania);
            
        }
        
        numerPytania=numerPytania+1;
    }

    // console.log(questionListR)

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
    jsonSurvey = JSON.stringify(tablicaPytanDoZapisu);
    // console.log(jsonSurvey);

}