/**
 * Egiaztatzen du ea orriak elementu bat duen "INFORMAZIOA" testuak duen "title" ID-arekin.
 * - Orrialdea kargatzean, erabil() eta erabiltzaileak_kargatu() funtzioak exekutatzen ditu.
 */
// const btnezabatu = document.getElementById('ezabatu');
if (document.getElementById("title").innerHTML.match("INFORMAZIOA")) {
    console.log("AA")
    window.addEventListener("load",erabil());
    window.addEventListener("load",erabiltzaileak_kargatu());
}
// Erabiltzailearen informazioa gordetzeko aldagaia.
var usuarioa;
/**
 * Erabiltzailearen informazia hartzen duen eta bistaratzen duen funtzioa.
 * - DOMeko elementuak erabiltzailearen informazioarekin eguneratzen ditu, eta informazioa aldagaian biltzen du
 */
function erabil() {
    let options = {method: "GET", mode: 'cors'};
    // Eskaera zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("e_nan").innerHTML = response["nan"];
        document.getElementById("e_izena").value = response["izena"];
        document.getElementById("e_abizena").value = response["abizena"];
        document.getElementById("e_erabil").value = response["erabiltzailea"];
        document.getElementById("e_rol").innerHTML = response["rola"];
        if (response["rola"] == "A") {
            document.getElementById("ezabatu").hidden = false;
            document.getElementById("e_erabil").disabled = false;
        }else{
            document.getElementById("ezabatu").hidden = true;
            document.getElementById("e_erabil").disabled = true;
        }
        usuarioa = response;
    });
}

// document.getElementById("guardar").addEventListener("click", konprobatu_erroreak());

/**
 * Izenaren aldea beteta dagoela frogatuko duen funtzioa.
 * - Izenaren aldea beteta ez badago mezu bat botako du.
 */
function izena_konprobatu() {
    if (!document.getElementById("e_izena").value) {
        event.preventDefault();
        document.getElementById("e_izena").setCustomValidity("Izena bete behar da");
    }else{
        document.getElementById("e_izena").setCustomValidity("");
    }
    document.getElementById("e_izena").reportValidity();
}
/**
 * Abizenaren aldea beteta dagoela frogatuko duen funtzioa.
 * - Abizenaren aldea beteta ez badago mezu bat botaku du.
 */
function abizena_konprobatu() {
    if (!document.getElementById("e_abizena").value) {
        event.preventDefault();
        document.getElementById("e_abizena").setCustomValidity("Abizena bete behar da");
    }else{
        document.getElementById("e_abizena").setCustomValidity("");
    }
    document.getElementById("e_abizena").reportValidity();
}
/**
 * Erabiltzailearen aldea beteta dagoela frogatuko duen funtzioa.
 * - Erabiltzailea ez dagoela datubasean frogatuko du.
 * - Hauetako bat betetzen ez bada mezu bat botako du.
 */
function erabil_konprobatu() {
    if (!document.getElementById("e_erabil").value) {
        event.preventDefault();
        document.getElementById("e_erabil").setCustomValidity("Erabiltzailea bete behar da");
        document.getElementById("e_erabil").reportValidity();
    }else{
        var erabiltzailea = {"kontsulta":true,"erabil":document.getElementById("e_erabil").value};
        let DataJson = JSON.stringify(erabiltzailea,true);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari 
        fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if (response && usuarioa["erabiltzailea"] != erabiltzailea["erabil"]) {
                document.getElementById("e_erabil").setCustomValidity("Erabiltzailea jadanik existitzen da");
                document.getElementById("e_erabil").reportValidity();
            }else{
                document.getElementById("e_erabil").setCustomValidity("");
                document.getElementById("e_erabil").reportValidity();
            }
        });
    }
}
/**
 * Pazahitza aldatzean, pazahitza zaharraren aldean ondo sartzen dela frogatuko duen funtzioa.
 * - Pasahitza ez bada egokia mezu bat botako du.
 */
function pasahitza_zaharra_konprobatu() {
    if (document.getElementById("e_pasa").value == usuarioa["pasahitza"] || !document.getElementById("e_pasa").value) {
        document.getElementById("e_pasa").setCustomValidity("");
    }else{
        event.preventDefault();
        document.getElementById("e_pasa").setCustomValidity("Pasahitza ez dator bat");
    }
    document.getElementById("e_pasa").reportValidity();
}
/**
 * Pasahitz aldatzean, pazahitz berriaren aldea beteta dagoela eta pazahitz zaharra ondo dagoela frogatzen duen funtzioa.
 * - Alde bat ez bada ondo bete mezu bat botako du.
 */
