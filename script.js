const botonGenerar = document.getElementById("generar");

const selectorCantidad = document.getElementById("cantidad");

const contenedorPaleta = document.getElementById("paleta");

const toast = document.getElementById("toast");

botonGenerar.addEventListener("click", generarPaleta);

// ===== FUNCIONES =====

function generarPaleta(){

    contenedorPaleta.innerHTML = "";

    const color = generarColor();

    const tarjeta = document.createElement("div");

    tarjeta.className = "color-card";

    const preview = document.createElement("div");

    preview.className = "color-preview";

    preview.style.backgroundColor = color;

    tarjeta.appendChild(preview);

    contenedorPaleta.appendChild(tarjeta);

}

function generarColor() {

    const h = Math.floor(Math.random() * 360);

    const s = Math.floor(Math.random() * 41) + 60;

    const l = Math.floor(Math.random() * 31) + 35;

    const hsl = `hsl(${h}, ${s}%, ${l}%)`;

    const hex = hslToHex(h, s, l);

    return {

        hsl: hsl,

        hex: hex,

        bloqueado: false

    };

}








