                // ===== ELEMENTOS DEL DOM  ===== //

const botonGenerar = document.getElementById("generar");

const selectorCantidad = document.getElementById("cantidad");

const contenedorPaleta = document.getElementById("paleta");

const toast = document.getElementById("toast");


let paleta = [];

                // ===== EVENTOS ===== //

botonGenerar.addEventListener("click", generarPaleta);

  
                // ===== FUNCIONES ===== //

function generarPaleta() {

    const cantidad = Number(selectorCantidad.value);

    for (let i = 0; i < cantidad; i++) {

        if (!paleta[i] || !paleta[i].bloqueado) {

            paleta[i] = generarColor();

        }

    }

    paleta.length = cantidad;

    renderizarPaleta();

     guardarPaleta();

}

function renderizarPaleta() {

    contenedorPaleta.innerHTML = "";

    for (let i = 0; i < paleta.length; i++) {

        const tarjeta = crearTarjeta(paleta[i]);

        contenedorPaleta.appendChild(tarjeta);

    }

}

function generarColor() {

    const h = Math.floor(Math.random() * 360);

    const s = Math.floor(Math.random() * 41) + 60;

    const l = Math.floor(Math.random() * 31) + 35;

    const hsl = `hsl(${h}, ${s}%, ${l}%)`;

    const hex = hslToHex(h, s, l);

    return {

        h: h,
        s: s,
        l: l,

        hsl: hsl,

        hex: hex,

        bloqueado: false

    };

}

function hslToHex(h, s, l) {

    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + [r, g, b]
        .map(color => color.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

}

function crearTarjeta(color) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "color-card";

    const preview = document.createElement("div");
    preview.className = "color-preview";
    preview.style.backgroundColor = color.hsl;

    const info = document.createElement("div");
    info.className = "color-info";

    const textoHex = document.createElement("p");
    textoHex.textContent = `HEX: ${color.hex}`;

    const textoHsl = document.createElement("p");
    textoHsl.textContent =  `HSL: ${color.h}°, ${color.s}%, ${color.l}%`;

    info.appendChild(textoHex);
    info.appendChild(textoHsl);

    const acciones = document.createElement("div");
    acciones.className = "color-actions";

    const botonBloquear = document.createElement("button");

    const actualizarBotonBloqueo = () => {
            if (color.bloqueado) {

        botonBloquear.textContent = "🔒";
        botonBloquear.title = "Desbloquear color";

    } else {

        botonBloquear.textContent = "🔓";
        botonBloquear.title = "Bloquear color";

    }
};

    actualizarBotonBloqueo();

    
    botonBloquear.addEventListener("click", function (event) {

    event.stopPropagation();

    color.bloqueado = !color.bloqueado;

    actualizarBotonBloqueo();

    guardarPaleta();

});

    const botonCopiar = document.createElement("button");
    botonCopiar.textContent = "📋";
    botonCopiar.title = "Copiar código HEX";

    botonCopiar.addEventListener("click", function () {
        
        navigator.clipboard.writeText(color.hex);
        
        mostrarToast("Código HEX copiado");
    });

    acciones.appendChild(botonBloquear);
    acciones.appendChild(botonCopiar);

    info.appendChild(acciones);

    tarjeta.appendChild(preview);
    tarjeta.appendChild(info);

    return tarjeta;
}

function guardarPaleta() {

    localStorage.setItem("paleta", JSON.stringify(paleta));

}

function cargarPaleta() {

    const datosGuardados = localStorage.getItem("paleta");

    if (datosGuardados) {

        paleta = JSON.parse(datosGuardados);

        selectorCantidad.value = paleta.length;

        renderizarPaleta();

    } else {

        generarPaleta();

    }

}

function mostrarToast(mensaje) {

    toast.textContent = mensaje;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);

}

cargarPaleta();




