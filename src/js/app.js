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

        console.log(servicioDiv);


    });
}

function seleccionarServico(servicio){
    const {servicios} = cita;
    const {id} = servicio;

    // Creamos una cópia del array de servicios y agregamos el nuevo servicio seleccioando
    cita.servicios = [...servicios, servicio] 

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`)
    divServicio.classList.add('seleccionado')
    console.log(cita)
}