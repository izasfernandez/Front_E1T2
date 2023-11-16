const webIzena = document.getElementById("title").innerHTML;
const divartikuluak = document.querySelector("#artikuluak");
const divart_markak = document.querySelector(".fmarkak");
const divart_kategoriak = document.querySelector(".kategoriak");
const combobox_art_kategoriak = document.querySelector("#kategoria");
var artikulu_inform;
var kategoria = 0;
var kategoria_izena;

if (webIzena == "ARTIKULUAK") {
    window.addEventListener('load', artikuluak_bistaratu());
}

if (webIzena == "ARTIKULUAREN INFORMAZIOA") {
    window.addEventListener('load', artikulu_informazioa());
}

if (divart_markak != null) {
    window.addEventListener('load', markak_kargatu());
}

if (divart_kategoriak != null) {
    window.addEventListener('load', kategoriak_kargatu());
}
/**
 * Funtzio honen bidez hautatutako artikuluaren id-a hartzen du eta bueltatzen du
 * @returns {String} - Artikuluaren Id-a
 */
function get_id() {
    var paramstr = window.location.search.substr(1);
    var tmparr = paramstr.split("=");
    return (tmparr[1]);
}
/**
 * Funtzio honen bidez kargatutako artikuluen irudienkarga errorerik ematen badute, lehenetsitako irudia kargatu egiten du hoien ordez
 * @param {string} id - Artikuluen irudiak dituen id-a hartzen du. 
 */
function artikulu_img_error(id) {
    const imgs = document.querySelectorAll(id);
    imgs.forEach(element => {
        element.addEventListener("error",function art_error(){
            element.src = "../img/img_art_defecto.png";        
        })
    });
}

/**
 * Funtzioak artikulu bati buruzko informazio zehatza lortzen du zerbitzariari GET eskaera eginez,
 * eta informazioa bere input bakoitzean kargatzen du
 */
function artikulu_informazioa()
{
    var id_art = get_id();
    let options = {method: "GET", mode: 'cors'};
    var id_kat;
    // Eskaera Zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php?id_art='+id_art,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("i_izena").value = response["ekipList"][0]["izena"];
        document.getElementById("i_desk").value = response["ekipList"][0]["deskribapena"];
        document.getElementById("i_marka").value = response["ekipList"][0]["marka"];
        document.getElementById("i_model").value = response["ekipList"][0]["modeloa"];
        document.getElementById("a_stock").innerHTML = response["ekipList"][0]["stock"];
        document.getElementById("img_art").src = response["ekipList"][0]["url"];
        document.getElementById("img_url").value = response["ekipList"][0]["url"];
        id_kat = response["ekipList"][0]["idKategoria"];
        artikulu_inform = response;
        // Eskaera Zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/kategoria_controller.php?id_kat='+id_kat,options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            document.getElementById("a_kategoria").innerHTML = response["katList"][0]["izena"];
        }); 
        artikulu_img_error("#img_art");
    });
    
}


/**
 * Funtzio honen bidez fetch bidez GET metodoarekin hartutako artikuluaren informazioa html formatua ematen dio eta web orrialdeari gehitzen dio bistaratzeko
 * @param {Object} response - Artikuluen informazioa duen objetua.
 */
function artikulu_formatua_get(response)
{
    for (let i = 0; i < response["artikuluak"]["ekipList"].length; i++) {
        var img = document.createElement("img");
        img.src = response["artikuluak"]["ekipList"][i]["url"];
        img.alt = response["artikuluak"]["ekipList"][i]["izena"]+" irudia";
        img.classList.add("art_img");
        var izena = document.createElement("h3");
        izena.innerHTML = response["artikuluak"]["ekipList"][i]["izena"];
        var deskribapena  = document.createElement("p");
        deskribapena.innerHTML = response["artikuluak"]["ekipList"][i]["deskribapena"];
        var artikulua  = document.createElement("div");
        var artikulu_esteka = document.createElement("a");
        artikulu_esteka.href = "artikulu_info.html?id="+response["artikuluak"]["ekipList"][i]["id"];
        artikulua.id = response["artikuluak"]["ekipList"][i]["id"];
        artikulua.classList.add("art_info");
        artikulu_esteka.appendChild(img);
        artikulu_esteka.appendChild(izena);
        artikulu_esteka.appendChild(deskribapena);
        artikulua.appendChild(artikulu_esteka);
        divartikuluak.appendChild(artikulua);   
    }
    artikulu_img_error(".art_img")
}

