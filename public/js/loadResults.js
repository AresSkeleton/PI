var jsonWyn = `{
    "title":"Ankieta !",
    "EntireQuestionNo1":{
        "name":"Example textarea",
        "type":"t",
        "input":["odp1","odp2", "odp3"]         
    },
    "EntireQuestionNo2":{
        "name":"Example question checkbox ",
        "type":"c",
        "options":["Opcja do wiel  numer 0" ,"Opcja do wiel  numer 1", "Opcja do wiel  numer 2"],
        "input": [[1], [2,3], [2,3]]
    },
    "EntireQuestionNo3":{
        "name":"Example question ",
        "type":"r",
        "options":["Option 0","Option 1", "Option 3"],
        "input":[1,2,3]
    }
}`

let wyn = JSON.parse(jsonWyn);


function radioWyn(pytango, numereg){
    console.log(pytango);
    let tajtle  = pytango['name'];

    let opszyns = pytango['options'];     // Tablica opcji
    let opcjeLiczba = Object.keys(opszyns).length; // liczba opcji

    let odpowiedzi = pytango['input'].flat();
    let odpowiedziLiczba =  Object.keys(odpowiedzi).length;

    zliczOdpowiedzi = [];

    for(let i = 0; i < opcjeLiczba; i++){
        zliczOdpowiedzi.push(0);
    }

    for(let i = 0; i <  odpowiedziLiczba ; i++){
        zliczOdpowiedzi[odpowiedzi[i]-1] ++;
    }

    console.log(zliczOdpowiedzi);    

    document.getElementById("forma").innerHTML +=`
    <div xd="Radio" id="EntireQuestionNo`+numereg+`">

        <label class="questionLabel"  id="questionLabel`+numereg +`" contenteditable="false" >` + tajtle+  `  </label>            

			<div id="divOfQuestion`+numereg+`">`;
            // <input type="radio" class="custom-control-input" id="radioGroupOption`+  i +`" name="groupOfRadiosFromQuestion`+numereg+`">
	for(var i = 0 ; i< opcjeLiczba; i++){
        document.getElementById("forma").innerHTML +=`
				<div class="custom-control custom-radio" id="Q`+numereg+`o`+ i+`">

                  
				  <label class="custom-control-label" for="radioGroupOption`+ i  +`" contenteditable="false">`+opszyns[i]+ " - " +  (zliczOdpowiedzi[i]/odpowiedziLiczba *100).toFixed(2)   + "% "+`</label> 
				</div>`;
    }
    
    document.getElementById("forma").innerHTML +=`
        </div>
        <br>
    </div>
    `;
}

function checkboxWyn(pytango, numereg){
    console.log(pytango);
    let tajtle  = pytango['name'];

    let opszyns = pytango['options'];     // Tablica opcji
    let opcjeLiczba = Object.keys(opszyns).length; // liczba opcji

    let odpowiedzi = pytango['input'].flat();

    
    console.log(odpowiedzi);
    let odpowiedziLiczba =  Object.keys(odpowiedzi).length;

    zliczOdpowiedzi = [];

    for(let i = 0; i < opcjeLiczba; i++){
        zliczOdpowiedzi.push(0);
    }

    for(let i = 0; i <  odpowiedziLiczba ; i++){
        zliczOdpowiedzi[odpowiedzi[i]-1] ++;
    }


    document.getElementById("forma").innerHTML +=`
    <div xd="Check" id="EntireQuestionNo`+idOfQuestion+`">
    
        <label class="questionLabel" id="questionLabel`+numereg +`" contenteditable="false" >`+tajtle+`</label>

            <div id="divOfQuestion`+numereg+`">`;
            // <input type="checkbox" class="custom-control-input" id="checkboxOption`+i+`"></input>
    for(var i = 0 ; i< opcjeLiczba; i++){    
        document.getElementById("forma").innerHTML +=`
                <div class="custom-control custom-checkbox" id="Q`+numereg+`o`+i+`">
                
					
					<label class="custom-control-label" for="checkboxOption`+ i+`" contenteditable="false">`+opszyns[i]+ " - " +  (zliczOdpowiedzi[i]/odpowiedziLiczba *100).toFixed(2)   + "% "+`</label>
                </div>`
    }         
    document.getElementById("forma").innerHTML +=`			
            </div>		
				
            <br>
    </div>        
    `;


}

// Text wysyłany do pliku ?
function textboxWyn(pytango, numereg){
    console.log(pytango);
    var tajtle  = pytango['name'];

    let odpowiedzi = pytango['input'].flat();   
    
    let odpowiedziLiczba =  Object.keys(odpowiedzi).length;


    document.getElementById("forma").innerHTML += `
    <div xd="Text" id="EntireQuestionNo`+numereg+`">

    
    <label class="questionLabel " id="questionLabel`+numereg +`" contenteditable="false">`+ tajtle+`</label>

        <div id="divOfQuestion`+numereg+`  overflow-auto" class="form-group col-md-8">     <br>  
            <textarea  class="form-control" id="question`+numereg +`" rows="6" readonly style="background-color:#f8f9fa; color:black;">`;

            for(let i = 0;i< odpowiedziLiczba;i++){

                document.getElementById("question"+numereg).innerHTML += odpowiedzi[i] +"\n";

            }   
    
    document.getElementById("forma").innerHTML += ` </textarea>
        </div><br>

    </div>
    `;

}




//Input is parsed Json file
function pokazWyniki(wyn){
    var iloscPytan = Object.keys(wyn).length;
    var prefix = "EntireQuestionNo";

    var titel = `<legend id="title" contenteditable="false" class="col-md-8" style="text-align: center;">`+wyn['title'] +" - Wyniki procentowe" +`</legend>`

    document.getElementById("forma").innerHTML += titel;
    for(var i = 1; i<iloscPytan ; i++){
        // var questionName = obj[prefix+i]["name"];
        var question = wyn[prefix+i];
        if(question['type']=="r"){
            
            radioWyn(question,i);
        }        
        else
        if(question['type']=="c"){
            
            checkboxWyn(question,i);
        }
        else
        if(question['type']=="t"){
            textboxWyn(question,i);
        }

    }


}

