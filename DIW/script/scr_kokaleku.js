
window.addEventListener('load', kokalekua_bistaratu());
window.addEventListener('load', artikuluak_karga());
var gela_izena;

/**
 * Inbentarioa bistaratzen duen funtzioa
 */
function kokalekua_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
    // Ruta 
    fetch('https://www.zerbitzari2.edu/WES/Kokaleku_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("kok_db").innerHTML = "";
        kokaleku_get(response,0);
    });
}

/**
 * Kokapen erregistroei taula formatua ematen dizkien funtzioa
 * @param {Object} response - Kokalekuen informazioa gordetzen duen objetua 
 * @param {Int} filtro - Filtroko comboBox-a kargatu behar den edo ez kontroladorea
 */

function kokaleku_get(response,filtro){
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
        if (filtro == 0) {
            var option = document.createElement("option");
            option.innerHTML = response["kokList"][i]["etiketa"] + " - " + response["kokList"][i]["izena"];
            option.value = response["kokList"][i]["etiketa"];
            document.getElementById("artikulu-aldaketa").appendChild(option);
        }
    }
}

/**
 * Artikuluen eta gelen comboBox-a kargatzen duen funtzioa
 */  
function artikuluak_karga() {
    let options = {method: "GET", mode: 'cors'};
    var karga = 1;
    // Eskaera Zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php?kok_art='+karga,options)
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
    fetch('https://www.zerbitzari2.edu/WES/gela_controller.php',options)
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
 * Kokaleku berria txertatzen duen funtzioa zerbitzarian POST eskaeraren bitartez
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
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Kokaleku_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        kokaleku_get(response,1)
    });
}

/**
 * Artikulua kokalekuz aldatzen duen funtzioa, bere azken erregistroari amaieraData jartzen eta erregistro berri bat sartzen
 */
function kok_aldatu() {
    var artikulua = document.getElementById("artikulu-aldaketa").value;
    var gela = document.getElementById("gela").value;
    var data = {"etiketa":artikulua,"gela":gela};
    var DataJson = JSON.stringify(data);
    console.log(DataJson)
    let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('https://www.zerbitzari2.edu/WES/Kokaleku_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        // kokaleku_get(response,1)
        console.log(response)
    });
}

/**
 * Gelaren informazioaren menua aktibatzen eta desaktibatzen duen funtzioa
 */
function gela_edit_open() {
    document.getElementById("gela-editatu").classList.toggle("active");
    document.getElementById("gela-edit-container").classList.toggle("active");
    gela_info_carga();
}

/**
 * Gelaren informazioaren menuan, gela gehitzeko lehioa akktibatzen duena
 */
