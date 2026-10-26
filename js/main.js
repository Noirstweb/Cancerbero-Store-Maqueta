/* =========================================
   Cancerbero Store — maqueta
   Edita los datos en las listas de abajo
   ========================================= */

const INSTAGRAM = "cancerbero_store";
const IG_DM = `https://ig.me/m/${INSTAGRAM}`;

// Horario referencial: día (0 domingo … 6 sábado) → [apertura, cierre]
const HORARIO = { 1: ["15:00", "21:00"], 2: ["15:00", "21:00"], 3: ["15:00", "21:00"], 4: ["15:00", "21:00"], 5: ["15:00", "22:00"], 6: ["11:00", "22:00"] };

// Salón de campeones (nombres de ejemplo). El primero va destacado
const CAMPEONES = [
  { titulo: "Campeón Nacional PBX 2024", nombre: "Jugador del Team MyLchen", fecha: "Torneo Nacional · Primer Bloque", icono: "trofeo" },
  { titulo: "Campeón Tártaro", nombre: "Matías R.", fecha: "Septiembre 2026", icono: "lobo" },
  { titulo: "Ganador de liga", nombre: "Camila S.", fecha: "Liga de invierno", icono: "medalla" },
  { titulo: "Ganador de liga", nombre: "Diego M.", fecha: "Liga de otoño", icono: "medalla" },
  { titulo: "Avanzado PB", nombre: "Benjamín T.", fecha: "Agosto 2026", icono: "espadas" },
  { titulo: "Ganador sellado", nombre: "Javiera P.", fecha: "Prerelease", icono: "sobre" },
];

// Eventos (tipo: torneo | lanzamiento). Fechas de ejemplo: actualízalas cada semana
const EVENTOS = [
  { tipo: "lanzamiento", dia: "01", mes: "Nov", titulo: "Lanzamiento Relatos de Ra", texto: "Formato sellado con sobres de la nueva expansión.", hora: "21:30", valor: 4000, tags: ["Sellado", "Top 8 · Top 16"] },
  { tipo: "torneo", dia: "02", mes: "Nov", titulo: "Torneo Primer Bloque", texto: "Premios según asistencia para el Top 8 y Top 16.", hora: "11:30", valor: 4000, tags: ["Primer Bloque", "Top 8 · Top 16"] },
  { tipo: "torneo", dia: "08", mes: "Nov", titulo: "Liga semanal · Fecha 3", texto: "Suma puntos para la liga de la temporada.", hora: "16:00", valor: 3000, tags: ["Liga", "Puntos"] },
  { tipo: "lanzamiento", dia: "15", mes: "Nov", titulo: "Presentación de mazos nuevos", texto: "Ven a probar los mazos de la nueva temporada.", hora: "17:00", valor: 0, tags: ["Abierto a todos"] },
];

// Categorías: tarjetas de la tienda y links del footer.
// link: "#torneos" baja a una sección; si no tiene link, abre Instagram con "consulta"
const CATEGORIAS = [
  { icono: "cartas", titulo: "Mitos y Leyendas", texto: "Sobres, mazos y sellados oficiales.", consulta: "Hola Cancerbero, quiero consultar por sobres y mazos de Mitos y Leyendas." },
  { icono: "dado", titulo: "Juegos de mesa", texto: "Para jugar en familia, con amigos o en la tienda.", consulta: "Hola Cancerbero, busco un juego de mesa. ¿Qué me recomiendan?" },
  { icono: "figura", titulo: "Figuras coleccionables", texto: "Figuras y artículos para coleccionistas.", consulta: "Hola Cancerbero, quiero consultar por figuras coleccionables." },
  { icono: "espadas", titulo: "Torneos", texto: "Calendario semanal e inscripciones.", link: "#torneos" },
];

