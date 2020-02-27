///////////////////////////////////////////////////////////////////////
//////////////////////Datos para la Identificaciones///////////////////
///////////////////////////////////////////////////////////////////////

//Parametros que se necesitan para funcionar con la base de Datos (requiero y la instancio)
const { app } = require("electron").remote;
const path = require("path");
const Database = require("better-sqlite3");
const dbFile = path.join(app.getAppPath(), "db.sqlite");
const db = new Database(dbFile);

///Parametros de configuración del ejercicio que pase por el json
const datosejercicio=JSON.parse(localStorage.getItem("configConceptos")); 
const concepto=datosejercicio.concepto; //contiene los datos del concepto
const alumno=datosejercicio.alumno; //contiene los datos del alumno
const dificultad=datosejercicio.dificultad;
const tipoimagen=obtenerLinkImagen(datosejercicio.tipoimagen);
let cantidadDistractores=0; //por defecto 0 , se le asiga el valor en ejecucion

///Parametros que voy a utilizar durante el ejercicio
//let palabrasEjercitadas=[]; //Array que va a contener todas las palabras ejercitadas durante el ejercicio
var faseActual=1; //seteo la faseactual en la fase inicial
var nroFase=1; //seteo la fase en 1 para iniciar
let target=concepto.concepto; //fijo mi concepto como target
let cantidadAciertos=0; //cuento la cantidad de aciertos
console.log(datosejercicio);
let Pasos = ["¿Que es?","¿Quien es?","¿Que Hace?","¿Como es?"]; //contiene las 3 etapas del ejercicio
let IDS=["que_es","quien_es","que_hace","como_es"]; //contiene los IDS de los divs que se utilizan del HTML 
let TEXTOS=[" ","  "," "," "]; //se pone el mensaje para el ejercicio aca
const Swal = require("sweetalert2");

iniciarEjercicio(); //damos por iniciado el ejercicio
//avazarEtapa(0);



//////////////////////////////////////////////////////////////////////////////////////
//////////////Funciones que le dan la funcionalidad al ejercicio//////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//Funcion que Inicia el ejercicio
function iniciarEjercicio(){
    //Segun la dificultad seteo la cantidad de distractores
    if(dificultad=="default"){
     cantidadDistractores=1;
    }
    if (dificultad=="baja") {     
     cantidadDistractores=1;
    }   
    if (dificultad=="media") {     
     cantidadDistractores=2;
    }
    if (dificultad=="alta") {     
     cantidadDistractores=3;
    }
 generarBloque(faseActual);    
}


//Funcion que se encarga de generar las imagenes correspondientes a la Fase del ¿Que es?
function generarImagenes (concepto,cantidadDistractores) {
 faseActual=parseInt(document.getElementById("fase").innerHTML)+parseInt(1);
 //Se crea el mensaje del ejercicio
 let divActual= IDS[parseInt(faseActual)-parseInt(1)];  
 var mensajeFase= "Etapa <span id ='fase'>"+faseActual+"</span> "+Pasos[parseInt(faseActual)-parseInt(1)];
 document.getElementById("ejercitacion_paso").innerHTML=mensajeFase; //Imprimo el mensaje superior informando la fase actual
 palabrasFase=obtenerPalabras(faseActual); //obtengo el Array con las palabras 
 let divFase = document.getElementById(divActual); //Me posiciono en el ID de la fase actual del ejercicio
 let textoPaso=TEXTOS[parseInt(faseActual)-parseInt(1)]; //Me traigo el mensaje de Informacion superior correspondiente al paso
 //creo el texto indicativo correspondiente a dicho paso actual
 let p = document.createElement("p");
 p.setAttribute("class","indicativo");
 let p_contenido= document.createTextNode(textoPaso+target);
 p.appendChild(p_contenido); 
 divFase.appendChild(p);    

 //genero el contenido de las imagenes
 let pasoFase = document.getElementById("quien_es");
 let claseDiv ="col s"; //por defecto les voy a poner un tamaño de columna de 5
 let conceptos= []; //almaceno los conceptos tando el verdadero como los falsos en un array
 conceptos[0] = concepto.quien_es[0]; //Concepto acertado
 //palabrasEjercitadas.push(conceptos[0]); //agrego las palabras al listado de palabras ejercitadas

  //Defino y cargo los conceptos distractores
  for (let index = 1; index <= cantidadDistractores; index++) {
     conceptos[index]=concepto.quien_no_es[parseInt(index)-parseInt(1)]; //cargo los conceptos distractores
     //palabrasEjercitadas.push(conceptos[index]); //agrego las palabras al listado de palabras ejercitadas
    }

    //Dependiendo de la cantidad de distractores voy a definir el estilo (si son pocos hago imagenes mas grandes)
    if (cantidadDistractores > 1) {
     claseDiv ="clasediv col s";
    }
    else {
     claseDiv ="clasediv col s";
    }

 //palabrasEjercitadas.push(concepto[0]); //Agrego el concepto a ejercitar en mi array posterior para los resultados
 var centerDiv=document.createElement("div"); //creo un center para meter dentro las imagenes y que quede ordenado
 centerDiv.setAttribute("class","col s  contenedorImagenes");

 //Creo el DIV que contiene la opcion correcta
 let divCorrecto=document.createElement("div"); 
 divCorrecto.setAttribute("class",claseDiv);  

 let imagenCorrecta= document.createElement("img"); //Imagen 1 es la opcion correcta 
 imagenCorrecta.setAttribute("class","material");

 imagenCorrecta.src=link_imagen+conceptos[0]+".jpg";
 imagenCorrecta.addEventListener("click", opcionCorrecta );
 divCorrecto.appendChild(imagenCorrecta);
 centerDiv.appendChild(divCorrecto);

 ////////////////////////////////////////////////
 //Creo los Divs necesarios para los distractores
    for (let index = 1; index <= cantidadDistractores; index++) {
     //Creacion de las "index" cantidad de imagenes incorrectas
     let div=document.createElement("div");
     div.setAttribute("class",claseDiv);

     
    
     let imagen=document.createElement("img");
     imagen.setAttribute("class","material");
  
     imagen.src=link_imagen+conceptos[index]+".jpg";
     imagen.addEventListener("click", opcionIncorrecta );  
     div.appendChild(imagen); //este es nuestro div para dicha opcion incorrecta  

     //Le vamos a dar aleatoreidad al ejercicio
     let aleatorio1=Math.random();
     let aleatorio2=Math.random();
        if (aleatorio1<aleatorio2) {
         centerDiv.insertBefore(div,divCorrecto); //inserta antes del divCorrecto 
        }
        else {        
         centerDiv.appendChild(div); //inserta despues del divCorrecto
        }    
    }
 pasoFase.appendChild(centerDiv); //inserto el DIV con las imagenes
}
 
