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
  { titulo: "Campeón Nacional PBX 2024", nombre: "Jugador del Team MyLchen", fecha: "Torneo Nacional · Primer Bloque", icono: "🏆" },
  { titulo: "Campeón Tártaro", nombre: "Matías R.", fecha: "Septiembre 2026", icono: "🐺" },
  { titulo: "Ganador de liga", nombre: "Camila S.", fecha: "Liga de invierno", icono: "🥇" },
  { titulo: "Ganador de liga", nombre: "Diego M.", fecha: "Liga de otoño", icono: "🥇" },
  { titulo: "Avanzado PB", nombre: "Benjamín T.", fecha: "Agosto 2026", icono: "⚔️" },
  { titulo: "Ganador sellado", nombre: "Javiera P.", fecha: "Prerelease", icono: "📦" },
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
  { icono: "🃏", titulo: "Mitos y Leyendas", texto: "Sobres, mazos y sellados oficiales.", consulta: "Hola Cancerbero, quiero consultar por sobres y mazos de Mitos y Leyendas." },
  { icono: "🎲", titulo: "Juegos de mesa", texto: "Para jugar en familia, con amigos o en la tienda.", consulta: "Hola Cancerbero, busco un juego de mesa. ¿Qué me recomiendan?" },
  { icono: "🗿", titulo: "Figuras coleccionables", texto: "Figuras y artículos para coleccionistas.", consulta: "Hola Cancerbero, quiero consultar por figuras coleccionables." },
  { icono: "⚔️", titulo: "Torneos", texto: "Calendario semanal e inscripciones.", link: "#torneos" },
];

// Banner principal. tema: red | gold | night
const PROMOS = [
  { etiqueta: "Tienda oficial de Mitos y Leyendas", titulo: "Tres cabezas. Una sola comunidad.", texto: "Juegos de mesa, figuras coleccionables y TCG en Mulchén, con torneos cada semana.", boton: "Ver torneos", link: "#torneos", tema: "night", simbolo: "🐺" },
  { etiqueta: "Lanzamiento · 01 Nov", titulo: "Relatos de Ra llega a la tienda", texto: "Formato sellado con sobres de la nueva expansión. Premios para el Top 8 y Top 16.", boton: "Inscribirme", ig: "Hola Cancerbero, quiero inscribirme en el lanzamiento de Relatos de Ra.", tema: "gold", simbolo: "☀️" },
  { etiqueta: "Salón de campeones", titulo: "Aquí juega el campeón nacional PBX 2024", texto: "Entrena con el Team MyLchen y representa a Mulchén en los nacionales.", boton: "Ver campeones", link: "#campeones", tema: "red", simbolo: "🏆" },
];

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
    <div class="trophy__icon" aria-hidden="true">${c.icono}</div>
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
    <span class="cat__icon" aria-hidden="true">${c.icono}</span>
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
        <div class="slide__seal" aria-hidden="true"><span>${p.simbolo}</span></div>
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
