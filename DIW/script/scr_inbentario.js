window.addEventListener('load', inbentarioa_bistaratu());
window.addEventListener('load', artikuluak_comboBox_karga());

/**
 * Inbentarioak erakusten duen funtzioa.
 * GET eskaera egiten dio tokiko kontrolatzaile bati inbentarioaren datuak lortzeko
 * eta orrian erakusten ditu.
 */
function inbentarioa_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
<<<<<<< HEAD
    // Eskaera zerbitzariari 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
=======
    // Ruta 
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

/**
 * 'Inbent' klaseko elementuetarako ekitaldiak konfiguratzen dituen funtzioa.
 * Klik egiteko listener bat gehitzen zaio 'inbent' elementu bakoitzari, 
 * eta inbent_editatu funtziora deitzen du, klikatutako elementuaren IDarekin.
 */
function inbentario_event() {
    const event_inbent = document.querySelectorAll(".inbent");
    if (event_inbent != null) {
        event_inbent.forEach(element => {
            element.addEventListener("click",e =>{
                inbent_editatu(e.target.getAttribute("id"));
            })
        })
    }
}

/**
 * Inbentarioko datuak prozesatu eta orrian erakusten dituen funtzioa.
 * Erantzunean jasotako inbentarioko elementuak aztertzen ditu.
 * @param {Object} response - Eskaeraren erantzuna inbentario-kontrolatzaileari.
 */
function inbentario_get(response){
    for (let i = 0; i < response["inbList"].length; i++) {
        var tr = document.createElement("tr");
        tr.classList.add("inbent");
        var td_etiketa = document.createElement("td");
        var td_artikulu = document.createElement("td");
        var td_data = document.createElement("td");
        td_etiketa.id = response["inbList"][i]["etiketa"];
        td_artikulu.id = response["inbList"][i]["etiketa"];
        td_data.id = response["inbList"][i]["etiketa"];
        td_etiketa.innerHTML = response["inbList"][i]["etiketa"];
        td_artikulu.innerHTML = response["inbList"][i]["idEkipamendu"];
        td_data.innerHTML = response["inbList"][i]["erosketaData"];
        tr.appendChild(td_etiketa);
        tr.appendChild(td_artikulu);
        tr.appendChild(td_data);
        document.getElementById("inb_db").appendChild(tr);
    }
    inbentario_event();
}

/**
 * Inbentarioan bilaketa bat egiten duen funtzioa, emandako etiketa batean oinarrituta.
 * Bilaketa-elementuaren etiketa lortzen du orrian, POST eskaera egiten dio inbentarioaren kontrolatzaileari
 * eta inbentarioaren bistaratzea eguneratzen du orrian.
 */
