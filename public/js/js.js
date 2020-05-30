
//########################### Po wciśnięciu "Dodaj ankiete"
var idOfQuestion = 0;     // Przechowuje informacje na temat ilosci pytań   //

var questionDetails = []; // Przechowuje informacje na temat ilosci inputow //
questionDetails.push(null); // zerowe pole nie używane bo tak łatwiej xd
//########################### Po wysłaniu ankiety do bazy
//var SurveyKey = "";  10 znaków - Generacja


//#################################################### Obsługa błędów


/**
 * Wyświetla informacje o błędzie na stronie  
 * @param {string} header 
 * @param {string} info
 */

function errorOverlayShow(header, info){
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("errorTitle").innerHTML = header;
    document.getElementById("errorMsg").innerHTML = info;
}
/**
 * Ukrywa bład
 */
function errorOverlayHide(){
    document.getElementById("overlay").style.display = "none";
    document.getElementById("errorTitle").innerHTML = "Coś poszło nie tak!";
    document.getElementById("errorMsg").innerHTML = "Aby kontynuować kliknij...";
}
/**
 * Powrót na stronę główną
 */
function errorGoToMain(){
    location.replace("/home");
}



/**
 *  Funkcja obsługująca wysyłanie gotowej ankiety do bazy danych
 */
function gSPID(){
    let xd = document.getElementsByClassName("gSPID");
    for(var i = 0; i<xd.length;i++){

        xd[i].style.display = "none";
    }

    document.getElementById("generatedSurveyPasswdInputDiv").style.display="block";

}

/**
 *  Pobranie od użytkownika hasła w celu uzyskania dostępu do listy dostępnych ankiet
 */
function mojeAnkiety(){
    // location.replace("/mojeankiety");
    document.body.innerHTML+=`<div id="overlay" style="display:flex;">
        
            <div id=errorBox >
                <h2 id="getPasswdTitle">Aby przejść dalej podaj hasło: </h2>
                
                <input id="pass" class="form-control" type="password" id="getPasswdPasswd">
                <br>
                <button id="getPasswdSubmit" class="btn btn-light btn-lg btn-block" style="margin-top:4em;"> Przejdź </button>
            </div>
       
	</div>`;


//     location.replace("/home");


}

/**
 * Funkcja pokazuje interfejs do obsługi tworzenia ankiet
 */
function showGenerator(){
    var xd = document.getElementsByClassName("generatorAnkiet");
    for(var i = 0; i<xd.length;i++){

        xd[i].style.display = "inline";
    }
    document.getElementById("generatedSurveySend").style.display = "none"
    document.getElementById("AddSurveyByKey").style.display = "none";
}
/**
 * Wysyłanie wygenerowanej ankiety [Ukrywanie generatora w celu uniemożliwienia interakcji]
 */
function wysylanieWygenerowanejAnkiety(){
    var xd = document.getElementsByClassName("generatorAnkiet");
    for(var i = 0; i<xd.length;i++){

        xd[i].style.display = "none";
    }
    
    document.getElementById("generatedSurveySend").style.display = "block";
}

/**
 * Funkcja usuwa pytanie o podanym numerze z generatora
 * 
 * @param {integer} idPytania 
 */
function deleteQuestion(idPytania){
    questionDetails[idPytania] = 'x';
    var pytanie = document.getElementById("EntireQuestionNo"+idPytania);
    pytanie.remove();

    // TODO: Możliwość wstawienia placeholdera w miejsce usuwanego pytania z przyciskiem cofnij 
}
/**
 * Dodanie pola typu textbox do ankiety
 */
function newTextbox(){   
    idOfQuestion++;
    questionDetails.push(0);

    // <label class="questionLabel" for="questiofn`+idOfQuestion +`" contenteditable="true">Example textarea</label>
    document.getElementById("forma").innerHTML += `
    <div xd="Text" id="EntireQuestionNo`+idOfQuestion+`">

    <button type="button" class="btn btn-danger deleteButton" onclick="deleteQuestion(`+idOfQuestion+`)">USUŃ TO PYTANIE</button>       
    <label class="questionLabel " id="questionLabel`+idOfQuestion +`" contenteditable="true">Example textarea</label>

        <div id="divOfQuestion`+idOfQuestion+`" class="form-group col-md-8">             
               
                
                <br>
                <textarea  class="form-control" id="question`+idOfQuestion +`" rows="1"></textarea>
        </div><br>

    </div>
    `;
}
/**
 * Funkcja dodaje opcje typu radio do wybranego pytania spełniającego warunek typu
 * 
 * @param {integer} idPytania 
 */
function dodajOpcjeRadio(idPytania){
    /**
     *  Aktualna liczba pytań;
     */
    var currentQuestionOptionsCount = questionDetails[idPytania];
    currentQuestionOptionsCount++;

    questionDetails[idPytania] = currentQuestionOptionsCount;

    /**
     * Dopisywanie do konteneru na stronie danych.
     */
    document.getElementById("divOfQuestion"+idPytania).innerHTML+=`
  
        <div class="custom-control custom-radio" id="Q`+idPytania+`o`+questionDetails[idPytania]+`">

            <input type="radio" class="custom-control-input" id="radioGroupOption`+ questionDetails[idPytania] +`" name="groupOfRadiosFromQuestion`+idPytania+`">

		    <label class="custom-control-label" for="XradioGroupOption`+ questionDetails[idPytania] +`" contenteditable="true">Option `+questionDetails[idPytania]+`</label> 
        </div>
      
    `;
    //######################## for w label nie używane  // potrzebne dopiero przy wyświetlaniu wygenerowanej ankiety 

}
/**
 * Usuwanie opcji wyboru z pytania 
 * 
 * @param {integer} idPytania 
 */
