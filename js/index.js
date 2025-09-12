let peliculas = [];

document.addEventListener("DOMContentLoaded", cargarPeliculas);

const url = "https://japceibal.github.io/japflix_api/movies-data.json";
const botonBuscar = document.getElementById("btnBuscar");
const listaPeliculas = document.getElementById("lista");
const cuerpoOffcanvas = document.getElementById("cuerpoOffcanvas");
const offcanvasElement = document.getElementById("offcanvasTop");
const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

function cargarPeliculas() {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener las películas.");
            return response.json();
        })
        .then(data => {
            peliculas = data;
            console.log("Total de películas cargadas: " + data.length);
        })
        .catch(error => console.error("Error:", error));
}

function buscarPelicula() {
    const inputBuscar = document.getElementById("inputBuscar").value.trim().toLowerCase();
    listaPeliculas.innerHTML = "";

    if (!inputBuscar) return;

    peliculas.forEach(pelicula => {
        const generos = pelicula.genres.map(g => g.name.toLowerCase()).join(" ");

        if (pelicula.title.toLowerCase().includes(inputBuscar) ||
            pelicula.tagline.toLowerCase().includes(inputBuscar) ||
            pelicula.overview.toLowerCase().includes(inputBuscar) ||
            generos.includes(inputBuscar)) {

            const liPelicula = document.createElement("li");
            liPelicula.classList.add("list-group-item", "bg-dark", "text-white");

            const tituloPelicula = document.createElement("h3");
            tituloPelicula.textContent = pelicula.title;

            const taglinePelicula = document.createElement("p");
            taglinePelicula.textContent = pelicula.tagline;

            const estrellas = document.createElement("p");
            estrellas.innerHTML = convertirEstrellas(pelicula.vote_average);

            liPelicula.appendChild(tituloPelicula);
            liPelicula.appendChild(taglinePelicula);
            liPelicula.appendChild(estrellas);

            liPelicula.addEventListener("click", () => mostrarDetalles(pelicula));

            listaPeliculas.appendChild(liPelicula);
        }
    });
}

function convertirEstrellas(votos) {
    const maxEstrellas = 5;
    const estrellasValoradas = Math.round(votos / 2);
    let html = "";

    for (let i = 0; i < maxEstrellas; i++) {
        if (i < estrellasValoradas) {
            html += '<span class="fa fa-star checked"></span>';
        } else {
            html += '<span class="fa fa-star"></span>';
        }
    }
    return html;
}

function mostrarDetalles(pelicula) {
    cuerpoOffcanvas.innerHTML = "";

    document.getElementById("offcanvasTopLabel").textContent = pelicula.title;

    const overview = document.createElement("p");
    overview.textContent = pelicula.overview;

    const generos = document.createElement("p");
    generos.textContent = pelicula.genres.map(g => g.name).join(" - ");

    cuerpoOffcanvas.appendChild(overview);
    cuerpoOffcanvas.appendChild(generos);

    bsOffcanvas.show();
}

botonBuscar.addEventListener("click", buscarPelicula);