let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen(),consultarAPI()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador(),mostrarResumen()})})}function botonesPaginador(){const e=document.querySelector("#siguiente"),t=document.querySelector("#anterior");console.log(paso),1===paso?(t.classList.add("ocultar"),e.classList.remove("ocultar")):3===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",()=>{paso<=1||(paso--,botonesPaginador())})}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",()=>{paso>=3||(paso++,botonesPaginador())})}async function consultarAPI(){try{const e="http://localhost:8000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:a}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent="$ "+a;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicio=t,r.onclick=function(){seleccionarServico(e)},r.appendChild(n),r.appendChild(c),document.querySelector("#servicios").appendChild(r)})}function seleccionarServico(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function idCliente(){const e=document.querySelector("#id").value;cita.id=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de Semana no permitidos","error","#paso-2 p")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Horas No Validas","error","#paso-2 p")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),a&&setTimeout(()=>{c.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);(Object.values(cita).includes("")||0===cita.servicios.length)&&mostrarAlerta("Faltan datos de servicio, fecha u hora","error",".contenido-resumen");const{nombre:t,fecha:o,hora:a,servicios:n}=cita,c=document.createElement("H3");c.textContent="Resumen de Servicios",e.appendChild(c),n.forEach(t=>{const{id:o,precio:a,nombre:n}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=n;const s=document.createElement("P");s.innerHTML="<span>Precio:</span>$"+a,c.appendChild(r),c.appendChild(s),e.appendChild(c)});const r=document.createElement("H3");r.textContent="Resumen de Cita",e.appendChild(r);const s=document.createElement("P");s.innerHTML="<span>Nombre:</span> "+t;const i=new Date(o),d=i.getMonth(),l=i.getDate()+2,u=i.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"});console.log(m);const p=document.createElement("P");p.innerHTML="<span>Fecha:</span> "+o;const v=document.createElement("P");v.innerHTML="<span>Hora:</span> "+a;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar",h.onclick=reservarCita,e.appendChild(s),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const{id:e,fecha:t,hora:o,servicios:a}=cita,n=a.map(e=>e.id),c=new FormData;c.append("fecha",t),c.append("hora",o),c.append("usuarioId",e),c.append("servicios",n);const r=await fetch("http://localhost:8000/api/citas",{method:"POST",body:c}),s=await r.json();console.log("resultado:",s)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));