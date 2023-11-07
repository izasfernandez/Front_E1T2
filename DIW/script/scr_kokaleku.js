window.addEventListener('load', kokalekua_bistaratu());

/**
 * Inbentarioa bistaratzen duen funtzioa
 */
function kokalekua_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Kokaleku_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        kokaleku_get(response);
    });
}


function kokaleku_get(response){
    console.log(document.getElementById("kokaleku_taula"));
    for (let i = 0; i < response["kokList"].length; i++) {
        var tr = document.createElement("tr");
        var td_etiketa = document.createElement("td");
        var td_gela = document.createElement("td");
        var td_hasData = document.createElement("td");
        var td_amData = document.createElement("td");
        td_etiketa.innerHTML = response["kokList"][i]["etiketa"];
        td_gela.innerHTML = response["kokList"][i]["idGela"];
        td_hasData.innerHTML = response["kokList"][i]["hdata"];
        td_amData.innerHTML = response["kokList"][i]["adata"];
        tr.appendChild(td_etiketa);
        tr.appendChild(td_gela);
        tr.appendChild(td_hasData);
        tr.appendChild(td_amData);
        document.getElementById("kok_db").appendChild(tr);
    }
}
    