function usunOpcjeRadio(idPytania){
    var currentQuestionOptionsCount = questionDetails[idPytania];

    var toDelete = document.getElementById("Q"+idPytania+"o"+currentQuestionOptionsCount);
    toDelete.remove();

    currentQuestionOptionsCount --;
    questionDetails[idPytania] = currentQuestionOptionsCount;
}

/**
 * Dodanie pytania typu jednokrotenego wyboru do generatora
 */
function newRadio(){
    idOfQuestion++;
    questionDetails.push(0);
    // var radioOption = 0;

    // <input type="radio" class="custom-control-input" id="radioGroupToQuestion`+idOfQuestion+`" name="groupOfDefaultRadios">
   
    document.getElementById("forma").innerHTML +=`
    <div xd="Radio" id="EntireQuestionNo`+idOfQuestion+`">

    <button type="button" class="btn btn-danger deleteButton" onclick="deleteQuestion(`+idOfQuestion+`)">USUŃ TO PYTANIE</button>

        <label class="questionLabel"  id="questionLabel`+idOfQuestion +`" contenteditable="true" >Example question  </label>

            <div id=unSelect >
                <label onclick="dodajOpcjeRadio(`+ idOfQuestion+`);">[dodaj opcje]</label>\t
                <label onclick="usunOpcjeRadio(`+ idOfQuestion+`);">[usuń opcje]</label>
            </div>

			<div xdd='elo' id="divOfQuestion`+idOfQuestion+`">
				
				
				<div class="custom-control custom-radio" id="Q`+idOfQuestion+`o`+questionDetails[idOfQuestion]+`">

                  <input type="radio" class="custom-control-input" id="radioGroupOption`+ questionDetails[idOfQuestion] +`" name="groupOfRadiosFromQuestion`+idOfQuestion+`">
				  <label class="custom-control-label" for="XradioGroupOption`+ questionDetails[idOfQuestion] +`" contenteditable="true">Option `+questionDetails[idOfQuestion]+`</label> 
				</div>

				
            </div>
            <br>
    </div>
    `;
        //######################## for w label nie używane  // potrzebne dopiero przy wyświetlaniu wygenerowanej ankiety 
}

/**
 * 
 * @param {integer} idPytania 
 */
function dodajOpcjeCheckbox(idPytania){
    var currentQuestionOptionsCount = questionDetails[idPytania];
    currentQuestionOptionsCount++;
    questionDetails[idPytania] = currentQuestionOptionsCount;
    document.getElementById("divOfQuestion"+idPytania).innerHTML+=`
    <div>
        <div class="custom-control custom-checkbox" id="Q`+idPytania+`o`+questionDetails[idPytania]+`">
                    
            <input type="checkbox" class="custom-control-input" id="checkboxOption`+questionDetails[idPytania] +`">
            <label class="custom-control-label" for="XcheckboxOption`+ questionDetails[idPytania] +`" contenteditable="true">Opcja do wielokrotnego wyboru numer `+questionDetails[idPytania]+`</label>
        </div>
     
    </div>    
    `;
    //######################## for w label nie używane  // potrzebne dopiero przy wyświetlaniu wygenerowanej ankiety 

}



/**
 * Usuwa opcje wyboru z pytania typu checkbox
 * @param {integer} idPytania 
 */
function usunOpcjeCheckbox(idPytania){
    var currentQuestionOptionsCount = questionDetails[idPytania];

    var toDelete = document.getElementById("Q"+idPytania+"o"+currentQuestionOptionsCount);
    toDelete.remove();

    currentQuestionOptionsCount --;
    questionDetails[idPytania] = currentQuestionOptionsCount;
}

/**
 * Dodaje pytanie wielokrotnego wyboru z pola checkbox
 */
function newCheckbox(){
    idOfQuestion++;
    questionDetails.push(0);


    // var checkboxOption = 0;

/* <label onclick="dodajOpcje(`+ checkboxOption +`,`+ idOfQuestion+`);">[dodaj opcje]</label> */
    document.getElementById("forma").innerHTML +=`
    <div xd="Check" id="EntireQuestionNo`+idOfQuestion+`">
    <button type="button" class="btn btn-danger deleteButton" onclick="deleteQuestion(`+idOfQuestion+`)">USUŃ TO PYTANIE</button>
        <label class="questionLabel" id="questionLabel`+idOfQuestion +`" contenteditable="true" >Example question checkbox </label>

        
            <div id=unSelect >
        <label onclick="dodajOpcjeCheckbox(`+ idOfQuestion+`);">[dodaj opcje]</label>
        <label onclick="usunOpcjeCheckbox(`+ idOfQuestion+`);">[usun opcje]</label>
            </div>
            <div id="divOfQuestion`+idOfQuestion+`">
            

                <div class="custom-control custom-checkbox" id="Q`+idOfQuestion+`o`+questionDetails[idOfQuestion]+`">
                
					<input type="checkbox" class="custom-control-input" id="checkboxOption`+questionDetails[idOfQuestion] +`">
					<label class="custom-control-label" for="XcheckboxOption`+ questionDetails[idOfQuestion] +`" contenteditable="true">Opcja do wielokrotnego wyboru numer `+questionDetails[idOfQuestion]+`</label>
                </div>
                
				
            </div>		
				
            <br>
    </div>        
    `;
}



