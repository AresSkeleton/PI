var json = `{
    "title":"Kliknij tutaj aby zmienić tytuł ankiety!",
    "EntireQuestionNo1":{
        "name":"Example textarea",
        "type":"t",
        "options":[],
        "input":""
    },
    "EntireQuestionNo2":{
        "name":"Example question checkbox ",
        "type":"c",
        "options":["Opcja do wielokrotnego wyboru numer 0"],
        "input":""
    },
    "EntireQuestionNo3":{
        "name":"Example question  ",
        "type":"r",
        "options":["Option 0"],
        "input":""
    }
}`


let obj = JSON.parse(json);


function radio(pytango, numereg){
    console.log(pytango);
    var tajtle  = pytango['name'];
    var opszyns = pytango['options'];
    var inputy = Object.keys(opszyns).length;

    document.getElementById("forma").innerHTML +=`
    <div xd="Radio" id="EntireQuestionNo`+numereg+`">

        <label class="questionLabel"  id="questionLabel`+numereg +`" contenteditable="false" >` + tajtle+ `  </label>            

			<div xdd='elo' id="divOfQuestion`+numereg+`">`;
				
	for(var i = 0 ; i< inputy; i++){
        document.getElementById("forma").innerHTML +=`
				<div class="custom-control custom-radio" id="Q`+numereg+`o`+ i+`">

                  <input type="radio" class="custom-control-input" id="radioGroupOption`+  i +`" name="groupOfRadiosFromQuestion`+numereg+`">
				  <label class="custom-control-label" for="radioGroupOption`+ i  +`" contenteditable="false">`+opszyns[i]+`</label> 
				</div>`;
    }
    
  document.getElementById("forma").innerHTML +=`
        </div>
        <br>
    </div>
    `;
}

function checkbox(pytango, numereg){
    console.log(pytango);
    var tajtle  = pytango['name'];
    var opszyns = pytango['options'];
    var inputy = Object.keys(opszyns).length;

    document.getElementById("forma").innerHTML +=`
    <div xd="Check" id="EntireQuestionNo`+idOfQuestion+`">
    
        <label class="questionLabel" id="questionLabel`+numereg +`" contenteditable="false" >`+tajtle+`</label>

            <div id="divOfQuestion`+numereg+`">`;
    for(var i = 0 ; i< inputy; i++){    
        document.getElementById("forma").innerHTML +=`
                <div class="custom-control custom-checkbox" id="Q`+numereg+`o`+i+`">
                
					<input type="checkbox" class="custom-control-input" id="checkboxOption`+i+`">
					<label class="custom-control-label" for="checkboxOption`+ i+`" contenteditable="false">`+opszyns[i]+`</label>
                </div>`
    }         
    document.getElementById("forma").innerHTML +=`			
            </div>		
				
            <br>
    </div>        
    `;


}


function textbox(pytango, numereg){
    console.log(pytango);
    var tajtle  = pytango['name'];


    document.getElementById("forma").innerHTML += `
    <div xd="Text" id="EntireQuestionNo`+numereg+`">

    
    <label class="questionLabel " id="questionLabel`+numereg +`" contenteditable="false">`+ tajtle+`</label>

        <div id="divOfQuestion`+numereg+`" class="form-group col-md-8">             
               
                
                <br>
                <textarea  class="form-control" id="question`+numereg +`" rows="1"></textarea>
        </div><br>

    </div>
    `;

}




//Input is parsed Json file
function doQuestionary(obj){
    var iloscPytan = Object.keys(obj).length;
    var prefix = "EntireQuestionNo";

    var titel = `<legend id="title" contenteditable="false" class="col-md-8" style="text-align: center;">`+obj['title'] +`</legend>`

    document.getElementById("forma").innerHTML += titel;
    for(var i = 1; i<iloscPytan ; i++){
        // var questionName = obj[prefix+i]["name"];
        var question = obj[prefix+i];
        if(question['type']=="r"){
            
            radio(question,i);
        }        
        else
        if(question['type']=="c"){
            
            checkbox(question,i);
        }else
        if(question['type']=="t"){
            textbox(question,i);
        }

    }


}

