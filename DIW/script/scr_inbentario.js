window.addEventListener('load', inbentarioa_bistaratu());
window.addEventListener('load', artikuluak_comboBox_karga());

/**
 * Inbentarioa bistaratzen duen funtzioa
 */
function inbentarioa_bistaratu() {
    let options = {method: "GET", mode: 'cors'};
    // Ruta 
    fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

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

function bilatzailea() {
    var etiketa = document.getElementById("search").value;
    var data = {"bilaketa":etiketa};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

function filtratu() {
    var etiketa = document.getElementById("search").value;
    var artikulua = document.getElementById("input-art").value;
    var hData = document.getElementById("input-hData").value;
    var aData = document.getElementById("input-aData").value;
    var data = {"bilaketa":etiketa,"artikulua":artikulua,"hData":hData,"aData":aData};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("inb_db").innerHTML = "";
        inbentario_get(response);
    });
}

function artikuluak_comboBox_karga(){
    let options = {method: "GET", mode: 'cors'};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/Ekipamendu_controller.php',options)
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

function inbentarioa_gehitu() {
    var artikulua = document.getElementById("Artikulua").value;
    var stck = document.getElementById("stck").value;
    var data = {"idEkipamendu":artikulua,"stck":stck};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // ruta
    fetch('http://localhost/ERRONKA1/WES/Inbentario_Controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        inbentario_get(response);
        alert("Erosketa egin da!");
    });
}

function inbent_editatu(etiketa) {
    document.getElementById("inbent-container").classList.toggle("active");
    document.getElementById("pointer-etiketa").innerHTML = etiketa;
}

function eguneratu() {
    var etiketa = document.getElementById("pointer-etiketa").innerHTML;
    var etiketa_berria = document.getElementById("etiketa-edit").value;
    var jsonData = {"etiketa":etiketa,"etiketa_berria":etiketa_berria};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // ruta
        fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
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

function ezabatu() {
    var etiketa = document.getElementById("pointer-etiketa").innerHTML;
    var jsonData = {"etiketa":etiketa};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // ruta
        fetch('http://localhost/ERRONKA1/WES/Inbentario_controller.php',options)
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


function itxi() {
    document.getElementById('inbent-container').classList.toggle('active');
}