function pasahitza_berria_konprobatu() {
    if (document.getElementById("e_pasa").value) {
        if (document.getElementById("e_pasa").value == document.getElementById("e_pasa_new").value || !document.getElementById("e_pasa_new").value) {
            event.preventDefault();
            document.getElementById("e_pasa_new").setCustomValidity("Pasahitza berria jarri behar da");
        }else{
            document.getElementById("e_pasa_new").setCustomValidity("");            
        }
    }else{
        if (document.getElementById("e_pasa_new").value) {
            event.preventDefault();
            document.getElementById("e_pasa").setCustomValidity("Pasahitza berria jartzeko pasahitza zaharra jarri behar da");
        }else{
            document.getElementById("e_pasa").setCustomValidity("");            
        }
        document.getElementById("e_pasa").reportValidity();
    }
    document.getElementById("e_pasa_new").reportValidity();
}
/**
 * Fromularioan erroreak frogatuko duen funtzioa.
 * @returns {boolean} - Inprimakian akatsen bat egonez gero true itzuliko du, bestela, false.
 */
function konprobatu_erroreak() {
    nan_konprobatu();
    izena_konprobatu();
    abizena_konprobatu();
    erabil_konp();
    rol_konprob();
    pasa_konprob();
    pasa_errep_konprob();
    const input = document.querySelectorAll(".input");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}
/**
 * Erabiltzailearen informazio eguneratua zerbitzarian gordetzen duen funtzioa.
 * - Formularioan erroreak ez daudela ziurtatzen du, koprobatu_erroreak() funtzioarekin, eta formularioko eremu bakoitzaren baloreak lortzen ditu.
 * - JSON objektu bat sortzen du erabiltzailearen informazioarekin eta JSON kate bihurtzen du.
 * - Egiaztatzen du zerbitzariaren erantzunak errore bat duen, mezu bat botako du, eta orrialdea eguneratzen du.
 */

function gorde() {
    if (!konprobatu_erroreak()) {
        var nan = document.getElementById("e_nan").innerHTML;
        var izena = document.getElementById("e_izena").value;
        var abizena = document.getElementById("e_abizena").value;
        var erabil = document.getElementById("e_erabil").value;
        var pasa = document.getElementById("e_pasa_new").value;
        var jsonData = {"izena":izena,"abizena":abizena,"erabil":erabil,"pasa":pasa, "nan":nan}
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Erabiltzailea eguneratu da")
            }
            window.location.href = window.location.href;
        });
    }
}

/**
 * Programak elementuaren 'active' klasea eta id 'bajak' txandakatzen dituen funtzioa.
 */

function baja() {
    document.getElementById('bajak').classList.toggle('active');
}

/**
 * Erabiltzaileen zerrenda zerbitzaritik kargatu eta erabiltzaile-interfazean goitibeherako zerrenda-elementu batera gehitzen dituen funtzioa.
 */
function erabiltzaileak_kargatu() {
    var jsonData = {"kontsulta":true}
    let DataJson = JSON.stringify(jsonData);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]);
            var option = document.createElement("option");
            option.value = response[i]["nan"];
            option.innerHTML = response[i]["nan"] + " - " + response[i]["izena"] + " "+ response[i]["abizena"];
            document.getElementById("erabiltzaileak").appendChild(option);
        }
    });
}
/**
 * DELETE eskaera baten bidez zerbitzaritik hautatutako erabiltzaile bat ezabatzen duen funtzioa.
 * - 'Erabiltzaileak' id-etik hautatutako balioa lortzen du eta JSON objektu bat sortzen du erabiltzailearen NANarekin.
 * - "home.html" orrira birbideratzen du, eta mezu bat botako du zerbitzariaren erantzunaren arabera.
 */
function erabiltzailea_ezabatu() {
    var nan = document.getElementById("erabiltzaileak").value;
    var jsonData = {"nan":nan};
    let DataJson = JSON.stringify(jsonData);
    let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Zerbitzariari eskaera
    fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        window.location.href = "home.html";
        if (response.match('Error')) {
            alert("Errorea egon da :".response);
        }else{
            alert("Erabiltzailea ezabatu da")
        }
    });
}
/**
 * Formularioan NAN eremua balidatzen duen funtzioa.
 * - NANaren luzera eta formatu zuzena egiaztatzen ditu (8 edo 9 digitu baditu, eta 9 baditu, letrak bat etorri behar du NAN formatuarekin)
 * - Nan_existitu funtzioari deitzen dio zerbitzarian existitzen dela egiaztatzeko.
 */