// Banner principal. tema: red | gold | night
const PROMOS = [
  { etiqueta: "Tienda oficial de Mitos y Leyendas", titulo: "Tres cabezas. Una sola comunidad.", texto: "Juegos de mesa, figuras coleccionables y TCG en Mulchén, con torneos cada semana.", boton: "Ver torneos", link: "#torneos", tema: "night", simbolo: "lobo" },
  { etiqueta: "Lanzamiento · 01 Nov", titulo: "Relatos de Ra llega a la tienda", texto: "Formato sellado con sobres de la nueva expansión. Premios para el Top 8 y Top 16.", boton: "Inscribirme", ig: "Hola Cancerbero, quiero inscribirme en el lanzamiento de Relatos de Ra.", tema: "gold", simbolo: "sol" },
  { etiqueta: "Salón de campeones", titulo: "Aquí juega el campeón nacional PBX 2024", texto: "Entrena con el Team MyLchen y representa a Mulchén en los nacionales.", boton: "Ver campeones", link: "#campeones", tema: "red", simbolo: "trofeo" },
];

// Íconos de línea (heredan el color con currentColor). Claves usadas en las listas de arriba
const ICONOS = {
  trofeo: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
  medalla: '<path d="M8 3l2.5 6M16 3l-2.5 6"/><circle cx="12" cy="15" r="6"/><path d="M12 12.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 14.6l2-.3Z"/>',
  espadas: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/><path d="M9.5 6.5 6 3H3v3l3.5 3.5M11 13l-4 4M5 14l5 5M3 21l2-2"/>',
  sobre: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 7h14M5 17h14M12 10l1 2h-2Z"/>',
  lobo: '<path d="M4 3l4 5h8l4-5v8l-3 5-5 5-5-5-3-5Z"/><path d="M9 12h.01M15 12h.01M10.5 16.5 12 18l1.5-1.5"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  cartas: '<rect x="3" y="6" width="11" height="15" rx="1.5" transform="rotate(-8 8.5 13.5)"/><rect x="10" y="3" width="11" height="15" rx="1.5"/><path d="M15.5 8.5l1.5 2-1.5 2-1.5-2Z"/>',
  dado: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/>',
  figura: '<circle cx="12" cy="6" r="3"/><path d="M8 21v-6l-2-1 2-5h8l2 5-2 1v6M6 21h12"/>',
};
const icono = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONOS[k]}</svg>`;

/* ---------- Utilidades ---------- */
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const clp = (n) => (n ? "$" + n.toLocaleString("es-CL") : "Gratis");

const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 2600);
}

// Abre el chat de Instagram y copia el mensaje para pegarlo
function escribirInstagram(texto) {
  window.open(IG_DM, "_blank", "noopener");
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(
      () => toast("Mensaje copiado: pégalo en el chat de Instagram"),
      () => toast(`Escríbenos a @${INSTAGRAM}`)
    );
  }
}

/* ---------- Menú móvil ---------- */
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const abierto = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", abierto);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

/* ---------- Salón de campeones ---------- */
document.getElementById("trophies").innerHTML = CAMPEONES.map((c, i) => `
  <article class="trophy ${i === 0 ? "trophy--top" : ""}">
    <div class="trophy__icon" aria-hidden="true">${icono(c.icono)}</div>
    <h3 class="trophy__title">${c.titulo}</h3>
    <p class="trophy__name">${c.nombre}</p>
    <p class="trophy__date">${c.fecha}</p>
  </article>`).join("");

/* ---------- Eventos con pestañas ---------- */
const eventsEl = document.getElementById("events");
const tabs = document.getElementById("tabs");

function pintarEventos(tipo) {
  const lista = EVENTOS.filter((e) => tipo === "all" || e.tipo === tipo);
  eventsEl.innerHTML = lista.map((e, i) => `
    <article class="event ${e.tipo === "lanzamiento" ? "event--launch" : ""}">
      <div class="event__date"><b>${e.dia}</b><small>${e.mes}</small></div>
      <div>
        <h3>${e.titulo}</h3>
        <p>${e.texto}</p>
        <div class="event__meta">${e.tags.map((t) => `<span class="pill">${t}</span>`).join("")}<span class="pill">${e.hora} hrs</span></div>
        <div class="event__foot">
          <span class="event__price">${clp(e.valor)}</span>
          <button class="btn btn--red" data-evento="${EVENTOS.indexOf(e)}">Inscribirme</button>
        </div>
      </div>
    </article>`).join("");
}

tabs.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-type]");
  if (!btn) return;
  tabs.querySelectorAll("[data-type]").forEach((b) => b.setAttribute("aria-selected", b === btn));
  pintarEventos(btn.dataset.type);
});

eventsEl.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-evento]");
  if (!btn) return;
  const e = EVENTOS[Number(btn.dataset.evento)];
  escribirInstagram(`Hola Cancerbero, quiero inscribirme en: ${e.titulo} (${e.dia} ${e.mes}, ${e.hora} hrs). Mi nombre es: `);
});

/* ---------- Categorías y footer ---------- */
const catsEl = document.getElementById("cats");
catsEl.innerHTML = CATEGORIAS.map((c, i) => `
  <a class="cat" href="${c.link || "#"}" ${c.link ? "" : `data-cat="${i}"`}>
    <span class="cat__icon" aria-hidden="true">${icono(c.icono)}</span>
    <h3>${c.titulo}</h3>
    <p>${c.texto}</p>
    <span class="cat__go">${c.link ? "Ver calendario" : "Consultar por Instagram"} →</span>
  </a>`).join("");
document.getElementById("footCats").innerHTML = CATEGORIAS.map((c, i) =>
  `<li><a href="${c.link || "#"}" ${c.link ? "" : `data-cat="${i}"`}>${c.titulo}</a></li>`).join("");
