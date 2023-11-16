
window.addEventListener('load', kokalekua_bistaratu());
window.addEventListener('load', artikuluak_karga());

/**
 * Inbentarioa bistaratzen duen funtzioa
 */
function kokalekua_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
    // Eskaera Zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Kokaleku_controller.php',options)
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
    document.getElementById("kok_db").innerHTML = "";
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
 * Artikulu bati lotutako kokapen berri bat eta datu-baseko areto bat gehitzen dituen funtzioa.
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
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Kokaleku_Controller.php',options)
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
 * Gela bat editatzeko formularioaren bistaratzea aktibatzen duen funtzioa, eta aktibo badago, eransteko formularioa desaktibatzen duena.
 * 'gela_info_carga ()' funtzioa ere aipatzen du aretoekin lotutako informazioa kargatzeko.
 */
function edit_gela_activatu() {
    if (!document.getElementById("gela-edit-container").classList.contains("active")) {
        document.getElementById("gela-add-container").classList.toggle("active");
        document.getElementById("gela-edit-container").classList.toggle("active");
gela_info_carga();
    }
}

/**
 * Funtzioak gela jakin bateko informazioa kargatzen du zerbitzariari GET eskaera eginez.
 * IDak identifikatutako gela bateko datuak berreskuratzen ditu, 
 * eta dagozkion eremuak eguneratzen ditu erabiltzaile-interfazean, lortutako informazioarekin.
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
    });
}

/**
 * Funtzioak PUT eskaera bat egiten dio zerbitzariari, dagoen gela bat editatzeko.
 * IDak identifikatutako gela bateko datuak berreskuratzen ditu, 
 * eta dagozkion eremuak eguneratzen ditu erabiltzaile-interfazean, lortutako informazioarekin.
 * Eragiketaren ondoren, uneko orrira birbideratzen du eta alerta bat erakusten du emaitzaren arabera.
 */
function gela_editatu() 
{
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

/**
 * Zerbitzariari DELETE eskaera bat egiteko funtzioa, gela bat ezabatzeko.
 * Ezabatu beharreko aretoaren IDa biltzen du eta DELETE eskaera bat bidaltzen dio aretoen kontrolatzaileari.
 * Eragiketaren ondoren, uneko orrira birbideratzen du eta alerta bat erakusten du emaitzaren arabera.
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
 * Zerbitzariari POST eskaera bat egiten dion funtzioa, gela berri bat gehitzeko.
 * IDaren datuak, izena eta areto berri bati lotutako ekipoa biltzen ditu, 
 * eta POST eskaera bat bidaltzen dio aretoen kontrolatzaileari, informazioa gehitzeko.
 * Eragiketaren ondoren, uneko orrira birbideratzen du eta alerta bat erakusten du emaitzaren arabera.
 */
function gela_gehitu() 
{
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

/**
 * Zerbitzariari POST eskaera egiten dion funtzioa, kokapenekin lotutako datuak iragazteko.
 * Gaiei, hasiera- eta amaiera-datei buruzko kontsulta-datuak biltzen ditu, eta POST eskaera bat bidaltzen dio kokapen-kontrolatzaileari, datu iragaziak lortzeko.
 * Erabiltzailearen interfazea eguneratzen du lortutako emaitzekin.
 */
function filtratu() {
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
        kokaleku_get(response);
    });
}

