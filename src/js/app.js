let paso = 1

document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
})

function iniciarApp(){
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