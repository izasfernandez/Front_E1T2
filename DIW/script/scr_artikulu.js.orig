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
 * La funcion genera la estructura HTML para mostrar información de artículos recibida como respuesta a una solicitud POST.
 * El programa crea elementos HTML (imagen, título, descripción, enlace) para cada artículo y los agrega a la estructura de la página para su visualización.
 * @param {Object} response - La respuesta que contiene la información de los artículos.
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
 * La funcion obtiene la información de los artículos mediante una solicitud GET al servidor.
 * Limpia el contenido previo de la sección 'artikuluak' y luego utiliza la función 'artikulu_formatua_get' para generar la estructura HTML y mostrar la información de los artículos en la página.
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
 * La funcion filtra los artículos en función de los criterios proporcionados por el usuario.
 * El programa borra el contenido previo de la sección 'artikuluak' y realiza una solicitud POST al servidor con los parámetros de filtrado. Utiliza la respuesta obtenida para generar y mostrar la estructura HTML con los artículos filtrados.
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
 * La funcion carga las opciones de las marcas de los artículos desde el servidor y las muestra como checkboxes en la interfaz.
 * El programa realiza una solicitud GET al servidor para obtener la información de las marcas.
 * El programa genera checkboxes correspondientes a cada marca obtenida y las muestra en la interfaz.
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
 * La funcion obtiene las marcas seleccionadas por el usuario a través de checkboxes en la interfaz.
 * Busca todos los elementos HTML con la clase 'marka_checkbox', verifica cuáles están marcados y devuelve un array con los valores de las marcas seleccionadas.
 * @returns {array} - Un array con las marcas seleccionadas por el usuario.
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
 * La funcion establece eventos de click en los elementos de filtro de categorías.
 * Busca todos los elementos HTML con la clase 'kategoria_filtro' y, si existen, les asigna un evento de click que llama a la función 'kategoriaz_filtratu' cuando se hace clic.
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
 * La funcion carga las categorías desde el servidor y las muestra en la interfaz.
 * El programa realiza una solicitud GET al servidor para obtener la información de las categorías.
 * El programa genera elementos HTML correspondientes a cada categoría obtenida y los muestra en la interfaz.
 * Además, agrega opciones a un combobox y un conjunto de opciones para la edición de categorías.
 * El programa llama a la función 'kategoria_event()' para establecer eventos en las categorías cargadas.
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
 * La funcion verifica y elimina el filtro activo de categorías.
 * El programa busca todos los elementos HTML con la clase 'kategoria_filtro' y verifica si alguno de ellos tiene la clase 'active'.
 * Si encuentra un elemento con la clase 'active', obtiene su identificador y llama a la función 'kategoriaz_filtratu()' para eliminar el filtro de esa categoría.
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
 * La funcion filtra los artículos por una categoría específica.
 * @param {string} id - El identificador de la categoría por la que se filtrarán los artículos.
 * Obtiene todos los elementos con la clase 'kategoria_filtro' y elimina la clase 'active' de cada uno.
 * El programa agrega la clase 'active' al elemento correspondiente a la categoría seleccionada.
 * El programa realiza una solicitud al servidor para obtener los artículos de la categoría seleccionada y actualiza la lista de artículos.
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
 * La funcion actualiza la información de un artículo existente.
 * Obtiene los datos del artículo a partir de los elementos del DOM.
 * El programa realiza una solicitud PUT al servidor para actualizar la información del artículo.
 * Si no hay errores en la verificación, se realiza la solicitud y se actualiza la página.
 * En caso de error, el programa muestra un mensaje de alerta.
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
 * La funcion elimina un artículo existente mediante una solicitud DELETE al servidor.
 * Obtiene el ID del artículo a eliminar.
 * Realiza una solicitud DELETE al servidor y redirige a la página de lista de artículos.
 * Muestra un mensaje de alerta dependiendo de la respuesta del servidor.
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
 * La funcion elimina un artículo existente mediante una solicitud DELETE al servidor.
 * Obtiene el ID del artículo a eliminar.
 * El programa realiza una solicitud DELETE al servidor y redirige a la página de lista de artículos.
 * El programa muestra un mensaje de alerta dependiendo de la respuesta del servidor.
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
 * La funcion alterna la clase 'active' en los elementos 'kat-editatu' y 'kat-edit-container', mostrando u ocultando su contenido.
 */
function kat_edit_open() {
    document.getElementById("kat-editatu").classList.toggle("active");
    document.getElementById("kat-edit-container").classList.toggle("active");
    kategoria_karga_editatzeko();
}
/**
 * La funcion muestra el contenedor 'kat-add-container' y oculta 'kat-edit-container', alterna las clases 'active' en 'edit-kat' y 'add-kat'.
 * Se asegura de que solo un contenedor esté activo a la vez.
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
 * La funcion muestra el contenedor 'kat-edit-container' y oculta 'kat-add-container', alterna las clases 'active' en 'edit-kat' y 'add-kat'.
 * Se asegura de que solo un contenedor esté activo a la vez.
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
 * La funcion realiza una solicitud PUT al servidor para editar una categoría. Obtiene los datos del formulario.
 * Redirige a la página actual después de la operación y muestra una alerta según la respuesta obtenida.
 */
function kategoria_editatu() 
{
    idkat = document.getElementById("kat-edit").value;
    izena = document.getElementById("kat-input-edit").value;
<<<<<<< HEAD
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
=======
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
>>>>>>> secondary
}
/**
 * La funcion realiza una solicitud DELETE al servidor para eliminar una categoría. Obtiene el ID de la categoría a eliminar.
 * Redirige a la página actual después de la operación y muestra una alerta según la respuesta obtenida.
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
 * La funcion realiza una solicitud POST al servidor para agregar una nueva categoría.
 * Obtiene los datos del formulario y define el tipo de categoría basado en la casilla de verificación seleccionada.
 * Redirige a la página actual después de la operación y muestra una alerta según la respuesta obtenida.
 */
function kategoria_gehitu() 
{
    var izena = document.getElementById("kat-berria").value;
    var inb;
<<<<<<< HEAD
    if (!konprobatu_erroreak_art_txertatu()) {
        if(document.getElementById("inb-input").checked){
            inb = 1;
=======
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
>>>>>>> secondary
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
