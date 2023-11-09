const btnFiltroa = document.querySelector("#f-botoi");
const btnGehitu = document.querySelector("#g-botoi");
const btnerabiltzailea = document.querySelector(".header_img2");
var error_cont = 0;
var blq_cont = 0;
var control;


/**
 * Filtro botoia sakatzean filtroko menua ateratzea
 */ 
if (btnFiltroa != null) {
    btnFiltroa.addEventListener('click', function activatu() {
        document.getElementById('filtroa').classList.toggle('active');
        document.getElementById('filtroa').style.position = "relative";
        if (document.getElementById('gehitu').classList.contains('active')) {
            document.getElementById('gehitu').classList.remove('active');
            document.getElementById('gehitu').style.position = "absolute";
            document.getElementById('f-botoi').classList.toggle('active');
            document.getElementById('g-botoi').classList.toggle('active');
    
        }else{
            document.getElementById('gehitu').classList.remove('active');
            document.getElementById('gehitu').style.position = "absolute";
            document.getElementById('f-botoi').classList.toggle('active');
    
            document.getElementById('menu-mugikorra').classList.toggle('active');
        }
    });
}

/**
 * Gehitu botoia sakatzean gehitzeko menua ateratzea
 */ 
if (btnGehitu != null) {
    btnGehitu.addEventListener('click', function activatu() {
        document.getElementById('gehitu').classList.toggle('active');
        document.getElementById('gehitu').style.position = "relative";
        if (document.getElementById('filtroa').classList.contains('active')) {
            document.getElementById('filtroa').classList.remove('active');
            document.getElementById('filtroa').style.position = "absolute";
            document.getElementById('g-botoi').classList.toggle('active');
            document.getElementById('f-botoi').classList.toggle('active');
    
        }else{
            document.getElementById('filtroa').classList.remove('active');
            document.getElementById('filtroa').style.position = "absolute";
            document.getElementById('g-botoi').classList.toggle('active');
    
            document.getElementById('menu-mugikorra').classList.toggle('active');
        }
    });
}

/**
 * Erabiltzaile ikonoa sakatzean, erabiltzailearen menua ateratzea
 */
if (btnerabiltzailea != null) {
    btnerabiltzailea.addEventListener('click', function activatu() {
        document.getElementById('erabil-menu').classList.toggle('active');
    });
    btnerabiltzailea.addEventListener('load', function admin(){
        let options = {method: "GET", mode: 'cors'};
        // Ruta
        fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if (response["rola"] == "A") {
                document.getElementById("erab_gehitu").hidden = false;
                document.getElementById("hr_erab_gehitu").hidden = false;
            }else{
                document.getElementById("erab_gehitu").hidden = true;
                document.getElementById("hr_erab_gehitu").hidden = true;
            }
        }); 
    });
}

// LOGIN FUNTZIOAK
/**
 * Pasahitza bistaratzeko eta izkutatzeko funtzioa
 */
function ver_nover() {
    var image = document.getElementById("ver");
    var pass = document.getElementById("pasahitza");
    if (image.src.match('ojo_abierto')) {
        image.src = "img/ojo_cerrado.png";
        pass.type = "text";
    }else {
        image.src = "img/ojo_abierto.png";
        pass.type = "password";
    }
}

/**
 * Login funtzioa da, informazioa hartzen du eta erabiltzailea eta pasahitza komprobatzen du
 */
function login() {
    var erabil = document.getElementById("erabil").value;
    var pass = document.getElementById("pasahitza").value;
    let options = {method: "GET", mode: 'cors'};
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php?erabil='+erabil,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if (response === "Error") {
            alert("Erabiltzailea ez da existitzen")
        }else{
            if (response["pasahitza"] == pass) {
                window.location.href = "pages/Home.html";
            }else{
                alert("Pasahitza okerra");
                error_cont++;
                if(error_cont == 3){
                    blq_cont++;
                    document.getElementById("temp-cont").innerHTML = document.getElementById("temp-cont").innerHTML * blq_cont;
                    alert("Login-a bloquetu da "+document.getElementById("temp-cont").innerHTML+" segunduz");
                    document.getElementById("temp-cont").hidden = false;
                    bloquear_login();
                }
            }
        }
    });
}

function bloquear_login()
{
    document.getElementById("log-botoi").disabled = true;
    control =  setInterval(crono,1000);
    crono();
}

function crono() {
    document.getElementById("temp-cont").innerHTML--;
    if (document.getElementById("temp-cont").innerHTML == 0) {
        document.getElementById("log-botoi").disabled = false;
        document.getElementById("temp-cont").hidden = true;
        clearInterval(control);
        document.getElementById("temp-cont").innerHTML = 30;
        error_cont = 0;
    }
}