/**
 * Funtzio honen bidez fetch bidez POST metodoarekin hartutako artikuluaren informazioa html 
 * formatua ematen dio eta web orrialdeari gehitzen dio bistaratzeko
 * @param {Object} response - Artikuluen informazioa duen objetua.
 */
function artikulu_formatua_post(response)
{
    for (let i = 0; i < response["ekipList"].length; i++) {
        var img = document.createElement("img");
        img.src = response["ekipList"][i]["url"];
        img.src = response["ekipList"][i]["url"];
        img.alt = response["ekipList"][i]["izena"]+" irudia";
        img.classList.add("art_img");
        var izena = document.createElement("h3");
        izena.innerHTML = response["ekipList"][i]["izena"];
        var deskribapena  = document.createElement("p");
        deskribapena.innerHTML = response["ekipList"][i]["deskribapena"];
        var artikulua  = document.createElement("div");
        var artikulu_esteka = document.createElement("a");
        artikulu_esteka.href = "artikulu_info.html?id="+response["ekipList"][i]["id"];
        artikulua.id = response["ekipList"][i]["id"];
        artikulua.classList.add("art_info");
        artikulu_esteka.appendChild(img);
        artikulu_esteka.appendChild(izena);
        artikulu_esteka.appendChild(deskribapena);
        artikulua.appendChild(artikulu_esteka);
        divartikuluak.appendChild(artikulua);   
    }
    artikulu_img_error(".art_img");
}


/**
 * Funtzioak artikuluen informazioa lortzen du zerbitzariari egindako GET eskaera baten bidez, 
 * eta zegoen informazio zaharra ezabatzen du informazio berria sartzeko
 */
function artikuluak_bistaratu() {
    document.getElementById("artikuluak").innerHTML = "";
    let options = {method: "GET", mode: 'cors'};
    // Eskaera Zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        artikulu_formatua_get(response);
    });
}

/**
 * Funtzioak erabiltzaileak emandako irizpideen arabera iragazten ditu artikuluak, zegoen informazio zaharra ezabatzen du
 * informazio berria sartzeko
 */
function artikuluak_filtratu() {
    document.getElementById("artikuluak").innerHTML = "";
    var art_izena = document.getElementById("art_izena").value;
    var art_deskribapena = document.getElementById("art_deskribapena").value;
    var art_stck_min = document.getElementById("art_stck_min").value;
    var art_stck_max = document.getElementById("art_stck_max").value;
    var art_markak = markak_filtratu()
    var array_filtroa = {"filtro":true,"art_izena":art_izena,"art_deskribapena":art_deskribapena,"art_stck_min":art_stck_min,"art_stck_max":art_stck_max,"markak":art_markak, "kategoria":kategoria};
    let filtroJson = JSON.stringify(array_filtroa);
    let options = {method: "POST", mode: 'cors', body:filtroJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        artikulu_formatua_post(response);
    });
}

/**
 * Funtzioak produktuen markak zerbitzaritik kargatzen ditu GET metodoaren bitartez, 
 * checkbox formatua ematen eta webgunean txertatzen ditu
 */
function markak_kargatu()
{
    let options = {method: "GET", mode: 'cors'};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        response["markak"].forEach(value => {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = value["marka"];
            checkbox.value = value["marka"];
            checkbox.classList.add("marka_checkbox");
            var marka = document.createElement("label");
            marka.innerHTML = value["marka"];
            divart_markak.appendChild(checkbox);
            divart_markak.appendChild(marka);
        });
    });
}

/**
 * Funtzioak erabiltzaileak hautatutako markak lortzen ditu.
 * @returns {array} - Array bat, erabiltzaileak hautatutako markekin.
 */
