window.addEventListener('load', inbentarioa_bistaratu());

/**
 * Inbentarioa bistaratzen duen funtzioa
 */
function inbentarioa_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        inbentario_get(response);
    });
}


function inbentario_get(response){
    console.log(document.getElementById("inbent_taula"));
    for (let i = 0; i < response["inbList"].length; i++) {
        var tr = document.createElement("tr");
        var td_etiketa = document.createElement("td");
        var td_artikulu = document.createElement("td");
        var td_data = document.createElement("td");
        td_etiketa.innerHTML = response["inbList"][i]["etiketa"];
        td_artikulu.innerHTML = response["inbList"][i]["idEkipamendu"];
        td_data.innerHTML = response["inbList"][i]["erosketaData"];
        tr.appendChild(td_etiketa);
        tr.appendChild(td_artikulu);
        tr.appendChild(td_data);
        document.getElementById("inb_db").appendChild(tr);
    }
}
    