function add_gela_activatu() {
    if (!document.getElementById("gela-add-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
        document.getElementById("add-gela").classList.toggle("active");
        document.getElementById("edit-gela").classList.toggle("active");
    }
}

/**
 * Gelaren informazioaren menuan, gela editatzeko lehioa akktibatzen duena
 */
function edit_gela_activatu() {
    if (!document.getElementById("gela-edit-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
        document.getElementById("add-gela").classList.toggle("active");
        document.getElementById("edit-gela").classList.toggle("active");
        gela_info_carga();
    }
}

/**
 * Aukeratutako gelaren informazioa kargatzen duen funtzioa GET eskaeren bitartez
 */
function gela_info_carga() {
console.log("aaa")
    var id = document.getElementById("gela-edit").value;
    let options = {method: "GET", mode: 'cors'};
    fetch('https://www.zerbitzari2.edu/WES/gela_controller.php?id_gela='+id,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        document.getElementById("gela-izena-input-edit").value = response["gelList"][0]["izena"];
        document.getElementById("gela-taldea-input-edit").value = response["gelList"][0]["taldea"];
        gela_izena = response["gelList"][0]["izena"];
    });
}

/**
 * Gela eguneratzen duen funtzioa PUT eskaeraren funtzioa
 */
function gela_editatu() 
{
    if (!konprobatu_erroreak_gela_eguneratu()) {
        var id = document.getElementById("gela-edit").value;
        var izena = document.getElementById("gela-izena-input-edit").value;
        var taldea = document.getElementById("gela-taldea-input-edit").value;
        data = {"id":id,"izena":izena,"taldea":taldea};
        DataJson = JSON.stringify(data);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera Zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/gela_controller.php',options)
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
}

/**
 * Zerbitzaritik DELETE eskaeraren bitartez aukeratutako gela ezabatzen duen funtzioa
 */
function gela_ezabatu() 
{
    var id = document.getElementById("gela-edit").value;
    data = {"id":id};
    DataJson = JSON.stringify(data);
    let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/gela_controller.php',options)
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

/**
 * Zerbitzariari POST eskaera bat egiten gela txertatzen duen funtzioa
 */
function gela_gehitu() 
{
    if (!konprobatu_erroreak_gela_txertatu()) {
        var id = document.getElementById("gela-edit").value;
        var izena = document.getElementById("gela-izena").value;
        var taldea = document.getElementById("gela-taldea").value;
        data = {"id":id,"izena":izena,"taldea":taldea};
        DataJson = JSON.stringify(data);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera Zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/gela_controller.php',options)
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
}

/**
 * Kokaleku taula filtratzen duen funtzioa, zerbitzariari POST eskaera eginez
 */
function filtratu_kokalekua() {
    // console.log("aaaa")
    var artikulua = document.getElementById("art-input").value;
    var hData_f = document.getElementById("hData-f").value;
    var hData_t = document.getElementById("hData-t").value;
    var aData_f = document.getElementById("aData-f").value;
    var aData_t = document.getElementById("aData-t").value;
    var data = {"kontsulta":true,"artikulua":artikulua,"hData_f":hData_f,"hData_t":hData_t,"aData_f":aData_f,"aData_t":aData_t};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Kokaleku_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        // console.log(response)
        document.getElementById("kok_db").innerHTML = "";
        kokaleku_get(response,1);
    });
}

/**
 * Funtzio hau gela gehitzean murrizketak betetzen duen edo ez konprobatzen du
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak_gela_txertatu() {
    konprobatu_gela_insert();
    const input = document.querySelectorAll("#gela-izena");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}

/**
 * Funtzio hau gela eguneratzen murrizketak betetzen duen edo ez konprobatzen du
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak_gela_eguneratu() {
    konprobatu_gela();
    const input = document.querySelectorAll("#gela-izena-input-edit");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}

/**
 * Gelaren izena eguneratzean jadanik ez dela existitzen konprobatzen duen funtzioa
 */
function konprobatu_gela() {
    var gela = document.getElementById("gela-izena-input-edit").value;
    var data = {"kontsulta":true,"gela":gela};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta 
    fetch("https://www.zerbitzari2.edu/WES/gela_controller.php", options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if (gela.toUpperCase() != gela_izena.toUpperCase() && response){
            document.getElementById("gela-izena-input-edit").setCustomValidity("Gela jadanik existitzen da");
            document.getElementById("gela-izena-input-edit").reportValidity();
        }else{
            document.getElementById("gela-izena-input-edit").setCustomValidity("");
            document.getElementById("gela-izena-input-edit").reportValidity();
        };
        
    });
}

/**
 * Gela jadanik ez dela existitzen konprobatzen duen funtzioa
 */
function konprobatu_gela_insert() {
    var gela = document.getElementById("gela-izena").value;
    var data = {"kontsulta":true,"gela":gela};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta 
    fetch("https://www.zerbitzari2.edu/WES/gela_controller.php", options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if (response){
            document.getElementById("gela-izena").setCustomValidity("Gela jadanik existitzen da");
            document.getElementById("gela-izena").reportValidity();
        }else{
            document.getElementById("gela-izena").setCustomValidity("");
            document.getElementById("gela-izena").reportValidity();
        };
    });
}

/**
 * Kokalekua gehitzerakoan amaieraData bete bada, hasieraData baino handiagoa ez izatea konprobatzen duen funtzioa
 */
function konprobatu_amaieraData() {
    if (document.getElementById("input-hData").value && document.getElementById("input-hData").value >= document.getElementById("input-aData").value) {
        event.preventDefault();
        document.getElementById("input-aData").setCustomValidity("Amaiera data ezin da izen hasiera data baino lehenago");
    }else{
        document.getElementById("input-aData").setCustomValidity("");
    }
    document.getElementById("input-aData").reportValidity();
}