function markak_filtratu() {
    var art_markak = document.querySelectorAll(".marka_checkbox");
    var markak_aukeratuta = [];
    art_markak.forEach(check => {
        if (check.checked == true) {
            markak_aukeratuta[markak_aukeratuta.length] = check.value;
        }
    });
    return(markak_aukeratuta);
}

/**
 * Funtzioak klik egiteko gertaerak ezartzen ditu kategoria filtroko elementuetan.
 */
function kategoria_event() {
    const filtro_kategoria = document.querySelectorAll(".kategoria_filtro");
    if (filtro_kategoria != null) {
        filtro_kategoria.forEach(element => {
            element.addEventListener("click",e =>{
                kategoriaz_filtratu(e.target.getAttribute("id"));
            })
        })
    }
}

/**
 * Funtzioak zerbitzaritik kargatzen ditu kategoriak GET metodoaren bidez, 
 * eta checkbox batzuetan kargatzen ditu, artikuluak sartzeko, eta div desberdinetan, kategoria filtrorako.
 */
function kategoriak_kargatu() {
    let options = {method: "GET", mode: 'cors'};
    // Eskaera Zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/kategoria_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        for (let i = 0; i < response["katList"].length; i++) {
            var text = document.createElement("p");
            text.id = response["katList"][i]["id"];
            text.innerHTML = response["katList"][i]["izena"];
            text.classList.add("kategoria_filtro");
            var option = document.createElement("option");
            option.value = response["katList"][i]["id"];
            option.innerHTML = response["katList"][i]["izena"];
            divart_kategoriak.appendChild(text); 
            if (i != response["katList"].length-1) {
                var hr = document.createElement("hr"); 
                divart_kategoriak.appendChild(hr);  
            }    
            combobox_art_kategoriak.appendChild(option);
            var option_edit = document.createElement("option");
            option_edit.value = response["katList"][i]["id"];
            option_edit.innerHTML = response["katList"][i]["izena"];
            document.getElementById("kat-edit").appendChild(option_edit);
        }
        kategoria_event()
    });
}

/**
 * Funtzioa dagoen filtroa desaktibatzen du eta dagoen hautatutako kategoriaz filtratuta uzten du web-orrialdea
 */
function filtroa_kendu() {
    const filtro_kategoria = document.querySelectorAll(".kategoria_filtro");
    filtro_kategoria.forEach(element => {
        if (element.classList.contains("active")) {
            kategoria = element.id;
        }
    })
    kategoriaz_filtratu(kategoria);
}

/**
 * Funtzioak kategoria jakin batetik iragazten ditu artikuluak.
 * @param {string} id - Kategoriaren Id-a.
 */
function kategoriaz_filtratu(id) {
    kategoria = id;
    const filtro_kategoria = document.querySelectorAll(".kategoria_filtro");
    filtro_kategoria.forEach(element => {
        element.classList.remove("active");
    })
    document.getElementById(id).classList.toggle("active");
    document.getElementById("artikuluak").innerHTML = "";
    var array_filtroa = {"filtro":true,"kategoria":id};
    let filtroJson = JSON.stringify(array_filtroa);
    let options = {method: "POST", mode: 'cors', body:filtroJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera Zerbitzariari 
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        artikulu_formatua_post(response);
    });
}

/**
 * Funtzioak dagoen artikulu baten informazioa eguneratzen du, 
 * aldez aurretik bete behar diren murrizketa batzuk betetzen direla konprobatu ondoren
 */
function artikuluak_eguneratu() {
    if (!konprobatu_erroreak()) {
        var id_art = get_id();
        var art_izena = document.getElementById("i_izena").value;
        var art_desk = document.getElementById("i_desk").value;
        var art_mark = document.getElementById("i_marka").value;
        var art_model = document.getElementById("i_model").value;
        var art_url = document.getElementById("i_url").value;
        var jsonData = {"id":id_art,"izena":art_izena,"desk":art_desk,"modeloa":art_mark,"marka":art_model, "url":art_url};
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera Zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            window.location.href = window.location.href;
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Artikulua eguneratu da")
            }
        });   
    }
}

