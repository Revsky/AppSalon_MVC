let paso = 1

const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre:'',
    fecha:'',
    hora:'',
    servicios:[]
}

document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
})

function iniciarApp(){
    mostrarSeccion(); // <- Muestra y oculta las secciones
    tabs(); // <- Cambia la sección cuando se presionen los tabs
    botonesPaginador(); // <- Agrega o quita los botones del paginador

    paginaSiguiente();
    paginaAnterior();

    idCliente();
    nombreCliente() // <-- Obtenemos el nombre del cliente
    seleccionarFecha() // <-- Obtiene la fecha
    seleccionarHora()
    mostrarResumen()


    consultarAPI(); // <- Consulta la api en el backend de php
}
function mostrarSeccion(){

    // Ocultar la seccion que tenga la clase mostrar
    const seccionAnterior = document.querySelector('.mostrar') // <- el . para seleccionar clases es necesario solo para ql querySelector
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar')

    }
    
    // Seleccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}` //<- Podemos usar template string para fucionar HTML + PHP
    const seccion = document.querySelector(pasoSelector);

    seccion.classList.add('mostrar')

    // Quita la clase actual al tab anterior
    const tabAnterior = document.querySelector('.actual')
    if(tabAnterior){
        tabAnterior.classList.remove('actual')
    }

    // Resalta el tab actual
    /// El selector usa [] dado que la propiedad del tag HTML es una propiead personal, es decir, no existe en HTML tal cual si no que nosotros la hemos integrado
    const tab = document.querySelector(`[data-paso="${paso}"]`) // data-paso = 1 or 2 or 3
    tab.classList.add('actual')

}


function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    
    botones.forEach( (boton) =>{
        boton.addEventListener('click',(event)=>{
            paso = parseInt(event.target.dataset.paso)

            mostrarSeccion();
            botonesPaginador();
            mostrarResumen()
        })
    } )
}

function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');
    console.log(paso)
    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar')
    }else if(paso === 3){
        
        paginaSiguiente.classList.add('ocultar')
        paginaAnterior.classList.remove('ocultar');
        
    }else{
        paginaSiguiente.classList.remove('ocultar')
        paginaAnterior.classList.remove('ocultar');
    }

    mostrarSeccion();
    
}

function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click',()=>{
        if(paso <= pasoInicial) return;

        paso--;
        botonesPaginador();
    })
}

function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click',()=>{
        if(paso >= pasoFinal) return;

        paso++;
        botonesPaginador();
    })

}

