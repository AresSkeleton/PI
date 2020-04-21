
//########################### Po wciśnięciu "Dodaj ankiete"
var idOfQuestion = 0;

//########################### Po wysłaniu ankiety do bazy
var SurveyKey = ""; // 10 znaków



function newTextbox(){  
    idOfQuestion++;

    // <label class="questionLabel" for="questiofn`+idOfQuestion +`" contenteditable="true">Example textarea</label>
    document.getElementById("forma").innerHTML += `
    
        <div id="divOfQuestion`+idOfQuestion+`" class="form-group col-md-8">
                
                
                <label class="questionLabel" id="questionLabel`+idOfQuestion +`" contenteditable="true">Example textarea</label><br>
                <textarea  class="form-control" id="question`+idOfQuestion +`" rows="1"></textarea>
        </div><br>
        
    `;
}

function dodajOpcje(id, pytanie){
    // document.getElementById("divOfQuestion"+pytanie).innerHTML +=`
    //     <div class="custom-control custom-radio">
    //         <input type="radio" class="custom-control-input" id="radioGroupOption`+ id++ +`" name="groupOfRadiosFromQuestion`+id+`">
    //         <label class="custom-control-label" for="radioGroupOption`+ (id-1) +`" contenteditable="true">Option 3</label>
    //     </div>    
    // `;

    console.log("Dodawanie niedostępne");
    alert("Dodawanie niedostępne")

}

function newRadio(){
    idOfQuestion++;
    var radioOption = 0;

    // (function(){ radioOption++;
    //     console.log(radioOption);

    // })();



    // <input type="radio" class="custom-control-input" id="radioGroupToQuestion`+idOfQuestion+`" name="groupOfDefaultRadios">
    //<label onclick="dodajOpcje(`+ radioOption +`,`+ idOfQuestion+`);">[dodaj opcje]</label>
    document.getElementById("forma").innerHTML +=`
    <label class="questionLabel"  id="questionLabel`+idOfQuestion +`" contenteditable="true" >Example question  </label>
    
			<div id="divOfQuestion`+idOfQuestion+`">
				
				
				<div class="custom-control custom-radio">

                  <input type="radio" class="custom-control-input" id="radioGroupOption`+ radioOption++ +`" name="groupOfRadiosFromQuestion`+idOfQuestion+`">
				  <label class="custom-control-label" for="XradioGroupOption`+ (radioOption-1) +`" contenteditable="true">Option 1</label>
				</div>

				<!-- Group of default radios - option 2 -->
				<div class="custom-control custom-radio">
				  <input type="radio"  class="custom-control-input" id="radioGroupOption`+ radioOption++ +`" name="groupOfRadiosFromQuestion`+idOfQuestion+`">
				  <label class="custom-control-label" for="XradioGroupOption`+ (radioOption-1) +`" contenteditable="true">Option 2</label>
				</div>

				<!-- Group of default radios - option 3 -->
				<div class="custom-control custom-radio">
				  <input type="radio" class="custom-control-input" id="radioGroupOption`+ radioOption++ +`" name="groupOfRadiosFromQuestion`+idOfQuestion+`">
				  <label class="custom-control-label" for="XradioGroupOption`+ (radioOption-1) +`" contenteditable="true">Option 3</label>
				</div>
            </div>
            <br>
    `;

}