/**
 * Funtzioak aukeratutako artikulu bat ezabatzen du zerbitzariari DELETE eskaera eginez.
 */
function artikuluak_ezabatu() {
    var id_art = get_id();
    var jsonData = {"id":id_art};
    let DataJson = JSON.stringify(jsonData);
    let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        window.location.href = "Artikuluak.html";
        if (response.match('Error')) {
            alert("Errorea egon da :".response);
        }else{
            alert("Artikulua ezabatu da")
        }
    });
}

/**
 * Funtzioak artikulu berri bat gehitzen du zerbitzariari POST bidez egindako eskaera baten bitartez, 
 * murrizketak betetzen direla egiaztatu ondoren.
 */
function artikuluak_gehitu() {
    if(!konprobatu_erroreak()){
        var izena = document.getElementById("i_izena").value;
        var desk = document.getElementById("i_desk").value;
        var marka = document.getElementById("i_marka").value;
        var model = document.getElementById("i_model").value;
        var url = document.getElementById("i_url").value;
        var kat = document.getElementById("kategoria").value;
        var stck = document.getElementById("i_stock").value;
        var jsonData;
        if (document.getElementById("stck").hidden == true) {
            jsonData = {"filtro":false,"izena":izena,"desk":desk,"marka":marka,"model":model,"url":url,"kat":kat};
        }else{
            jsonData = {"filtro":false,"izena":izena,"desk":desk,"marka":marka,"model":model,"url":url,"kat":kat, "stck":stck};
        }
        let DataJson = JSON.stringify(jsonData);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // Eskaera Zerbitzariari
        fetch('https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            var img = document.createElement("img");
            img.src = response["url"];
            img.src = response["url"];
            img.alt = response["izena"]+" irudia";
            img.classList.add("art_img");
            var izena = document.createElement("h3");
            izena.innerHTML = response["izena"];
            var deskribapena  = document.createElement("p");
            deskribapena.innerHTML = response["deskribapena"];
            var artikulua  = document.createElement("div");
            var artikulu_esteka = document.createElement("a");
            artikulu_esteka.href = "Artikulu_info.html?id="+response["id"];
            artikulua.id = response["id"];
            artikulua.classList.add("art_info");
            artikulu_esteka.appendChild(img);
            artikulu_esteka.appendChild(izena);
            artikulu_esteka.appendChild(deskribapena);
            artikulua.appendChild(artikulu_esteka);
            divartikuluak.appendChild(artikulua);   
            artikulu_img_error(".art_img")
        });
    }
}
/**
 * Funtzio honen bitartez kategoriak gehitzeko, editatzeko eta ezabatzeko menua aktibatzen eta desaktibatzen da
 */
function kat_edit_open() {
    document.getElementById("kat-editatu").classList.toggle("active");
    document.getElementById("kat-edit-container").classList.toggle("active");
    kategoria_karga_editatzeko();
}
/**
 * Kategorien menuan, kategoria gehitzeko lehioa irekitzen du
 */
function add_kat_activatu() {
    if (!document.getElementById("kat-add-container").classList.contains("active")) {
        document.getElementById("kat-add-container").classList.toggle("active");
        document.getElementById("kat-edit-container").classList.toggle("active");
        document.getElementById("edit-kat").classList.remove("active");
        document.getElementById("add-kat").classList.toggle("active");
    }
}
/**
 * Kategorien menuan, kategoria editatzeko eta ezabatzeko lehioa irekitzen du
 */
function edit_kat_activatu() {
    if (!document.getElementById("kat-edit-container").classList.contains("active")) {
        document.getElementById("kat-add-container").classList.toggle("active");
        document.getElementById("kat-edit-container").classList.toggle("active");
        document.getElementById("edit-kat").classList.toggle("active");
        document.getElementById("add-kat").classList.remove("active");
        kategoria_karga_editatzeko();
    }
}

/**
 * Funtzio honen bidez kategorien comboBox-a aldatzean aukeratutako kategoriaren informazioa kargatzen du 
 * GET eskaera bitartez zerbitzariari deia egiten
 */
