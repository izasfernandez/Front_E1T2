const btnFiltroa = document.querySelector("#f-botoi");
const btnGehitu = document.querySelector("#g-botoi");
const btnerabiltzailea = document.querySelector(".header_img2");
const aldatu = document.querySelector("#a-botoi");
const berria = document.querySelector("#b-botoi");
var error_cont = 0;
var blq_cont = 0;
var control;



/**
 * Filtro botoian klik egitean filtro menua erakusten edo ezkutatzen du.
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
            document.getElementById('a-botoi').hidden = true;
            document.getElementById('b-botoi').hidden = true;
        }else{
            document.getElementById('gehitu').classList.remove('active');
            document.getElementById('gehitu').style.position = "absolute";
            document.getElementById('f-botoi').classList.toggle('active');
    
            document.getElementById('menu-mugikorra').classList.toggle('active');
        }
    });
}


/**
 * Gehitu botoian klik txertatzeko menua erakusten edo ezkutatzen du.
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
            document.getElementById('a-botoi').hidden = false;
            document.getElementById('b-botoi').hidden = false;
        }else{
            document.getElementById('filtroa').classList.remove('active');
            document.getElementById('filtroa').style.position = "absolute";
            document.getElementById('g-botoi').classList.toggle('active');
    
            document.getElementById('menu-mugikorra').classList.toggle('active');
        }
    });
}

/**
 * Berria botoian klik egitean, txertatzeko menua erakuzten du
 */
if (berria != null) {
    berria.addEventListener('click', function activatu2() {
        if (!document.getElementById('b-botoi').classList.contains('active')) {
            document.getElementById('kok-aldaketa').classList.toggle('active');
            document.getElementById('kok-berria').classList.toggle('active');
            document.getElementById('b-botoi').classList.toggle('active');
            document.getElementById('a-botoi').classList.toggle('active');
        }
    });
}

/**
 * Aldatu botoian klik egitean, aldatzeko menua erakuzten du
 */
if (aldatu != null) {
    aldatu.addEventListener('click', function activatu1() {
        if (!document.getElementById('a-botoi').classList.contains('active')) {
            document.getElementById('kok-aldaketa').classList.toggle('active');
            document.getElementById('kok-berria').classList.toggle('active');
            document.getElementById('b-botoi').classList.toggle('active');
            document.getElementById('a-botoi').classList.toggle('active');
        }
    });
}


/**
 * Erabiltzailea klik egitean ateratzen den menua karagatzen du, eta menua izkutatzeko eta erakusteko funtzionalitatea ematen dio
 */
if (btnerabiltzailea != null) {
    btnerabiltzailea.addEventListener('click', function activatu() {
        document.getElementById('erabil-menu').classList.toggle('active');
    });
    btnerabiltzailea.addEventListener('load', admin_konprobatu());
}

/**
 * GET dei bat egiten zaio zerbitzariari, cookieetan saioa hasteko erabili den nan-a bidaliz, eta bere rol-aren arabera, 
 * erabiltzailearen menua kargatzen du
 */
function admin_konprobatu() {
    let options = {method: "GET", mode: 'cors'};
    // console.log(document.cookie);
    // Ibilbidea
    fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php?nan='+document.cookie,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(response);
        if (response["rola"] == "A") {
            document.getElementById("erab_gehitu").hidden = false;
            document.getElementById("hr_erab_gehitu").hidden = false;
        }else{
            document.getElementById("erab_gehitu").hidden = true;
            document.getElementById("hr_erab_gehitu").hidden = true;
        }
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
 * Erabiltzailea ez bada zuzena, "erabiltzailea ez dela existitzen" mezua aterako da, eta pazahitza okerra bada, mezu bat agertuko da
 * ere. 3 aldiz errorea ematen badu, saio irekiera 30s blokeatzen da, eta gero eta aldi gehigotan blokeatzen baduzu, itxaron denbora 
 * saiatzeko gero eta luzeagoa egiten da  
 */

function login() {
    var erabil = document.getElementById("erabil").value;
    var pass = document.getElementById("pasahitza").value;
    let options = {method: "GET", mode: 'cors'};
    // Eskaera zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Erabiltzaile_controller.php?erabil='+erabil,options)
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
                document.cookie = response["nan"];
                window.location.href = "pages/home.html";
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

/**
 * Saioa hasteko botoia blokeatu, tenporizadore bat hasi eta kontagailu bat erakusten duen funtzioa.
 */

function bloquear_login()
{
    document.getElementById("log-botoi").disabled = true;
    control =  setInterval(crono,1000);
    crono();
}

/**
 * Geratzen den denbora-kontagailua eguneratzen duen funtzioa, saioa hasteko botoia desblokeatzeko.
*/

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
