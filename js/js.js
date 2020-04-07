function nowaAnkieta(){
	$('#main').html(`
	<div id=forma>
			<!-- Form Name -->
			<legend>Placeholder Kreatora Ankiet</legend>
			<!-- Text input-->
			<div class='form-group'>
			  <label class='col-md-6 control-label' for='textinput'>Tytuł</label>  
			  <div class='col-md-6'>
			  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md'>				
			  </div>
			</div>			
			<!-- Button -->
			<div class='form-group'>
				<div class='col-md-6'>
					<button id='wyslijNowaAnkieta' name='sendIt' class='btn btn-primary'>Send It!</button>
				</div>
			</div>
		</div>
	
	`);
}
function dodajAnkiete(){
	// console.log("dodaj ankiete");	
	$('#main').html(`
	<div id=forma>
			<!-- Form Name -->
			<legend>Dodaj Ankietę!</legend>

			<!-- Text input-->
			<div class='form-group'>
			  <label class='col-md-6 control-label' for='textinput'>Klucz do Ankiety</label>  
			  <div class='col-md-6'>
			  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md'>
				
			  </div>
			</div>
			<!-- Button -->
				<div class='form-group'>
		
				  <div class='col-md-6'>
					<button id='Dolacz' name='Dolacz' class='btn btn-primary'>Dołącz do ankiety!</button>
				  </div>
				</div>

		
				
				
			<div class='form-group'>
				  <label class='col-md-6 control-label' for='newOne' onclick='nowaAnkieta()'>Aby stworzyć nową ankietę kliknij tutaj!</label>
				  
			</div>	
		</div>
	`);
}
function mojeAnkiety(){
	// console.log("moje ankiety");
	$('#main').html(`
		<div id=listA>
				<legend>Twoje Ankiety</legend>
			
				<table class='table  table-dark'>
				  <thead>
					<tr>
					  <th scope='col'>#</th>
					  <th scope='col'>Nazwa</th>
					  <th scope='col'>Klucz</th>
					  <th scope='col'>Przejdź</th>
					</tr>
				  </thead>
				  <tbody>
					<tr>
					  <th scope='row'>1</th>
					  <td>Mark</td>
					  <td>Otto</td>
					  <td><a href='#'>XD</a></td>
					</tr>
					<tr>
					  <th scope='row'>2</th>
					  <td>Jacob</td>
					  <td>Thornton</td>
					  <td><a href='#'>XD</a></td>
					</tr>
					<tr>
					  <th scope='row'>3</th>
					  <td>Larry</td>
					  <td>theBird</td>
					  <td><a href='#'>XD</a></td>
					</tr>
				  </tbody>
				</table>
		</div>	
	`);
	
	
	
	
}
function rejestracja(){
	$('#main').html(`
	<div id=forma>
		
				<fieldset>

				<!-- Form Name -->
				<legend>Rejestracja</legend>

				<!-- Text input-->
				<div class='form-group'>
				  <label class='col-md-6 control-label' for='textinput'>Login</label>  
				  <div class='col-md-6'>
				  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md' required=''>
					
				  </div>
				</div>

				<!-- Password input-->
				<div class='form-group'>
				  <label class='col-md-6 control-label' for='passwordinput'>Hasło</label>
				  <div class='col-md-6'>
					<input id='passwordinput' name='passwordinput' type='password' placeholder='' class='form-control input-md' required=''>
					
				  </div>
				</div>

				<!-- Password input-->
				<div class='form-group'>
				  <label class='col-md-6 control-label' for='passwordinput'>Powtórz hasło</label>
				  <div class='col-md-6'>
					<input id='passwordinput' name='passwordinput' type='password' placeholder='' class='form-control input-md' required=''>
					
				  </div>
				</div>

				<!-- Button -->
				<div class='form-group'>
				
				  <div class='col-md-6'>
					<button id='Register' name='Register' class='btn btn-primary'>Zarejestruj!</button>
				  </div>
				</div>
				
				
				
				</fieldset>
		
		</div>
	
	`);	
}
function zaloguj(){
	// console.log("zaloguj");
	$('#main').html(`
	<div id=forma>
			<!-- Form Name -->
			<legend>Login</legend>

			<!-- Text input-->
			<div class='form-group'>
			  <label class='col-md-6 control-label' for='textinput'>Login</label>  
			  <div class='col-md-6'>
			  <input id='textinput' name='textinput' type='text' placeholder='' class='form-control input-md'>
				
			  </div>
			</div>

			<!-- Password input-->
			<div class='form-group'>
			  <label class='col-md-6 control-label' for='passwordinput'>Hasło</label>
			  <div class='col-md-6'>
				<input id='passwordinput' name='passwordinput' type='password' placeholder='' class='form-control input-md'>
				
			  </div>
			</div>
			<!-- Button -->
				<div class='form-group'>			
				  <div class='col-md-6'>
					<button id='LogIN' name='Login' class='btn btn-primary'>Zaloguj!</button>
				  </div>
				</div>
			<div class='form-group'>
				 <label class='col-md-6 control-label' for='passwordinput' onclick='rejestracja()'>Jeśli nie masz konta kliknij tutaj!</label>
			</div>
		</div>
		`);
}