let paso = 1

document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
})

function iniciarApp(){
    mostrarSeccion(); // <- Muestra y oculta las secciones
    tabs(); // <- Cambia la sección cuando se presionen los tabs
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
        })
    } )
}