
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

/**
 * Jasotako erantzunaren kokapen-datuak prozesatzen eta erakusten dituen funtzioa.
 * HTML elementuak sortzen ditu erantzuneko kokapen bakoitzerako, 
 * eta dinamikoki gehitzen ditu orrialdeko kokapen-taulara.
 * @param {Object} response - Eskaeraren erantzuna inbentario-kontrolatzaileari.
 */

function kokaleku_get(response){
    console.log(document.getElementById("kokaleku_taula"));
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

/**
 * Artikuluen eta aretoen datuak kargatzen dituen funtzioa.
 * Bi GET eskaera egiten ditu hainbat ibilbidetara, artikuluei eta aretoei buruzko informazioa lortzeko.
 * Lortutako datuak web orrian goitibeherako zerrendak populatzeko erabiltzen dira.
 */  
function artikuluak_karga() {
    let options = {method: "GET", mode: 'cors'};
    var karga = 1;
    // Eskaera zerbitzariari 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php?kok_art='+karga,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        document.getElementById("artikulu-berria").innerHTML = "";
        document.getElementById("artikulu-aldaketa").innerHTML = "";
        for (let i = 0; i < response["berria"]["inbList"].length; i++) {
            var option = document.createElement("option");
            option.innerHTML = response["berria"]["inbList"][i]["etiketa"] + " - " + response["berria"]["inbList"][i]["idEkipamendu"];
            option.value = response["berria"]["inbList"][i]["etiketa"];
            document.getElementById("artikulu-berria").appendChild(option);
        }
for (let i = 0; i < response["aldaketa"]["inbList"].length; i++) {
            var option = document.createElement("option");
            option.innerHTML = response["aldaketa"]["inbList"][i]["etiketa"] + " - " + response["aldaketa"]["inbList"][i]["idEkipamendu"];
            option.value = response["aldaketa"]["inbList"][i]["etiketa"];
            document.getElementById("artikulu-aldaketa").appendChild(option);
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
/**
 * Funtzio horrek artikulu bati lotutako kokapen berri bat eta datu-baseko areto bat gehitzen ditu.
 * Artikulu berriari, aretoari eta hasiera-datei buruzko sarrera-datuak biltzen ditu.
 * eta kokapenaren amaiera. Gero, egin POST eskaera kokapen-kontrolatzaileari
 * datu-baseari emandako informazioa gehitzeko.
 */

function kok_gehitu() {
    var artikulua = document.getElementById("artikulu-berria").value;
    var gela = document.getElementById("gela").value;
    var hdata = document.getElementById("input-hData").value;
    var adata = document.getElementById("input-aData").value;
    var data = {"art":artikulua,"gela":gela,"hdata":hdata,"adata":adata};
    var DataJson = JSON.stringify(data);
    console.log(DataJson)
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera zerbitzariari
    fetch('http://localhost/ERRONKA1/WES/Kokaleku_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response)
    });
}

/**
 * Gela bateko informazioa editatzeko inprimaki baten bistaratzea aktibatzen edo desaktibatzen du.
 * Gainera, gela_info_carga () funtzioa aipatzen du aretoekin lotutako informazioa kargatzeko.
 */
function gela_edit_open() {
    document.getElementById("gela-editatu").classList.toggle("active");
    document.getElementById("gela-edit-container").classList.toggle("active");
gela_info_carga();
}

/**
 * Formularioaren bistaratzea aktibatzen du, areto berri bat gehitzeko, eta edizio-formularioa desaktibatzen du, aktibo badago.
 */

function add_gela_activatu() {
    if (!document.getElementById("gela-add-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
    }
}

/**
 * Activa la visualización del formulario para editar una sala y desactiva el formulario de agregar si está activo.
 * También invoca la función 'gela_info_carga()' para cargar información relacionada con las salas.
 */
function edit_gela_activatu() {
    if (!document.getElementById("gela-edit-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
gela_info_carga();
    }
}

function gela_info_carga() {
console.log("aaa")
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
