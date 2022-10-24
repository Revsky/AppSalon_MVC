let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen(),consultarAPI()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const o="#paso-"+paso;document.querySelector(o).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador(),mostrarResumen()})})}function botonesPaginador(){const e=document.querySelector("#siguiente"),o=document.querySelector("#anterior");console.log(paso),1===paso?(o.classList.add("ocultar"),e.classList.remove("ocultar")):3===paso?(e.classList.add("ocultar"),o.classList.remove("ocultar")):(e.classList.remove("ocultar"),o.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{paso<=1||(paso--,botonesPaginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{paso>=3||(paso++,botonesPaginador())})}async function consultarAPI(){try{const e="http://localhost:8000/api/servicios",o=await fetch(e);mostrarServicios(await o.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:o,nombre:t,precio:a}=e,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=t;const n=document.createElement("P");n.classList.add("precio-servicio"),n.textContent="$ "+a;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=o,r.onclick=function(){seleccionarServico(e)},r.appendChild(c),r.appendChild(n),document.querySelector("#servicios").appendChild(r),console.log(r)})}function seleccionarServico(e){const{id:o}=e,{servicios:t}=cita,a=document.querySelector(`[data-id-servicio="${o}"]`);t.some(e=>e.id===o)?(cita.servicios=t.filter(e=>e.id!==o),a.classList.remove("seleccionado")):(cita.servicios=[...t,e],a.classList.add("seleccionado")),console.log(cita)}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const o=new Date(e.target.value).getUTCDay();[6,0].includes(o)?(e.target.value="",mostrarAlerta("Fines de Semana no permitidos","error","#paso-2 p")):console.log("correcot")}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){console.log(e.target.value);const o=e.target.value.split(":")[0];o<10||o>18?(e.target.value="",mostrarAlerta("Horas No Validas","error","#paso-2 p")):cita.hora=e.target.value}))}function mostrarAlerta(e,o,t,a=!0){const c=document.querySelector(".alerta");c&&c.remove();const n=document.createElement("DIV");n.textContent=e,n.classList.add("alerta"),n.classList.add(o);document.querySelector(t).appendChild(n),a&&setTimeout(()=>{n.remove()},3e3)}function mostrarResumen(){document.querySelector(".contenido-resumen");Object.values(cita).includes("")||0===cita.servicios.length?mostrarAlerta("Faltan datos de servicio, fecha u hora","error",".contenido-resumen",!1):console.log("ok")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));