document.addEventListener("click", (ev) => {
  const a = ev.target.closest("[data-cat]");
  if (!a) return;
  ev.preventDefault();
  escribirInstagram(CATEGORIAS[Number(a.dataset.cat)].consulta);
});
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Banner principal ---------- */
(function initPromo() {
  const track = document.getElementById("promoTrack");
  const dots = document.getElementById("promoDots");
  const promo = track.parentElement;
  track.innerHTML = PROMOS.map((p, i) => `
    <article class="slide slide--${p.tema}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${PROMOS.length}">
      <div class="container slide__inner">
        <div class="slide__copy">
          <p class="kicker">${p.etiqueta}</p>
          <h2>${p.titulo}</h2>
          <p class="slide__text">${p.texto}</p>
          ${p.ig ? `<a class="btn btn--red" href="#" data-ig="${p.ig}">${p.boton}</a>` : `<a class="btn btn--red" href="${p.link}">${p.boton}</a>`}
        </div>
        <div class="slide__seal" aria-hidden="true">${icono(p.simbolo)}</div>
      </div>
    </article>`).join("");
  dots.innerHTML = PROMOS.map((_, i) => `<button role="tab" aria-label="Promoción ${i + 1}"></button>`).join("");

  let actual = 0, timer = null;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function ir(n) {
    actual = (n + PROMOS.length) % PROMOS.length;
    track.style.transform = `translateX(-${actual * 100}%)`;
    dots.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-selected", i === actual));
    track.querySelectorAll(".slide").forEach((s, i) => s.toggleAttribute("inert", i !== actual));
  }
  const parar = () => clearInterval(timer);
  const auto = () => { parar(); if (!reducido) timer = setInterval(() => ir(actual + 1), 5500); };
  document.getElementById("promoPrev").addEventListener("click", () => { ir(actual - 1); auto(); });
  document.getElementById("promoNext").addEventListener("click", () => { ir(actual + 1); auto(); });
  dots.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { ir([...dots.children].indexOf(b)); auto(); } });
  promo.addEventListener("mouseenter", parar);
  promo.addEventListener("mouseleave", auto);
  let x0 = null;
  track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; parar(); }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
    x0 = null; auto();
  });
  ir(0); auto();
})();

/* ---------- Enlaces "data-ig" (botón del Team) ---------- */
document.querySelectorAll("[data-ig]").forEach((a) => {
  a.href = IG_DM;
  a.addEventListener("click", (ev) => {
    ev.preventDefault();
    escribirInstagram(a.dataset.ig);
  });
});

/* ---------- Horario con el día de hoy destacado ---------- */
const hoy = new Date().getDay();
document.getElementById("hours").innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) => {
  const h = HORARIO[d];
  return `<li class="${d === hoy ? "is-today" : ""}"><span>${DIAS[d]}${d === hoy ? " · hoy" : ""}</span><span>${h ? `${h[0]} – ${h[1]}` : "Cerrado"}</span></li>`;
}).join("");

/* ---------- Inicio ---------- */
pintarEventos("all");