function kategoria_karga_editatzeko() 
{
    idkat = document.getElementById("kat-edit").value;
    let options = {method: "GET", mode: 'cors'};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/kategoria_controller.php?id_kat='+idkat,options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        document.getElementById("kat-input-edit").value = response["katList"][0]["izena"];
        kategoria_izena = response["katList"][0]["izena"];
    });
}

/**
 * Funtzioak PUT eskaera bat egiten dio zerbitzariari kategoria bat eguneratzeko
 */
function kategoria_editatu() 
{
    idkat = document.getElementById("kat-edit").value;
    izena = document.getElementById("kat-input-edit").value;
    if (!konprobatu_erroreak_art_eguneratu()) {
        data = {"id":idkat,"izena":izena};
        DataJson = JSON.stringify(data);
        let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // ruta
        fetch('https://www.zerbitzari2.edu/WES/kategoria_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            window.location.href = window.location.href;
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Kategoria eguneratu da")
            }
        });   
    }
}

/**
 * Funtzioak DELETE eskaera bat egiten dio zerbitzariari aukeratutako kategoria ezabatzeko
 */
function kategoria_ezabatu() 
{
    idkat = document.getElementById("kat-edit").value;
    data = {"id":idkat};
    DataJson = JSON.stringify(data);
    let options = {method: "DELETE", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Eskaera Zerbitzariari
    fetch('https://www.zerbitzari2.edu/WES/kategoria_controller.php',options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        window.location.href = window.location.href;
        if (response.match('Error')) {
            alert("Errorea egon da :".response);
        }else{
            alert("Kategoria ezabatu da")
        }
    });
}

/**
 * Funtzioak POST eskaera bat egiten dio zerbitzariari kategoria bat gehitzeko
 */
function kategoria_gehitu() 
{
    var izena = document.getElementById("kat-berria").value;
    var inb;
    if (!konprobatu_erroreak_art_txertatu()) {
        if(document.getElementById("inb-input").checked){
            inb = 1;
        }else{
            inb = 0;
        }
        data = {"izena":izena,"inb":inb};
        DataJson = JSON.stringify(data);
        let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
        // ruta
        fetch('https://www.zerbitzari2.edu/WES/kategoria_controller.php',options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            window.location.href = window.location.href;
            if (response.match('Error')) {
                alert("Errorea egon da :".response);
            }else{
                alert("Kategoria gehitu da")
            }
        });
    }
}

/**
 * Funtzio honen bitartez konprobatzen da artikuluak bete beharreko murrizketak betetzen dituen edo ez, 
 * eta horren arabera true edo false bueltatzen du
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak() {
    deskribapena_konprobatu();
    marka_konprobatu();
    modeloa_konprobatu();
    izena_konprobatu();
    const input = document.querySelectorAll(".input-art");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}

/**
 * Deskribapenaren atala baliozkatzen duen funtzioa, beteta egoten behartzen.
 */
function deskribapena_konprobatu() {
    if (!document.getElementById("i_desk").value) {
        event.preventDefault();
        document.getElementById("i_desk").setCustomValidity("Izena bete behar da");
    }else{
        document.getElementById("i_desk").setCustomValidity("");
    }
    document.getElementById("i_desk").reportValidity();
}
/**
 * Markaren atala baliozkatzen duen funtzioa, beteta egoten behartzen.
 */
function marka_konprobatu() {
    if (!document.getElementById("i_marka").value) {
        event.preventDefault();
        document.getElementById("i_marka").setCustomValidity("Marka bete behar da");
    }else{
        document.getElementById("i_marka").setCustomValidity("");
    }
    document.getElementById("i_marka").reportValidity();
}
/**
 * Modeloaren atala baliozkatzen duen funtzioa, beteta egoten behartzen.
 */
function modeloa_konprobatu() {
    if (!document.getElementById("i_model").value) {
        event.preventDefault();
        document.getElementById("i_model").setCustomValidity("Modeloa bete behar da");
    }else{
        document.getElementById("i_model").setCustomValidity("");
    }
    document.getElementById("i_model").reportValidity();
}
/**
 * Izenaren atala baliozkatzen duen funtzioa, beteta egoten behartzen eta izenaren errepikapena ekiditen
 */