//Funcion que la utilizo para avanzar un nuevo paso
function avanzarEtapa(nroFase){
 let nroFaseActual= parseInt(nroFase)+parseInt(1); 
 let FaseActual=IDS[parseInt(nroFase)];
 let fasePrevia=IDS[parseInt(nroFase)-parseInt(1)]; 
 document.getElementById(fasePrevia).setAttribute("class","oculto");  
    //Si es el quien es lo mando a las opciones de las imagenes
    if (FaseActual=="quien_es") {
      generarImagenes(concepto,cantidadDistractores);      
    } 
    else { 
     generarBloque(nroFaseActual); //invoco a la funcion que genera el bloque 
    }
} 

//Funcion que se encarga de generarme el bloque de codigo de cada fase
function generarBloque(faseActual) {   
    if (faseActual > 4) {
    
     location.href = "festejofinal.html";
     //finEjercicio(); //Me dirigo a terminar el ejercicio
    }
    else {
     let divActual= IDS[parseInt(faseActual)-parseInt(1)];         
     var mensajeFase= "Etapa <span id ='fase'>"+faseActual+"</span> "+Pasos[parseInt(faseActual)-parseInt(1)];
     document.getElementById("ejercitacion_paso").innerHTML=mensajeFase; //Imprimo el mensaje superior informando la fase actual
     palabrasFase=obtenerPalabras(faseActual); //obtengo el Array con las palabras 
     let divFase = document.getElementById(divActual); //Me posiciono en el ID de la fase actual del ejercicio
     let textoPaso=TEXTOS[parseInt(faseActual)-parseInt(1)]; //Me traigo el mensaje de Informacion superior correspondiente al paso
     //creo el texto indicativo correspondiente a dicho paso actual
     let p = document.createElement("p");
     p.setAttribute("class","indicativo");
     let p_contenido= document.createTextNode(textoPaso+target);
     p.appendChild(p_contenido); 
     divFase.appendChild(p);    

     //Generacion de los botones con las opciones
     generarOpciones(divFase,palabrasFase,cantidadDistractores); //invoco a la funcion que me va a generar todos los botones para interactuar
    }
}