function newCheckbox(){
    idOfQuestion++;
    var checkboxOption = 0;

/* <label onclick="dodajOpcje(`+ checkboxOption +`,`+ idOfQuestion+`);">[dodaj opcje]</label> */
    document.getElementById("forma").innerHTML +=`
    <label class="questionLabel" id="questionLabel`+idOfQuestion +`" contenteditable="true" >Example question checkbox </label>
    


            <div id="divOfQuestion`+idOfQuestion+`">
            
				<div class="custom-control custom-checkbox">
					<input type="checkbox" class="custom-control-input" id="checkboxOption`+ checkboxOption++ +`">
					<label class="custom-control-label" for="XcheckboxOption`+ (checkboxOption-1) +`" contenteditable="true">Opcja do wielokrotnego wyboru numer 1</label>
				</div>
				
				<div class="custom-control custom-checkbox">
					<input type="checkbox" class="custom-control-input"  id="checkboxOption`+ checkboxOption++ +`">
					<label class="custom-control-label" for="XcheckboxOption`+ (checkboxOption-1) +`" contenteditable="true">Opcja do wielokrotnego wyboru numer 2</label>
				</div>
				<div class="custom-control custom-checkbox">
					<input type="checkbox" class="custom-control-input"  id="checkboxOption`+ checkboxOption++ +`">
					<label class="custom-control-label" for="XcheckboxOption`+ (checkboxOption-1) +`" contenteditable="true">Opcja do wielokrotnego wyboru numer 3</label>
				</div>
            </div>		
				
            <br>
    `;
}


function newSelectOne(){

    idOfQuestion++;

    
    document.getElementById("forma").innerHTML += `
    
        <div id="divOfQuestion`+idOfQuestion+`" class="form-group col-md-8">
                
                
                <label class="questionLabel" id="questionLabel`+idOfQuestion +`" contenteditable="true">Example textarea</label>
                <textarea class="form-control" id="question`+idOfQuestion +`" rows="1"></textarea>
        </div>
        
        <div  id="divOfQuestion`+idOfQuestion+`" class="form-group col-md-8">
			
            <label class="questionLabel" id="questionLabel`+idOfQuestion +`" contenteditable="true" >Example select</label>
            <select class="form-control" id="question`+idOfQuestion +`">
                <option contenteditable="true">1</option>
                <option contenteditable="true">2</option>
                <option contenteditable="true">3</option>
                <option contenteditable="true">4</option>
                <option contenteditable="true">5</option>
            </select>
        </div>
    
        `;

}


// function nowaAnkieta(){
// 	$('#main').html(`
// 	<div id=forma>
// 			<!-- Form Name -->
// 			<legend>Placeholder Kreatora Ankiet</legend>
// 			<!-- Text input-->
// 			<div class='form-group'>
// 			  <label class='col-md-6 control-label' for='textinput'>Tytuł</label>  
// 			  <div class='col-md-6'>
// 			  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md'>				
// 			  </div>
// 			</div>			
// 			<!-- Button -->
// 			<div class='form-group'>
// 				<div class='col-md-6'>
// 					<button id='wyslijNowaAnkieta' name='sendIt' class='btn btn-primary'>Send It!</button>
// 				</div>
// 			</div>
// 		</div>
	
// 	`);
// }
// function dodajAnkiete(){
// 	// console.log("dodaj ankiete");	
// 	$('#main').html(`
// 	<div id=forma>
// 			<!-- Form Name -->
// 			<legend>Dodaj Ankietę!</legend>

// 			<!-- Text input-->
// 			<div class='form-group'>
// 			  <label class='col-md-6 control-label' for='textinput'>Klucz do Ankiety</label>  
// 			  <div class='col-md-6'>
// 			  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md'>
				
// 			  </div>
// 			</div>
// 			<!-- Button -->
// 				<div class='form-group'>
		
// 				  <div class='col-md-6'>
// 					<button id='Dolacz' name='Dolacz' class='btn btn-primary'>Dołącz do ankiety!</button>
// 				  </div>
// 				</div>

		
				
				
// 			<div class='form-group'>
// 				  <label class='col-md-6 control-label' for='newOne' onclick='nowaAnkieta()'>Aby stworzyć nową ankietę kliknij tutaj!</label>
				  
// 			</div>	
// 		</div>
// 	`);
// }
// function mojeAnkiety(){
// 	// console.log("moje ankiety");
// 	$('#main').html(`
// 		<div id=listA>
// 				<legend>Twoje Ankiety</legend>
			