function izena_konprobatu() {
    izena = document.getElementById("i_izena").value;
    if (!document.getElementById("i_izena").value) {
        event.preventDefault();
        document.getElementById("i_izena").setCustomValidity("Izena bete behar da");
        document.getElementById("i_izena").reportValidity();
    }else{
        let options = {method: "GET", mode: 'cors'};
        //  
        fetch("https://www.zerbitzari2.edu/WES/Ekipamendu_controller.php?artikulu_izena='"+izena+"'", options)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if (artikulu_inform) {
                if (response && izena.toUpperCase() != artikulu_inform["ekipList"][0]["izena"].toUpperCase()) {
                    document.getElementById("i_izena").setCustomValidity("Izena jadanik existitzen da");
                    document.getElementById("i_izena").reportValidity();
                }else{
                    document.getElementById("i_izena").setCustomValidity("");
                    document.getElementById("i_izena").reportValidity();
                }
            }else{
                if (response) {
                    document.getElementById("i_izena").setCustomValidity("Izena jadanik existitzen da");
                    document.getElementById("i_izena").reportValidity();
                }else{
                    document.getElementById("i_izena").setCustomValidity("");
                    document.getElementById("i_izena").reportValidity();
                }
            }
            
        });
    }
}

/**
 * Kategoriaren arabera stock-a gehitzeko artikuluari bistaratzen da edo ez
 */
function stock_bistaratu() {
    if (document.getElementById("kategoria").value != "1" && document.getElementById("kategoria").value != "2") {
        document.getElementById("stck").hidden = false;
    }else{
        document.getElementById("stck").hidden = true;
    }
}

/**
 * Kategoria existitzen den edo ez konprobatzen du
 */
function kategoria_konprobatu() {
    var kat_izena = document.getElementById("kat-input-edit").value;
    var data = {"kategoria_izena":kat_izena};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta 
    fetch("https://www.zerbitzari2.edu/WES/kategoria_controller.php", options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if (kat_izena.toUpperCase() != kategoria_izena.toUpperCase() && response){
            document.getElementById("kat-input-edit").setCustomValidity("Kategoria jadanik existitzen da");
            document.getElementById("kat-input-edit").reportValidity();
        }else{
            document.getElementById("kat-input-edit").setCustomValidity("");
            document.getElementById("kat-input-edit").reportValidity();
        };
        
    });
}

/**
 * Kategoria gehitzerakoan existitzen den edo ez konprobatzen du
 */
function kategoria_sortu_konprobatu() {
    var kat_izena = document.getElementById("kat-berria").value;
    var data = {"kategoria_izena":kat_izena};
    var DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
    // Ruta 
    fetch("https://www.zerbitzari2.edu/WES/kategoria_controller.php", options)
    .then(data => {
        return data.json();
    })
    .then(response => {
        if (response){
            document.getElementById("kat-input-edit").setCustomValidity("Kategoria jadanik existitzen da");
            document.getElementById("kat-input-edit").reportValidity();
        }else{
            document.getElementById("kat-input-edit").setCustomValidity("");
            document.getElementById("kat-input-edit").reportValidity();
        };
        
    });
}

/**
 * Funtzio hau kategoria eguneratzean murrizketak betetzen duen edo ez konprobatzen du
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak_art_eguneratu() {
    kategoria_konprobatu();
    const input = document.querySelectorAll(".input-kat");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}

/**
 * Funtzio hau kategoria txertatzean murrizketak betetzen duen edo ez konprobatzen du
 * @returns {boolean} true betetzen ez badira/False betetzen bada
 */
function konprobatu_erroreak_art_txertatu() {
    kategoria_sortu_konprobatu();
    const input = document.querySelectorAll(".input-kat");
    var error = false;
    input.forEach(element => {
        if(!element.checkValidity()){
            error = true;
        }
    });
    return error;
}
