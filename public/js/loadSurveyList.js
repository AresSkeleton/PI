a = ["xd"];
b = [[1,"Name"],[2,"Name2"],[3,"Name3"]];

/**
 * Funkcja wypisująca dostępne ankiety do wypełnienia
 * @param {Array} a - Tabela z danymi ankiet pobranymi z bazy danych
 */
function tabelaAnkietDoWypelnienia(a){
    let handle = document.getElementById("wypelnianeAnkiety");

    if(a[0] == "xd"){
        //Pusta tabela
        handle.innerHTML = "<h5> Dodaj ankiety aby je wypełnić </h5>";
    }else{  
        let x;     
        for(let i = 0 ; i < a.length ; i++){
            x = a[i];
            let row = handle.insertRow();
            row.insertCell().innerHTML = (i+1);
            for(let j=0; j < x.length; j++){
                let cell = row.insertCell();
                cell.innerHTML  = x[j];
            }
            //linkowanie do zaladujAnkiete.ejs
            row.insertCell().innerHTML = "<a href='?wypelnij="+x[0]+"'>"+" >> "+"</a>";
            row.insertCell().innerHTML = "<a href='?usun="+x[0]+"'>"+" Usuń "+"</a>";
            
        }
    }
}

/**
 * Funkcja wypisująca dostępne wyniki ankiet, które zostały dodane przez użytkownika
 * @param {Array} a - Tabela z danymi ankiet pobranymi z bazy danych
 */
function tabelaWynikowAnkiet(a){

    let handle = document.getElementById("mojeWyniki");

    if(a[0] == "xd"){
        //Pusta tabela
        handle.innerHTML = "<h5> Stwórz ankietę aby zobaczyć wyniki </h5>";
    }else{  
        let x;     
        for(let i = 0 ; i < a.length ; i++){
            x = a[i];
            let row = handle.insertRow();
            row.insertCell().innerHTML = (i+1);
            
            for(let j=0; j < x.length; j++){
                let cell = row.insertCell();
                cell.innerHTML  = x[j];
            }
            //linkowanie do wynikiAnkiety.ejs
            row.insertCell().innerHTML = "<a href='?wyniki="+x[0]+"'>"+" >> "+"</a>";
            row.insertCell().innerHTML = "<a href='?usun="+x[0]+"'>"+" Usuń "+"</a>";
        }
    }
}