//Funcion que la defino para poder generar los botones con las opciones correspondientes a cada Fase
function generarOpciones(divFase,palabrasFase,cantidadDistractores) { 
 let array_correcto = palabrasFase[0]; //contiene las opciones correctas
 let array_incorrecto=palabrasFase[1]; //contiene las opciones incorrectas
 //Creamos numeros aleatorios para seleccionar al azar los elementos de los arrays
 var aleatorioCorrecto = Math.floor(Math.random()*(parseInt(parseInt(array_correcto.length)-1)+1));
 //Crear el boton de la opcion correcta
 var centerDiv=document.createElement("center");
 var aButtonCorrecto=document.createElement("button");
 aButtonCorrecto.className="teal lighten-3 separarBotones";
 aButtonCorrecto.addEventListener("click",function(){opcionCorrecta()},false); //llamo a la funcion al clickear
 var aButtonCorrectoContent=document.createTextNode(array_correcto[aleatorioCorrecto]);
 aButtonCorrecto.appendChild(aButtonCorrectoContent); 
 centerDiv.appendChild(aButtonCorrecto); //Le agrego la opcion correcta a mi DIV personalizado
 //palabrasEjercitadas.push(array_correcto[aleatorioCorrecto]); //almaceno la palabra ejercitada

 //Creamos un Array de numeros aleatorios que no se repitan entre 0 y la cantidad necesaria de distractores
 let aleatoriosRequeridos=[];
 generarAleatorios(aleatoriosRequeridos,'0',cantidadDistractores);

 //Creamos los botones para las opciones incorrectas
    for (let index = 1; index <= cantidadDistractores; index++) {     
     let opcionSeleccionadaAleatoria = aleatoriosRequeridos[index-1];    
     let aButton=document.createElement("button");
     aButton.className="teal lighten-3 separarBotones";
     aButton.addEventListener("click",function(){opcionIncorrecta()},false); //llamo a la funcion al clickear
     var aButtonContent=document.createTextNode(array_incorrecto[opcionSeleccionadaAleatoria]); //esto deberia ser aleatorio
     aButton.appendChild(aButtonContent);       
     centerDiv.appendChild(aButton);  
     //palabrasEjercitadas.push(array_incorrecto[opcionSeleccionadaAleatoria]); //almaceno la palabra ejercitada
     //Le vamos a dar aleatoreidad al ejercicio
     let aleatorio1=Math.random();
     let aleatorio2=Math.random();
        if (aleatorio1<aleatorio2) {
         centerDiv.insertBefore(aButton,aButtonCorrecto); //inserta antes del aButtonCorrecto (opcion correcta)
        }
        else {        
         centerDiv.appendChild(aButton); //inserta despues del aButtonCorrecto (opcion correcta)
        }    
    }
 divFase.appendChild(centerDiv); //Agrego mi DIV con las opciones en el DIV de la Fase del ejercicio 
}

//Funcion que voy a crear para poder definir mi array de palabras
function obtenerPalabras(faseActual){
 //Defino el listado con las palabras para cada Fase
    if (faseActual=="1") {     
     var palabrasFase= [];
     palabrasFase[0]=concepto.que_es;
     palabrasFase[1]=concepto.que_no_es;     
    }
    if (faseActual=="2") {   
     var palabrasFase= [];  
     palabrasFase[0]=concepto.quien_es;
     palabrasFase[1]=concepto.quien_no_es;
    }
    if (faseActual=="3") {   
     var palabrasFase= [];  
     palabrasFase[0]=concepto.que_hace;
     palabrasFase[1]=concepto.que_no_hace;
    }
    if (faseActual=="4") {  
    var palabrasFase= [];    
     palabrasFase[0]=concepto.como_es;
     palabrasFase[1]=concepto.como_no_es;
    }
  return palabrasFase; //retorna el array de las palabras
}


//Funcion que activa si selecciono bien
function opcionCorrecta() {
    //alert("Opcion correcta"); 
    var nroFase= document.getElementById("fase").innerHTML; 
    cantidadAciertos++;
   
    aciertoEjercicio();
   setTimeout(function(){ avanzarEtapa(nroFase);  }, 1000); //espero 1seg para avanzar
}

//Funcion que activa si selecciono mal
function opcionIncorrecta() {
    //alert("Opcion Incorrecta");
    var nroFase= document.getElementById("fase").innerHTML;   
    errorEjercicio();
    //avanzarEtapa(nroFase);
}

//Funcion que le paso el tipo de imagen y me retorna la URL para el tipo de imagen solicitada
function obtenerLinkImagen(tipoimagen) {
    if (tipoimagen=="animada") {
      return link_imagen="../public/images/conceptos/animados/"; //le doy la ruta de las imagenes animadas
    } 
    else {
     return link_imagen="../public/images/conceptos/reales/"; //le doy la ruta de las imagenes reales
    }
}

