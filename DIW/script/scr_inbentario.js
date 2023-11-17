window.addEventListener('load', inbentarioa_bistaratu());
window.addEventListener('load', artikuluak_comboBox_karga());

/**
 * Inbentarioak kargatzen dituen funtzioa da
 */
function inbentarioa_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
    // Eskaera zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

/**
 * Inbentario taularen lerroei gertaerak ematen dizkion funtzioa
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
 * Inbentarioko datuak kargatuta taula formatua ematen dizkion funtzioa 
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
 */
function bilatzailea() {
    var etiketa = document.getElementById("search").value;
    var data = {"bilaketa":etiketa};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

/**
 * Inbentarioan filtro aurreratua egiten duen funtzioa, etiketa, artikulua, hasiera-data eta amaiera-data erabiliz.
 */
function filtratu() {
    var etiketa = document.getElementById("search").value;
    var artikulua = document.getElementById("input-art").value;
    var hData = document.getElementById("input-hData").value;
    var aData = document.getElementById("input-aData").value;
    var data = {"bilaketa":etiketa,"artikulua":artikulua,"hData":hData,"aData":aData};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

/**
 * Artikuluen comboBoxeko elementuak kargatzen dituen funtzioa, GET eskaeraren bitartez zerbitzariari.
 */
function artikuluak_comboBox_karga(){
    let options = {method: "GET", mode: 'cors'};
    // Eskaera zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
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
 * Inbentario berri bat zerbitzarian txertatzen duen funtzioa POST eskaeraren bidez
 */
function inbentarioa_gehitu() {
    if(!konprobatu_erroreak_txertatu()){
        var artikulua = document.getElementById("Artikulua").value;
        var stck = document.getElementById("stck").value;
        var data = {"idEkipamendu":artikulua,"stck":stck};
        var DataJson = JSON.stringify(data);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari 
        fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            inbentario_get(response);
            alert("Erosketa egin da!");
        });
    }
}

/**
 * Aukeratutako inbentarioaren informazioaren menua aktibatzen eta desaktibatzen duen funtzioa
 */
function inbent_editatu(etiketa) {
    document.getElementById("inbent-container").classList.toggle("active");
    document.getElementById("pointer-etiketa").innerHTML = etiketa;
}

/**
 * Inbentarioren etiketa eguneratzen duen funtzioa, PUT eskaeraren bitartez zerbitzariari
 */  
function eguneratu() {
    var etiketa = document.getElementById("pointer-etiketa").innerHTML;
    var etiketa_berria = document.getElementById("etiketa-edit").value;
    if (!konprobatu_erroreak_eguneratu()) {
        var jsonData = {"etiketa":etiketa,"etiketa_berria":etiketa_berria};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari 
        fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
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
}

/**
 * Inbentario erregistro bat ezabatzen duen funtzioa DELETE eskaeraren bitartez zerbitzariari
 */
function ezabatu() {
    var etiketa = document.getElementById("pointer-etiketa").innerHTML;
    var jsonData = {"etiketa":etiketa};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera zerbitzariari 
        fetch('https://www.zerbitzari2.edu/WES/Inbentario_Controller.php',options)
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
 * Aukeratutako inbentario informazioaren menua ixten duen funtzioa
 */

function itxi() {
    document.getElementById('inbent-container').classList.toggle('active');
}

/**
 * Inbentarioa eguneratzean bete beharreko murrizketak betetzen direla konprobatzen duen funtzioa
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak_eguneratu() {
    etiketa_konprobatu();
    const input = document.querySelectorAll("#etiketa-edit");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}

/**
 * Funtzio hau inbentarioa gehitzean murrizketak betetzen duen edo ez konprobatzen du
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak_txertatu() {
    konprobatu_stock();
    const input = document.querySelectorAll("#stck");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}

/**
 * Sartuko den etiketa berria jadanik existitzen den ala ez konprobatzen duen funtzioa
 */
function etiketa_konprobatu(){
    var etiketa = document.getElementById("etiketa-edit").value;
    var etiketa_zaharra = document.getElementById("pointer-etiketa").innerHTML;
    var data = {"kontsulta":true,"etiketa":etiketa};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta 
    fetch("https://www.zerbitzari2.edu/WES/Inbentario_Controller.php", options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        console.log(etiketa);
        console.log(etiketa_zaharra);
        if (etiketa_zaharra.toUpperCase() != etiketa.toUpperCase() && response){
            document.getElementById("etiketa-edit").setCustomValidity("Etiketa jadanik existitzen da");
            document.getElementById("etiketa-edit").reportValidity();
        }else{
            document.getElementById("etiketa-edit").setCustomValidity("");
            document.getElementById("etiketa-edit").reportValidity();
        };
        
    });
}

/**
 * Sartutako stock-a positiboa dela konprobatzen du
 */
function konprobatu_stock() {
    if (!document.getElementById("stck").value || document.getElementById("stck").value <= 0) {
        event.preventDefault();
        document.getElementById("stck").setCustomValidity("Kantitatea positiboa izan behar da");
    }else{
        document.getElementById("stck").setCustomValidity("");
    }
    document.getElementById("stck").reportValidity();
}
