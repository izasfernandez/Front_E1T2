const webIzena = document.getElementById("title").innerHTML;
const divartikuluak = document.querySelector("#artikuluak");
const divart_markak = document.querySelector(".fmarkak");
const divart_kategoriak = document.querySelector(".kategoriak");
const combobox_art_kategoriak = document.querySelector("#kategoria");
var artikulu_inform;
var kategoria = 0;

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
 * Funtzioak egungo URLaren kontsulta-katean (query string) zehaztutako parametroaren balioa lortzen du.
 * Itzuli parametroaren balioa URLan badago, edo null, ez badago.
 */
function get_id() {
    var paramstr = window.location.search.substr(1);
    var tmparr = paramstr.split("=");
    return (tmparr[1]);
}
/**
 * Funtzioak 'id' hautatzaileak zehaztutako irudiak kargatzeko erroreak maneiatzen ditu.
 * Irudi batek errore bat badu kargatzean, lehenetsitako irudi bat ezarriko da haren ordez.
 * @param {string} id - Irudiak identifikatzeko CSS hautatzailea. 
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
 * Funtzioak artikulu bati buruzko informazio zehatza lortzen du zerbitzariari GET eskaera eginez.
 * Programak inprimakiaren eremuak eguneratzen ditu lortutako informazioarekin, hala nola izena, 
 * deskribapena, marka, modeloa, stocka, irudiaren URLa eta artikuluaren kategoria.
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
 * Funtzioak HTML egitura sortzen du, erantzun gisa jasotako artikuluei buruzko informazioa erakusteko.
 * HTML elementuak sortzen ditu (irudia, izenburua, deskribapena, esteka) artikulu bakoitzerako, eta orrialdearen egiturari gehitzen dizkio bistaratzeko.
 * @param {Object} response - Artikuluen informazioa duen erantzuna.
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
        artikulu_esteka.href = "Artikulu_info.html?id="+response["artikuluak"]["ekipList"][i]["id"];
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
 * Funtzioak HTML egitura sortzen du, POST eskaera bati erantzuteko jasotako artikuluen informazioa erakusteko.
 * Programak HTML elementuak sortzen ditu (irudia, izenburua, deskribapena, esteka) artikulu bakoitzerako, eta orrialdearen egiturari gehitzen dizkio bistaratzeko.
 * @param {Object} erantzun - Artikuluen informazioa duen erantzuna.
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
        artikulu_esteka.href = "Artikulu_info.html?id="+response["ekipList"][i]["id"];
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
 * Funtzioak artikuluen informazioa lortzen du zerbitzariari GET eskaera eginez.
 * 'artikuluak' atalaren aurretiko edukia garbitzen du, 
 * eta, ondoren, 'artikulu_formatua_get' funtzioa erabiltzen du HTML egitura sortzeko eta artikuluen informazioa orrian erakusteko.
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
 * Funtzioak artikuluak iragazten ditu, erabiltzaileak emandako irizpideen arabera.
 * Programak ezabatu egiten du 'artikuluak' atalaren aurreko edukia, eta POST eskaera egiten dio zerbitzariari, iragazteko parametroekin. 
 * Lortutako erantzuna erabiltzen du iragazitako artikuluekin HTML egitura sortzeko eta erakusteko.
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
 * Funtzioak produktuen marken aukerak kargatzen ditu zerbitzaritik, eta interfazean checkboxe gisa erakusten ditu.
 * GET eskaera bat egiten dio zerbitzariari marken informazioa lortzeko.
 * Lortutako marka bakoitzari dagozkion checkbox-ak sortzen ditu, eta interfazean erakusten ditu.
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
 * Funtzioak interfazean checkboxen bidez erabiltzaileak hautatutako markak lortzen ditu.
 * Bilatu HTML elementu guztiak 'marka_checkbox' klasearekin, egiaztatu zein dauden markatuta eta itzuli array bat hautatutako marken balioekin.
 * @returns {array} - Erabiltzaileak hautatutako markak dituen array bat.
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
 * Funtzioak klik egiteko gertaerak ezartzen ditu kategoria-iragazkiko elementuetan.
 * HTML elementu guztiak bilatzen ditu 'kategoria_iragazki' klasearekin, 
 * eta, halakorik badago, klik egiteko gertaera bat esleitzen die, klik egitean 'kategoriaz_filtratu' funtziora deitzen duena.
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
 * Funtzioak zerbitzaritik kargatzen ditu kategoriak eta interfazean erakusten ditu.
 * GET eskaera bat egiten dio zerbitzariari kategorien informazioa lortzeko.
 * Lortutako kategoria bakoitzari dagozkion HTML elementuak sortzen ditu eta interfazean erakusten ditu.
 * Gainera, gehitu aukerak combobox bati eta kategoriak editatzeko aukera multzo bati.
 * 'kategoria_event ()' funtziora deitzen du kargatutako kategorietan ekitaldiak ezartzeko.
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
 * Funtzioak kategorien iragazki aktiboa egiaztatzen eta ezabatzen du.
 * HTML elementu guztiak bilatzen ditu 'kategoria_iragazki' klasearekin, 
 * eta horietako batek 'active' klasea duen egiaztatzen du.
 * 'active' klaseko elementuren bat aurkitzen baduzu, lortu zure identifikatzailea 
 * eta deitu 'kategoriaz_filtratu ()' funtziora kategoria horretako iragazkia ezabatzeko.
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
 * @param {string} id - Artikuluak iragazteko erabiliko den kategoriaren identifikatzailea.
 * 'kategoria_iragazki' klasearekin elementu guztiak lortzen ditu eta bakoitzaren 'active' klasea ezabatzen du.
 * 'active' klasea gehitzen dio hautatutako kategoriari dagokion elementuari.
 * Eskaera bat egiten dio zerbitzariari hautatutako kategoriako artikuluak lortzeko, eta artikuluen zerrenda eguneratzen du.
 */