//Funcion que retorna un numero aleatorio entre un minimo y un maximo
function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Funcion donde le paso un Array , un minimo y un max y me retorna un Array de numeros sin repetir al azar entre el min y max
function generarAleatorios(aleatoriosRequeridos,min,max) { 
 var rept = 0;
 var end = 0;
    while (rept != -1){
        for(var i=1 ; i<= max ; i++){
         var numaleatorio = Math.floor(Math.random() * (max+1));
            if (aleatoriosRequeridos.indexOf(numaleatorio) < 0 && numaleatorio != 0) {
             aleatoriosRequeridos.push(numaleatorio);
             end++;
            }
         end == max ? rept = -1 : false ;
        }
    }
    
    //A cada numero generado le resto 1, para que no exista un numero que me genere un overflow en el array 
    for (let index = 0; index < aleatoriosRequeridos.length; index++) { 
      aleatoriosRequeridos[index]=parseInt(aleatoriosRequeridos[index])-parseInt(1);
    }    
    return aleatoriosRequeridos; //retorno mi array con los numeros aleatorios
 }

//Funcion que activa la animacion cuando hay un acierto en el ejercicio
function aciertoEjercicio(){
 const arrayAciertos = ["¡Muy bien!", "¡Excelente!", "¡Bravo!", "¡Grandioso!", "¡Estupendo!", "¡Fantastico!"];
 const singleacierto = arrayAciertos[Math.floor(Math.random() * arrayAciertos.length)];
 Swal.fire({
     imageUrl: "../public/images/Felicitaciones.png",
     width: 400,
     imageWidth: 200,
     imageHeight: 300,
     background: "#e4f2f0",
     title: singleacierto,
     showConfirmButton: false,
     timer: 1000
    });
}

//Funcion que activa la animacion cuando hay un error en el ejercicio
function errorEjercicio() {
 const arrayerror = ["¡Intentalo otra vez!", "¡Intentalo nuevamente!", "¡Una vez mas, tu puedes hacerlo!"];
 const singlerror = arrayerror[Math.floor(Math.random() * arrayerror.length)];
 Swal.fire({
     imageUrl: "../public/images/otravez.png",
     width: 400,
     imageWidth: 200,
     imageHeight: 300,
     background: "#e4f2f0",
     title: singlerror,
     showConfirmButton: false,
     timer: 1000
    });
}

//Funcion que una vez terminado el ejercicio , genera el JSON con el listado de palabras ejercitadas y datos del alumno
function finEjercicio() {
 //palabrasEjercitadas = palabrasEjercitadas.filter(Boolean); //elimino elementos null (si hay alguno)
 //let palabrasEjercitadas_new = [...new Set(palabrasEjercitadas)]; //elimino los elementos repetidos
 //alert("Termina el ejercicio con "+cantidadAciertos+" de 3 aciertos posibles");
  
 //Concepto ejercitado y ID del estudiante a guardar el resultado
 let conceptoEjercitado=concepto.concepto;
 let idEstudiante=alumno.id;
 let idPalabra=" "; //es un valor referencial , despues toma valor verdadero

 //Busco EL CONCEPTO TRABAJADO EN LA TABLA DE PALABRAS PARA OBTENER EL IDPALABRA (ASI TRABAJA MODULO RESULTADOS DE ALAN)
 let listadoPalabras=db.prepare("SELECT * FROM palabras").all();
 //Recorro entre todas las palabras y me quedo con la ID que necesito
    for (let index=0; index < listadoPalabras.length; index++) {
        if (listadoPalabras[index].palabra==conceptoEjercitado) {
          idPalabra=listadoPalabras[index].id; //obtengo el ID de mi palabra buscada
        }    
    }

    //SI EL CONCEPTO QUE TRABAJE EXISTE EN LA TABLA PALABRAS , ENTONCES INSERTO RESULTADO EN LA BD
    if (idPalabra!==" ") {
     //Inserto el Resultado el ID del alumno 
     const queryEstudiante = db.prepare("INSERT INTO RESULTADOS (id_estudiante, fecha) VALUES (?, datetime('now', 'localtime'))");
     const infoEstudiante = queryEstudiante.run(idEstudiante);
     let idUltimoResultado = infoEstudiante.lastInsertRowid; //tomo el ID para saber cual ID para insertar el resultad
    
     //Inserto la palabra (concepto ejercitado) en la tabla Resultados palabras
     const queryResultados = db.prepare("INSERT INTO resultadosPalabras (id_resultado, id_palabra) VALUES (?, ?)");
     const infoResultado = queryResultados.run(idUltimoResultado,idPalabra); //inserto el ID de la palabra
    }

 //Creo el JSON para mostrar los resultads del ejercicio
 localStorage.setItem("resultadosConceptos", JSON.stringify({alumno:alumno,concepto:concepto}));
 setTimeout(function(){ location.href = "configuracionConceptos.html";}, 1500);
 //Debo realizar el INSERT EN LA BD CON LOS RESULTADOS DEL EJERCICIO 
}