function nan_konprobatu() {
    nan = document.getElementById("e_nan").value;
    if (nan.length != 9) {
        if (nan.length == 8) {
            if (isNaN(nan)) {
                document.getElementById("e_nan").setCustomValidity("NAN zenbakia formatu okerra du");
                document.getElementById("e_nan").reportValidity();
            }else{
                document.getElementById("e_nan").value += nan_hizkia(parseInt(nan)%23);
                nan_existitu(document.getElementById("e_nan").value);
            }
        }else{
            document.getElementById("e_nan").setCustomValidity("NAN zenbakia formatu okerra du");
            document.getElementById("e_nan").reportValidity();
        }
    }else{
        nan_zenb = nan.slice(0,8);
        nan_letra = nan.slice(8);
        if (isNaN(nan_zenb) || nan_letra.toUpperCase() != nan_hizkia(parseInt(nan_zenb)%23)) {
            document.getElementById("e_nan").setCustomValidity("NAN zenbakia formatu okerra du");
            document.getElementById("e_nan").reportValidity();
        }else{
            nan_existitu(document.getElementById("e_nan").value);
        }
    }
}
/**
 * Zerbitzarian identifikazio-zenbakia (NAN) dagoela egiaztatzen duen funtzioa, POST eskaera baten bidez.
 * - JSON objektu bat sortzen du zerbitzariari egindako eskaeraren informazioarekin.
 * - Programak NAN eremuaren balidazioa eguneratzen du formularioan, zerbitzariaren erantzunaren arabera.
 * @param {string} nan - Zerbitzarian verifikatzeko identifikazio zenbakia.
 */
function nan_existitu(nan) {
    var kontsulta = {"kontsulta":true,"nan":nan};
    let DataJson = JSON.stringify(kontsulta,true);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if (response) {
            document.getElementById("e_nan").setCustomValidity("NAN zenbakia formatu okerra du");
            document.getElementById("e_nan").reportValidity();
        }else{
            document.getElementById("e_nan").setCustomValidity("");
            document.getElementById("e_nan").reportValidity();
        }
    });
}

/**
 * Identifikazio-zenbakia (NAN) 23rekin zatitzean lortutako hondakinari dagokion letra itzultzen duen funtzioa.
 * @param {number} hondarra - Identifikazio-zenbakia (NAN) 23rekin zatitzean lortutako hondarra.
 * @returns {string} - Hondarrari dagokion letra.
 */
function nan_hizkia(hondarra) {
    // Switch bat erabiltzen du hondarrari dagokion letra esleitzeko.
    switch (hondarra) {
        case 0:
            return "T";
        case 1:
            return "R";
        case 2:
            return "W";
        case 3:
            return "A";
        case 4:
            return "G";
        case 5:
            return "M";
        case 6:
            return "Y";
        case 7:
            return "F";
        case 8:
            return "P";
        case 9:
            return "D";
        case 10:
            return "X";
        case 11:
            return "B";
        case 12:
            return "N";
        case 13:
            return "J";
        case 14:
            return "Z";
        case 15:
            return "S";
        case 16:
            return "Q";
        case 17:
            return "V";
        case 18:
            return "H";
        case 19:
            return "L";
        case 20:
            return "C";
        case 21:
            return "K";
        case 22:
            return "E";
    }
}
/**
* Zerbitzarian erabiltzaile-izena dagoela egiaztatzen duen funtzioa, POST eskaera baten bidez.
* - "Erabiltzailea" eremua hutsik dagoen egiaztatzen du.
* - "Erabiltzailea" eremuaren balidazioa eguneratzen du formularioan, zerbitzariaren erantzunaren arabera.
*/
function erabil_konp() {
    if (!document.getElementById("e_erabil").value) {
        event.preventDefault();
        document.getElementById("e_erabil").setCustomValidity("Erabiltzailea bete behar da");
        document.getElementById("e_erabil").reportValidity();
    }else{
        var erabiltzailea = {"kontsulta":true,"erabil":document.getElementById("e_erabil").value};
        let DataJson = JSON.stringify(erabiltzailea,true);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if (response) {
                document.getElementById("e_erabil").setCustomValidity("Erabiltzailea jadanik existitzen da");
                document.getElementById("e_erabil").reportValidity();
            }else{
                document.getElementById("e_erabil").setCustomValidity("");
                document.getElementById("e_erabil").reportValidity();
            }
        });
    }
}
/**
 * Formularioan "Rol-a" eremuaren baliozkotasuna egiaztatzen duen funtzioa.
 * - Rol aldea hutsik dagoela frogatzen du eta mezu bat botatzen du.
 * - Eremuaren luzera 1 den egiaztatuko du, eta errore-mezu bat ezarriko du, hala ez bada.
 * - Eremuaren balioa letra larriz bihurtzen du eta eremuaren baliozkotzea eguneratzen du.
 */