// 				<table class='table  table-dark'>
// 				  <thead>
// 					<tr>
// 					  <th scope='col'>#</th>
// 					  <th scope='col'>Nazwa</th>
// 					  <th scope='col'>Klucz</th>
// 					  <th scope='col'>Przejdź</th>
// 					</tr>
// 				  </thead>
// 				  <tbody>
// 					<tr>
// 					  <th scope='row'>1</th>
// 					  <td>Mark</td>
// 					  <td>Otto</td>
// 					  <td><a href='#'>XD</a></td>
// 					</tr>
// 					<tr>
// 					  <th scope='row'>2</th>
// 					  <td>Jacob</td>
// 					  <td>Thornton</td>
// 					  <td><a href='#'>XD</a></td>
// 					</tr>
// 					<tr>
// 					  <th scope='row'>3</th>
// 					  <td>Larry</td>
// 					  <td>theBird</td>
// 					  <td><a href='#'>XD</a></td>
// 					</tr>
// 				  </tbody>
// 				</table>
// 		</div>	
// 	`);
	
	
	
	
// }
// function rejestracja(){
// 	$('#main').html(`
// 	<div id=forma>
		
// 				<fieldset>

// 				<!-- Form Name -->
// 				<legend>Rejestracja</legend>

// 				<!-- Text input-->
// 				<div class='form-group'>
// 				  <label class='col-md-6 control-label' for='textinput'>Login</label>  
// 				  <div class='col-md-6'>
// 				  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md' required=''>
					
// 				  </div>
// 				</div>

// 				<!-- Password input-->
// 				<div class='form-group'>
// 				  <label class='col-md-6 control-label' for='passwordinput'>Hasło</label>
// 				  <div class='col-md-6'>
// 					<input id='passwordinput' name='passwordinput' type='password' placeholder='' class='form-control input-md' required=''>
					
// 				  </div>
// 				</div>

// 				<!-- Password input-->
// 				<div class='form-group'>
// 				  <label class='col-md-6 control-label' for='passwordinput'>Powtórz hasło</label>
// 				  <div class='col-md-6'>
// 					<input id='passwordinput' name='passwordinput' type='password' placeholder='' class='form-control input-md' required=''>
					
// 				  </div>
// 				</div>

// 				<!-- Button -->
// 				<div class='form-group'>
				
// 				  <div class='col-md-6'>
// 					<button id='Register' name='Register' class='btn btn-primary'>Zarejestruj!</button>
// 				  </div>
// 				</div>
				
				
				
// 				</fieldset>
		
// 		</div>
	
// 	`);	
// }
// function zaloguj(){
// 	// console.log("zaloguj");
// 	$('#main').html(`
// 	<div id=forma>
// 			<!-- Form Name -->
// 			<legend>Login</legend>

// 			<!-- Text input-->
// 			<div class='form-group'>
// 			  <label class='col-md-6 control-label' for='textinput'>Login</label>  
// 			  <div class='col-md-6'>
// 			  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md'>
				
// 			  </div>
// 			</div>

// 			<!-- Password input-->
// 			<div class='form-group'>
// 			  <label class='col-md-6 control-label' for='passwordinput'>Hasło</label>
// 			  <div class='col-md-6'>
// 				<input id='passwordinput' name='passwordinput' type='password' placeholder='' class='form-control input-md'>
				
// 			  </div>
// 			</div>
// 			<!-- Button -->
// 				<div class='form-group'>			
// 				  <div class='col-md-6'>
// 					<button id='LogIN' name='Login' class='btn btn-primary'>Zaloguj!</button>
// 				  </div>
// 				</div>
// 			<div class='form-group'>
// 				 <label class='col-md-6 control-label' for='passwordinput' onclick='rejestracja()'>Jeśli nie masz konta kliknij tutaj!</label>
// 			</div>
// 		</div>
// 		`);
// }