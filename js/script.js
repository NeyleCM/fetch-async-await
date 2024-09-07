const searchBtn = document.getElementById("searchBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const containerApp = document.getElementById("app");
const searchInput = document.getElementById("searchInput");
const url = 'https://pokeapi.co/api/v2/pokemon/'

let page = 0;  // Inicializa la variable de la página en 0, rastrea la página actual, comenzando en 0.
const limit = 10; // Define el límite de Pokémon por página


// función asíncrona que toma el parámetro offset, 
// se usa para calcular el desplazamiento de los Pokémon a obtener.

const getPokemons = async (offset) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokemons = data.results;
        divPokemons(pokemons);// Se llama a otra función para procesar y mostrar los Pokémon.
    } catch (error) {
        console.log("Error al obtener los Pokémon", error);
    }
};

//Funció asíncrona que toma un array de Pokémon y los muestra en el containerApp
const divPokemons = (pokemons) => {
    containerApp.innerHTML = ""; // Se limpia el contenedor para mostrar nuevos resultados
    pokemons.forEach(async (pokemon) => { // Itera por cada pókemon del array
        try {
            const response = await fetch(pokemon.url);// Se realiza una solicitud a la URL específica de cada Pokémon para obtener detalles adicionales.
            const data = await response.json(); //contiene la respuesta en formato JSON con los detalles del Pokémon.
            //console.log(data)
            let template = `
                <div class="card">
                    <img class="image" src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                    <p> ${data.name.toUpperCase()}</p>
                    </div>`;
            containerApp.insertAdjacentHTML('beforeend', template);
        } catch (error) {
            console.log("Error al obtener los datos del Pokémon", error);
        }
    });
};

//Búsqueda pókemon individual

searchBtn.addEventListener("click", ()=>{
    let pokemonBuscado = searchInput.value.trim().toLowerCase();
    console.log(pokemonBuscado)
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonBuscado}`
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Pokemón no encontrado')
        }
        return response.json();
    })
    .then(newPokemon => {
        containerApp.innerHTML = '';
            let template2 = `
                <div class="card">
                    <img class="image" src="${newPokemon.sprites.other.dream_world.front_default}" alt="${newPokemon.name}">
                    <p> ${newPokemon.name.toUpperCase()}</p>
                    </div>`;
        containerApp.insertAdjacentHTML('beforeend', template2)
    })
    .catch(error => {
        containerApp.innerHTML = `<p>Pokemón no encontrado</p>`;
        console.log("Error al buscar el Pokémon", error);
    });
    })


prevBtn.addEventListener("click", () => {
    if (page > 0) {
        page -= 1;
        getPokemons(page * limit); //Si la página actual es mayor que 0, 
        //decrementa page en 1 y llama a getPokemons con el nuevo offset.
    }
});

nextBtn.addEventListener("click", () => {
    page += 1;
    getPokemons(page * limit); //Incrementa page en 1 y llama a getPokemons con el nuevo offset.
});

getPokemons(); 
 

/*const searchBtn = document.getElementById("searchBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const containerApp = document.getElementById("app");
const searchInput = document.getElementById("searchInput");

let page = 0;  // Inicializa la variable de la página en 0, rastrea la página actual, comenzando en 0.
const limit = 10; // Define el límite de Pokémon por página


// función asíncrona que toma el parámetro offset, 
// se usa para calcular el desplazamiento de los Pokémon a obtener.

const getPokemons = async (offset) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokemons = data.results;

        divPokemons(pokemons);// Se llama a otra función para procesar y mostrar los Pokémon.
    } catch (error) {
        console.log("Error al obtener los Pokémon", error);
    }
};

//Funció asíncrona que toma un array de Pokémon y los muestra en el containerApp
const divPokemons = (pokemons) => {
    containerApp.innerHTML = ""; // Se limpia el contenedor para mostrar nuevos resultados
    pokemons.forEach(async (pokemon) => { // Itera por cada pókemon del array
        try {
            const response = await fetch(pokemon.url);// Se realiza una solicitud a la URL específica de cada Pokémon para obtener detalles adicionales.
            const data = await response.json(); //contiene la respuesta en formato JSON con los detalles del Pokémon.
            //console.log(data)
            let template = `
                <div class="card">
                    <img class="image" src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                    <p> ${data.name.toUpperCase()}</p>
                    </div>`;
            containerApp.innerHTML += template;
        } catch (error) {
            console.log("Error al obtener los datos del Pokémon", error);
        }
    });
};

prevBtn.addEventListener("click", () => {
    if (page > 0) {
        page -= 1;
        getPokemons(page * limit); //Si la página actual es mayor que 0, 
        //decrementa page en 1 y llama a getPokemons con el nuevo offset.
    }
});

nextBtn.addEventListener("click", () => {
    page += 1;
    getPokemons(page * limit); //Incrementa page en 1 y llama a getPokemons con el nuevo offset.
});

getPokemons(); 
 */