// Esta funcion al ser aincrona puede permitir ejecutar el resto del código aunque la tarea de esta funcion no termine, es como un hilo
async function consultarAPI(){
    
    try {
        const url = 'http://localhost:8000/api/servicios';
        // Await viene acompañado de async, y se encarga de esperara hasta que la peticion termine por completo, en este caso el fetch
        const resultado = await fetch(url)
        const servicios = await resultado.json();

        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        const {id,nombre,precio} = servicio;
        
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;
        

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$ ${precio}` ;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio')
        // permite generar un set personalizado que en automatico asigna el id a la propiedad generada
        servicioDiv.dataset.idServicio = id;

        // Podemos agregar una función directamente al div para que se ejecute cada que haya un click, sin necesidad de integrar un listener
        /// servicioDiv.onclick = seleccionarServico;
        
        // Cambiamos a esta sintaxis para que mandemos argumentos a ala funcion asociadam ya que si solamente agregamos seleccionarServicio() <- se ejecutara la funcion en automatico
        servicioDiv.onclick = function(){
            seleccionarServico(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio); 

        document.querySelector("#servicios").appendChild(servicioDiv)

        //console.log(servicioDiv);


    });
}

function seleccionarServico(servicio){
    const {id} = servicio;
    const {servicios} = cita;
    const divSericio = document.querySelector(`[data-id-servicio="${id}"]`)

    // Comprobar si un sercicio ya fue agregado
    if( servicios.some( agregado => agregado.id === id) ){
        // Eliminar si ya esta agregado

        // Elimina un elemento cuyo id sea difernet al seleccianado
        cita.servicios = servicios.filter( agregado => agregado.id !== id )
        divSericio.classList.remove('seleccionado')
    }else{
        // Creamos una cópia del array de servicios y agregamos el nuevo servicio seleccioando
        cita.servicios = [...servicios, servicio] 
        divSericio.classList.add('seleccionado')
    }   

    //console.log(cita)
}

function nombreCliente(){
    const nombre = document.querySelector("#nombre").value

    cita.nombre = nombre
}
function idCliente(){
    const id = document.querySelector("#id").value
    cita.id = id
}
function seleccionarFecha(){
    const inputFecha = document.querySelector("#fecha")
    inputFecha.addEventListener('input',function(event){

        // Devuelve los dias de la semana del 0 al 6 siendo 0 Domingo
        const dia = new Date(event.target.value).getUTCDay()


        if([6,0].includes(dia)){
            event.target.value = ""
            mostrarAlerta('Fines de Semana no permitidos','error','#paso-2 p');
        }else{
            cita.fecha = event.target.value
        }
        
    })
}

function seleccionarHora(){
    const inputHora = document.querySelector("#hora")
    inputHora.addEventListener('input', function(event){
       

        const horaCita = event.target.value;
        const hora = horaCita.split(":")[0]
        
        

        if(hora < 10 || hora > 18){
            event.target.value = ""
            mostrarAlerta('Horas No Validas','error','#paso-2 p')
        }else{
            
            cita.hora = event.target.value
           
        }
    })
}

function mostrarAlerta(mensaje,tipo,elemento,desaparece =true){

    // previenen que se genere más de una alerta y nos pemrite mostrar nuevas alertas
    const alertaPrevia = document.querySelector('.alerta')
    if(alertaPrevia){
        alertaPrevia.remove() 
    }

    const alerta = document.createElement('DIV')
    alerta.textContent = mensaje
    alerta.classList.add('alerta')
    alerta.classList.add(tipo)

    const referencia = document.querySelector(elemento)
    referencia.appendChild(alerta)

    if (desaparece){
        setTimeout(() =>{
            alerta.remove()
        },3000)
    }
    
}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen')

    // Limpiar el contenido de resumen cada que se llama, para que cuanso seleccionemos todos los campos se actualize
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }


    if(Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('Faltan datos de servicio, fecha u hora','error','.contenido-resumen')
    }

    // Formatear el div de resumen
    const {nombre,fecha,hora,servicios} = cita

    
    // Heading para servicios
    const headingServicios = document.createElement('H3')
    headingServicios.textContent = 'Resumen de Servicios'

    resumen.appendChild(headingServicios)

    // Servicio

    servicios.forEach(servicio => {

        const {id,precio,nombre} = servicio

        const contenedor = document.createElement('DIV')
        contenedor.classList.add('contenedor-servicio')

        const textoServicio = document.createElement('P')
        textoServicio.textContent = nombre

        const precioServicio = document.createElement('P')
        precioServicio.innerHTML = `<span>Precio:</span>$${precio}`

        contenedor.appendChild(textoServicio)
        contenedor.appendChild(precioServicio)

        resumen.appendChild(contenedor)
    })

     // Heading para Cita
     const headingCita = document.createElement('H3')
     headingCita.textContent = 'Resumen de Cita'
 
     resumen.appendChild(headingCita)

    const nombreCliente = document.createElement('P')
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`

    // Formatear la fecha en español
    // Cada que utilicemos new Date temos un desface de un dia menos al de la fecha solicitada
    const fechaObj = new Date(fecha) // <- creamos un nuevo objeto fecha a partir del texto fecha que devuelve el input
    const mes = fechaObj.getMonth()
    const dia = fechaObj.getDate() + 2 // <- Corregimos el desface
    const year = fechaObj.getFullYear();

    // En este punto ya serian -2 días

    const fechaUTC = new Date(Date.UTC(year,mes,dia)) // <- generamos una fecha unix

    // Este formato solo funciona con objetos DATE por ellos realizamos todas las fases anteriores, la funcion toLocaleString devuelve una fecha en un idioma en especifico
    const opciones = {weekday:'long',year:'numeric',month:'long',day:'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX',opciones)

    console.log(fechaFormateada)
    const fechaCita = document.createElement('P')
    fechaCita.innerHTML = `<span>Fecha:</span> ${fecha}`

    const horaCita = document.createElement('P')
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`

    // Boton para crear una cita

    const botonReservar = document.createElement('BUTTON')
    botonReservar.classList.add('boton')
    botonReservar.textContent = "Reservar"
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente)
    resumen.appendChild(fechaCita)
    resumen.appendChild(horaCita)

    resumen.appendChild(botonReservar)

    
}

async function reservarCita(){

    /* Consultando FetchAPI */
    const datos = new FormData()
    

    /* Peticion API */
    const url = 'http://localhost:8000/api/citas'
    /* Cuando realizamos una petición post es necesario indicarlo con el parametro method */
    /* Usamos body para indicar a fetch que existe el formdata y que envie esa informacion */
    const respuesta = await fetch(url,{
        method:'POST',
    })

    const resultado = await respuesta.json()
    console.log("resultado:",resultado)

    /* Podemos usar la sintaxis de [..datos] para poder ver lo que almacena el objeto, ya que directamente no nos permite verlo */
    /*console.log([...datos])*/
}