function rol_konprob() {
    if (!document.getElementById("e_rol").value) {
        event.preventDefault();
        document.getElementById("e_rol").setCustomValidity("Rol-a bete behar da");
        document.getElementById("e_rol").reportValidity();
    }else{
        if(document.getElementById("e_rol").value.length != 1){
            document.getElementById("e_rol").setCustomValidity("Rol-a Karektere 1-koa izan behar da");
            document.getElementById("e_rol").reportValidity();
        }else{
            document.getElementById("e_rol").value = document.getElementById("e_rol").value.toUpperCase();
            document.getElementById("e_rol").setCustomValidity("");
            document.getElementById("e_rol").reportValidity();
        }
    }
}
/**
 * Inprimakian "Pasahitza" eremuaren baliozkotasuna egiaztatzen duen funtzioa.
 * - Eremua hutsik dagoen egiaztatuko du eta mezu bat botako du.
 * - Edozein errore-mezu ezabatzen du eta eremuaren balidazioa eguneratzen du eremua hutsik ez badago.
 */
function pasa_konprob() {
    if (!document.getElementById("e_pasa").value) {
        event.preventDefault();
        document.getElementById("e_pasa").setCustomValidity("Pasahitza bete behar da");
        document.getElementById("e_pasa").reportValidity();
    }else{
        document.getElementById("e_pasa").setCustomValidity("");
        document.getElementById("e_pasa").reportValidity();
    }
}
/**
 * Formularioan "Pasahitza Berria" eremuaren baliozkotasuna egiaztatzen duen funtzioa.
 * - Programak eremua hutsik dagoen egiaztatuko du eta mezu bat botako du.
 * - Programak egiaztatuko du "Pasahitza Berria" eremua bat datorren "Pasahitza" eremuarekin, eta errore-mezu bat botako du, bat ez badatoz.
 * - Programak edozein errore-mezu ezabatzen du eta "Pasahitza Berria" eremuaren balidazioa eguneratzen du, eremua hutsik ez badago eta "Pasahitza" eremuarekin bat badator.
 */
function pasa_errep_konprob() {
    if (!document.getElementById("e_pasa_new").value) {
        document.getElementById("e_pasa_new").setCustomValidity("Pasahitza bete behar da");
        document.getElementById("e_pasa_new").reportValidity();
    }else{
        if (document.getElementById("e_pasa").value != document.getElementById("e_pasa_new").value) {
            document.getElementById("e_pasa_new").setCustomValidity("Pasahitzak bat egin behar dute");
            document.getElementById("e_pasa_new").reportValidity();
        } else {
            document.getElementById("e_pasa_new").setCustomValidity("");
            document.getElementById("e_pasa_new").reportValidity();
        }
    }
}
/**
 * Erabiltzaile berri batek formularioan emandako datuekin sortzen duen funtzioa.
 * - Formularioko eremuen balioak lortzen ditu eta datuen baliozkotasuna egiaztatzen du, konprobatu_erroreak funtzioa erabiliz.
 * - Datuak baliozkoak badira, objektu bat sortzen du erabiltzaile berriaren informazioarekin, objektuak JSON formatu bihurtzen du eta zerbitzariari POST eskaera egiten dio.
 * - Zerbitzariaren erantzuna prozesatu ondoren, "home.html" orrira birbideratzen du, eta alerta bat erakusten du, eragiketa arrakastatsua izan den edo errore bat gertatu den adieraziz.
 */
function erabiltzailea_sortu() {
    var nan = document.getElementById("e_nan").value
    var izena = document.getElementById("e_izena").value
    var abizena = document.getElementById("e_abizena").value
    var erabil = document.getElementById("e_erabil").value
    var rol = document.getElementById("e_rol").value
    var pasa = document.getElementById("e_pasa").value
    if(!konprobatu_erroreak()){
        var erabiltzailea = {"kontsulta":false,"nan":nan,"izena":izena,"abizena":abizena,"erabil":erabil,"rol":rol,"pasa":pasa};
        let DataJson = JSON.stringify(erabiltzailea,true);
        console.log(DataJson)
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari 
        fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            window.location.href = "home.html";
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Erabiltzailea gehitu da")
            }
        });
    }
}