function kategoriaz_filtratu(id) {
    kategoria = id;
    const filtro_kategoria = document.querySelectorAll(".kategoria_filtro");
    filtro_kategoria.forEach(element => {
        element.classList.remove("active");
    })
    document.getElementById(id).classList.toggle("active");
    // Ruta local Erik
    // fetch('../WES/Ekipamendu_controller.php',options)
    // Ruta local Imanol
    // fetch('../WES/Ekipamendu_controller.php',options)
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
 * Funtzioak lehendik dagoen artikulu baten informazioa eguneratzen du.
 * Lortu artikuluaren datuak DOMeko elementuetatik abiatuta.
 * PUT eskaera bat egiten dio zerbitzariari, artikuluko informazioa eguneratzeko.
 * Egiaztapenean akatsik ez badago, eskaera egin eta orria eguneratuko da.
 * Akatsen bat izanez gero, alerta-mezu bat erakutsiko du.
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
* Funtzioak egun dagoen artikulu bat ezabatzen du zerbitzariari DELETE eskaera eginez.
* Ezabatu beharreko artikuluaren IDa lortzen du.
* DELETE eskaera bat egiten dio zerbitzariari eta artikuluen zerrendako orrira bideratzen du.
* Alerta-mezu bat erakusten du zerbitzariaren erantzunaren arabera.
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
 * 
 * 
 * 
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
 * Funtzioak 'active' klasea txandakatzen du 'kat-editatu' 
 * eta 'kat-edit-container' elementuetan, edukia erakutsiz edo ezkutatuz.
 */
function kat_edit_open() {
    document.getElementById("kat-editatu").classList.toggle("active");
    document.getElementById("kat-edit-container").classList.toggle("active");
}
/**
 * Funtzioak 'kat-add-container' edukiontzia eta 'kat-edit-container' ezkutatua erakusten ditu, 
 * 'active' klaseak 'edit-kat' eta 'add-kat' klaseetan tartekatzen ditu.
 * Edukiontzi bakarra aldi berean aktibo dagoela ziurtatzen da.
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
 * Funtzioak 'kat-edit-container' edukiontzia eta 'kat-add-container' ezkutatua erakusten ditu,
 *  'active' klaseak 'edit-kat' eta 'add-kat' klaseetan tartekatzen ditu.
 * Edukiontzi bakarra aldi berean aktibo dagoela ziurtatzen da.
 */
function edit_kat_activatu() {
    if (!document.getElementById("kat-edit-container").classList.contains("active")) {
        document.getElementById("kat-add-container").classList.toggle("active");
        document.getElementById("kat-edit-container").classList.toggle("active");
        document.getElementById("edit-kat").classList.toggle("active");
        document.getElementById("add-kat").classList.remove("active");
    }
}

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
    });
}
/**
 * Funtzioak PUT eskaera egiten dio zerbitzariari kategoria bat editatzeko. Inprimakiko datuak lortzen ditu.
 * Eragiketaren ondoren, uneko orrira birbideratzen du, eta alerta bat erakusten du, lortutako erantzunaren arabera.
 */
function kategoria_editatu() 
{
    idkat = document.getElementById("kat-edit").value;
    izena = document.getElementById("kat-input-edit").value;
    data = {"id":idkat,"izena":izena};
    DataJson = JSON.stringify(data);
    let options = {method: "PUT", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
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
            alert("Kategoria eguneratu da")
        }
    });
}
/**
 * Funtzioak DELETE eskaera egiten dio zerbitzariari kategoria bat ezabatzeko. Ezabatu beharreko kategoriaren IDa lortzen du.
 * Eragiketaren ondoren, uneko orrira birbideratzen du, eta alerta bat erakusten du, lortutako erantzunaren arabera.
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
 * Funtzioak POST eskaera egiten dio zerbitzariari kategoria berri bat gehitzeko.
 * Inprimakiko datuak lortzen ditu eta hautatutako egiaztapen-laukian oinarritutako kategoria-mota definitzen du.
 * Eragiketaren ondoren, uneko orrira birbideratzen du, eta alerta bat erakusten du, lortutako erantzunaren arabera.
 */
function kategoria_gehitu() 
{
    var izena = document.getElementById("kat-berria").value;
    var inb;
    if(document.getElementById("inb-input").checked){
        inb = 1;
    }else{
        inb = 0;
    }
    data = {"izena":izena,"inb":inb};
    DataJson = JSON.stringify(data);
    let options = {method: "POST", mode: 'cors', body:DataJson, header:"Content-Type: application/json; charset=UTF-8"};
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
            alert("Kategoria gehitu da")
        }
    });
}
/**
 * Balidazioen erroreak komprobatzen ditu funtzioa 
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
 * Deskribapenaren atala baliozkatzen duen funtzioa.
 * Atala hutsiko badago, mezu bat botako du.
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
 * Markaren atala baliozkatzen duen funtzioa.
 * Atala hutsiko badago, mezu bat botako du.
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
 * Modeloaren atala baliozkatzen duen funtzioa.
 * Atala hutsiko badago, mezu bat botako du.
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
 * Deskribapenaren atala baliozkatzen duen funtzioa.
 * Atala hutsiko badago, mezu bat botako du.
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

function stock_bistaratu() {
    if (document.getElementById("kategoria").value != "1" && document.getElementById("kategoria").value != "2") {
        document.getElementById("stck").hidden = false;
    }else{
        document.getElementById("stck").hidden = true;
    }
}