function bilatzailea() {
    var etiketa = document.getElementById("search").value;
    var data = {"bilaketa":etiketa};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
<<<<<<< HEAD
    // Eskaera zerbitzariari 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php',options)
=======
    // ruta
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

/**
 * Inbentarioan iragazte aurreratua egiten duen funtzioa, etiketa, artikulua, hasiera-data eta amaiera-data erabiliz.
 * Sarrera-datuak biltzen ditu, inbentarioaren kontrolatzaileari POST eskaera egiten dio 
 * eta inbentarioaren bistaratzea eguneratzen du orrian.
 */
function filtratu() {
    var etiketa = document.getElementById("search").value;
    var artikulua = document.getElementById("input-art").value;
    var hData = document.getElementById("input-hData").value;
    var aData = document.getElementById("input-aData").value;
    var data = {"bilaketa":etiketa,"artikulua":artikulua,"hData":hData,"aData":aData};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
<<<<<<< HEAD
    // Eskaera zerbitzariari 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php',options)
=======
    // ruta
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

/**
 * Artikuluen comboBoxeko elementuak kargatzen dituen funtzioa.
 * GET eskaera bat egiten dio ekipamendu-kontrolatzaileari, artikuluen datuak lortzeko 
 * eta comboBox orria eguneratzen du lortutako datuekin.
 */
function artikuluak_comboBox_karga(){
    let options = {method: "GET", mode: 'cors'};
<<<<<<< HEAD
    // Eskaera zerbitzariari 
    fetch('http://localhost/ERRONKA1/WES/Ekipamendu_controller.php',options)
=======
    // ruta
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
    .then(data => {
        return data.json();
    })
    .then(response => {
        for (let i = 0; i < response["artikuluak"]["ekipList"].length; i++) {
            var option = document.createElement("option");
            option.innerHTML = response["artikuluak"]["ekipList"][i]["izena"];
            option.value = response["artikuluak"]["ekipList"][i]["id"];
            document.getElementById("Artikulua").appendChild(option);
        }

    });
}

/**
 * Sarrera-datuak biltzen ditu, kontrolatzaileari POST eskaera egiten dio artikulu berria gehitzeko eta inbentarioaren bistaratzea eguneratzen du orrian.
 * Alerta bat erakusten du erosketa egin dela baieztatzeko.
 */
function inbentarioa_gehitu() {
    var artikulua = document.getElementById("Artikulua").value;
    var stck = document.getElementById("stck").value;
    var data = {"idEkipamendu":artikulua,"stck":stck};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
<<<<<<< HEAD
    // Eskaera zerbitzariari 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php',options)
=======
    // ruta
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
    .then(data => {
        return data.json();
    })
    .then(response => {
        inbentario_get(response);
        alert("Erosketa egin da!");
    });
}

/**
 * Inbentarioan elementu baten bistaratze-egoera aldatzen duen funtzioa.
 * Parametrotzat hartzen du etiketa, eta 'active' klasea tartekatzen du orrian dagokion edukiontzian, elementua erakusteko edo ezkutatzeko.
 */
function inbent_editatu(etiketa) {
    document.getElementById("inbent-container").classList.toggle("active");
    document.getElementById("pointer-etiketa").innerHTML = etiketa;
}

/**
 * Inbentarioan artikulu baten informazioa eguneratzen duen funtzioa.
 * Sarrera-datuak biltzen ditu, inbentarioko kontrolatzaileari PUT eskaera egiten dio artikuluaren informazioa eguneratzeko 
 * eta inbentarioaren bistaratzea eguneratzen du orrian.
 * Uneko orrialdera bideratzen du eguneratzearen ondoren, eta arrakasta- edo errore-alerta bat erakusten du.
 */  
function eguneratu() {
    var etiketa = document.getElementById("pointer-etiketa").innerHTML;
    var etiketa_berria = document.getElementById("etiketa-edit").value;
    var jsonData = {"etiketa":etiketa,"etiketa_berria":etiketa_berria};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
<<<<<<< HEAD
        // Eskaera zerbitzariari 
        fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
=======
        // ruta
        fetch('https://www.zerbitzari2.edu/WES/Inbentario_controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
        .then(data => {
            return data.json();
        })
        .then(response => {
            window.location.href = window.location.href;
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Inbentarioa eguneratu da")
            }
        });  
}

/**
 * Inbentariotik artikulu bat ezabatzen duen funtzioa.
 * Bildu sarrera-datuak, egin DELETE eskaera inbentario-kontrolatzaileari artikulua ezabatzeko eta eguneratu inbentarioaren bistaratzea orrian.
 * Uneko orrialdera birbideratzen du ezabatu ondoren, eta arrakasta- edo errore-alerta bat erakusten du.
 */
function ezabatu() {
    var etiketa = document.getElementById("pointer-etiketa").innerHTML;
    var jsonData = {"etiketa":etiketa};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
<<<<<<< HEAD
        // Eskaera zerbitzariari 
        fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
=======
        // ruta
        fetch('https://www.zerbitzari2.edu/WES/Inbentario_controller.php',options)
>>>>>>> 15b8a4bf1bdaeaa0108f0430676508519d7103c5
        .then(data => {
            return data.json();
        })
        .then(response => {
            window.location.href = window.location.href;
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Inbentarioa ezabatu da")
            }
        });  
}

/**
 * Inbentarioko elementuaren edukiontzian 'aktibatu' klasea txandakatzen duen funtzioa, 
 * edukiontzi hori orrian erakusteko edo ezkutatzeko, sortzen ari den leihoa ixteko funtzio gisa jardunez.
 */

function itxi() {
    document.getElementById('inbent-container').classList.toggle('active');
}
