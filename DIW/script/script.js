const btnFiltroa = document.querySelector("#f-botoi");
const btnGehitu = document.querySelector("#g-botoi");
const btnerabiltzailea = document.querySelector(".header_img2");
var error_cont = 0;
var blq_cont = 0;
var control;


/**
 * Filtro botoian klik egitean aktibatzen den funtzioa.
 * Filtroaren menua erakusten edo ezkutatzen du.
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
 * Gehitu botoian klik egitean aktibatzen den funtzioa.
 * Agregatzeko menua erakusten edo ezkutatzen du.
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
 * Erabiltzailearen irudian klikatzean aktibatzen den funzioa.
 * Erabiltzaile menua erakusten edo ezkutatzen du.
 */
if (btnerabiltzailea != null) {
    btnerabiltzailea.addEventListener('click', function activatu() {
        document.getElementById('erabil-menu').classList.toggle('active');
    });
    btnerabiltzailea.addEventListener('load', function admin(){
        let options = {method: "GET", mode: 'cors'};
        // Ibilbidea
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
 * Pasahiza ikustea hala ez egiten duen funtzioa, begiaren irudian klik egitean
 * Pasahitzaren aldean, testutik pasahitzara aldatzen du, eta begiaren irudia aldatzen du, aldi berean.
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
 * Saioa hasteko prozesua egiteko funtzioa.
 * Erabiltzailearen izena eta pasahitza frogatzen du, eta guztia zuzen badago, erabiltzailea hasierako orrrira berbideratuko du.
 * Erabiltzailea ez bada zuzena, "erabiltzailea ez dela existitzen" mezua aterako da, eta pazahitza okerra bada, mezu bat agertuko da ere.
 */
function login() {
    var erabil = document.getElementById("erabil").value;
    var pass = document.getElementById("pasahitza").value;
    let options = {method: "GET", mode: 'cors'};
    // Ibilbidea 
    // fetch('https://www.zerbitzari2.edu/ERRONKA1/WES/Erabiltzaile_controller.php?erabil='+erabil,options)
    fetch('http://localhost/ERRONKA1/WES/Erabiltzaile_controller.php?erabil='+erabil,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        if (response == false) {
            alert("Erabiltzailea ez da existitzen");
            error_cont++;
        }else{
            if (response["pasahitza"] == pass) {
                window.location.href = "pages/Home.html";
            }else{
                alert("Pasahitza okerra");
                error_cont++;
            }
        }
        if(error_cont == 3){
            blq_cont++;
            document.getElementById("temp-cont").innerHTML = document.getElementById("temp-cont").innerHTML * blq_cont;
            alert("Login-a bloquetu da "+document.getElementById("temp-cont").innerHTML+" segunduz");
            document.getElementById("temp-cont").hidden = false;
            bloquear_login();
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

