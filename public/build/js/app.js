let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),nombreCliente(),seleccionarFecha(),consultarAPI()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const o="#paso-"+paso;document.querySelector(o).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()})})}function botonesPaginador(){const e=document.querySelector("#siguiente"),o=document.querySelector("#anterior");console.log(paso),1===paso?(o.classList.add("ocultar"),e.classList.remove("ocultar")):3===paso?(e.classList.add("ocultar"),o.classList.remove("ocultar")):(e.classList.remove("ocultar"),o.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{paso<=1||(paso--,botonesPaginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{paso>=3||(paso++,botonesPaginador())})}async function consultarAPI(){try{const e="http://localhost:8000/api/servicios",o=await fetch(e);mostrarServicios(await o.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:o,nombre:t,precio:c}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=t;const n=document.createElement("P");n.classList.add("precio-servicio"),n.textContent="$ "+c;const s=document.createElement("DIV");s.classList.add("servicio"),s.dataset.idServicio=o,s.onclick=function(){seleccionarServico(e)},s.appendChild(a),s.appendChild(n),document.querySelector("#servicios").appendChild(s),console.log(s)})}function seleccionarServico(e){const{id:o}=e,{servicios:t}=cita,c=document.querySelector(`[data-id-servicio="${o}"]`);t.some(e=>e.id===o)?(cita.servicios=t.filter(e=>e.id!==o),c.classList.remove("seleccionado")):(cita.servicios=[...t,e],c.classList.add("seleccionado")),console.log(cita)}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const o=new Date(e.target.value).getUTCDay();[6,0].includes(o)?(e.target.value="",mostrarAlerta("Fines de Semana no permitidos","error")):console.log("correcot")}))}function mostrarAlerta(e,o){if(document.querySelector(".alerta"))return;const t=document.createElement("DIV");t.textContent=e,t.classList.add("alerta"),t.classList.add(o);document.querySelector("#paso-2 p").appendChild(t),setTimeout(()=>{t.remove()},3e3)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));