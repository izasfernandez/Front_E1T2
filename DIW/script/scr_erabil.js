// const btnezabatu = document.getElementById('ezabatu');
if (document.getElementById("title").innerHTML.match("INFORMAZIOA")) {
    console.log("AA")
    window.addEventListener("load",erabil());
    window.addEventListener("load",erabiltzaileak_kargatu());
}

var usuarioa;

function erabil() {
    let options = {method: "GET", mode: 'cors'};
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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
        }else{
            document.getElementById("ezabatu").hidden = true;
        }
        usuarioa = response;
    });
}

// document.getElementById("guardar").addEventListener("click", konprobatu_erroreak());

function izena_konprobatu() {
    if (!document.getElementById("e_izena").value) {
        event.preventDefault();
        document.getElementById("e_izena").setCustomValidity("Izena bete behar da");
    }else{
        document.getElementById("e_izena").setCustomValidity("");
    }
    document.getElementById("e_izena").reportValidity();
}

function abizena_konprobatu() {
    if (!document.getElementById("e_abizena").value) {
        event.preventDefault();
        document.getElementById("e_abizena").setCustomValidity("Abizena bete behar da");
    }else{
        document.getElementById("e_abizena").setCustomValidity("");
    }
    document.getElementById("e_abizena").reportValidity();
}

function erabil_konprobatu() {
    if (!document.getElementById("e_erabil").value) {
        event.preventDefault();
        document.getElementById("e_erabil").setCustomValidity("Erabiltzailea bete behar da");
        document.getElementById("e_erabil").reportValidity();
    }else{
        var erabiltzailea = {"kontsulta":true,"erabil":document.getElementById("e_erabil").value};
        let DataJson = JSON.stringify(erabiltzailea,true);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Ruta 
        fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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

function pasahitza_zaharra_konprobatu() {
    if (document.getElementById("e_pasa").value == usuarioa["pasahitza"] || !document.getElementById("e_pasa").value) {
        document.getElementById("e_pasa").setCustomValidity("");
    }else{
        event.preventDefault();
        document.getElementById("e_pasa").setCustomValidity("Pasahitza ez dator bat");
    }
    document.getElementById("e_pasa").reportValidity();
}

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
        // ruta
        fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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


function baja() {
    document.getElementById('bajak').classList.toggle('active');
}


function erabiltzaileak_kargatu() {
    var jsonData = {"kontsulta":true}
    let DataJson = JSON.stringify(jsonData);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta
    fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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

function erabiltzailea_ezabatu() {
    var nan = document.getElementById("erabiltzaileak").value;
    var jsonData = {"nan":nan};
    let DataJson = JSON.stringify(jsonData);
    let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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

function nan_existitu(nan) {
    var kontsulta = {"kontsulta":true,"nan":nan};
    let DataJson = JSON.stringify(kontsulta,true);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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

function nan_hizkia(hondarra){
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

function erabil_konp() {
    if (!document.getElementById("e_erabil").value) {
        event.preventDefault();
        document.getElementById("e_erabil").setCustomValidity("Erabiltzailea bete behar da");
        document.getElementById("e_erabil").reportValidity();
    }else{
        var erabiltzailea = {"kontsulta":true,"erabil":document.getElementById("e_erabil").value};
        let DataJson = JSON.stringify(erabiltzailea,true);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Ruta 
        fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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
        // Ruta 
        fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
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
