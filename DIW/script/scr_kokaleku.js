
window.addEventListener('load', kokalekua_bistaratu());
window.addEventListener('load', artikuluak_karga());

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
    for (let i = 0; i < response["kokList"].length; i++) {
        var tr = document.createElement("tr");
        var td_etiketa = document.createElement("td");
        var td_gela = document.createElement("td");
        var td_hasData = document.createElement("td");
        var td_amData = document.createElement("td");
        var td_izena = document.createElement("td");
        td_etiketa.innerHTML = response["kokList"][i]["etiketa"];
        td_izena.innerHTML = response["kokList"][i]["izena"];
        td_gela.innerHTML = response["kokList"][i]["idGela"];
        td_hasData.innerHTML = response["kokList"][i]["hdata"];
        td_amData.innerHTML = response["kokList"][i]["adata"];
        tr.appendChild(td_etiketa);
        tr.appendChild(td_izena);
        tr.appendChild(td_gela);
        tr.appendChild(td_hasData);
        tr.appendChild(td_amData);
        document.getElementById("kok_db").appendChild(tr);
        var option = document.createElement("option");
        option.innerHTML = response["kokList"][i]["etiketa"] + " - " + response["kokList"][i]["izena"];
        option.value = response["kokList"][i]["etiketa"];
        document.getElementById("artikulu-aldaketa").appendChild(option);
    }
}

function artikuluak_karga() {
    let options = {method: "GET", mode: 'cors'};
    var karga = 1;
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php?kok_art='+karga,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        for (let i = 0; i < response["inbList"].length; i++) {
            var option = document.createElement("option");
            option.innerHTML = response["inbList"][i]["etiketa"] + " - " + response["inbList"][i]["idEkipamendu"];
            option.value = response["inbList"][i]["etiketa"];
            document.getElementById("artikulu-berria").appendChild(option);
        }
    });
    fetch('http://localhost/ERRONKA1/WES/gela_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        for (let i = 0; i < response["gelList"].length; i++) {
            var option = document.createElement("option");
            option.innerHTML = response["gelList"][i]["izena"] + " - " + response["gelList"][i]["taldea"];
            option.value = response["gelList"][i]["id"];
            document.getElementById("gela").appendChild(option);
            var option_combx = document.createElement("option");
            option_combx.innerHTML = response["gelList"][i]["izena"] + " - " + response["gelList"][i]["taldea"];
            option_combx.value = response["gelList"][i]["id"];
            document.getElementById("gela-edit").appendChild(option_combx);
        }
    });
}

function kok_gehitu() {
    var artikulua = document.getElementById("artikulu-berria").value;
    var gela = document.getElementById("gela").value;
    var hdata = document.getElementById("input-hData").value;
    var adata = document.getElementById("input-aData").value;
    var data = {"art":artikulua,"gela":gela,"hdata":hdata,"adata":adata};
    var DataJson = JSON.stringify(data);
    console.log(DataJson)
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/Kokaleku_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response)
    });
}

function gela_edit_open() {
    document.getElementById("gela-editatu").classList.toggle("active");
    document.getElementById("gela-edit-container").classList.toggle("active");
}


function add_gela_activatu() {
    if (!document.getElementById("gela-add-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
    }
}

function edit_gela_activatu() {
    if (!document.getElementById("gela-edit-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
    }
}

function gela_info_carga() {
    var id = document.getElementById("gela-edit").value;
    let options = {method: "GET", mode: 'cors'};
    fetch('http://localhost/ERRONKA1/WES/gela_controller.php?id_gela='+id,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        document.getElementById("gela-izena-input-edit").value = response["gelList"][0]["izena"];
        document.getElementById("gela-taldea-input-edit").value = response["gelList"][0]["taldea"];
    });
}

function gela_editatu() 
{
    var id = document.getElementById("gela-edit").value;
    var izena = document.getElementById("gela-izena-input-edit").value;
    var taldea = document.getElementById("gela-taldea-input-edit").value;
    data = {"id":id,"izena":izena,"taldea":taldea};
    DataJson = JSON.stringify(data);
    let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/gela_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        window.location.href = window.location.href;
        if (response.match('Error')) {
            alert("Errorea egon da :".response);
        }else{
            alert("Gela eguneratu da")
        }
    });
}

function gela_ezabatu() 
{
    var id = document.getElementById("gela-edit").value;
    data = {"id":id};
    DataJson = JSON.stringify(data);
    let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/gela_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        window.location.href = window.location.href;
        if (response.match('Error')) {
            alert("Errorea egon da :".response);
        }else{
            alert("Gela ezabatu da")
        }
    });
}

function gela_gehitu() 
{
    var id = document.getElementById("gela-edit").value;
    var izena = document.getElementById("gela-izena").value;
    var taldea = document.getElementById("gela-taldea").value;
    data = {"id":id,"izena":izena,"taldea":taldea};
    DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/gela_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        window.location.href = window.location.href;
        if (response.match('Error')) {
            alert("Errorea egon da :".response);
        }else{
            alert("Gela gehitu da")
        }
    });
}
