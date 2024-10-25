let endpoint = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";
let endpointBuscar = "https://pokeapi.co/api/v2/pokemon/";

let elementoParaInserir = document.getElementById("pokemons__lista");
let elementoBuscarPokemonInput = document.getElementById("nome__pokemon");
let elementoBuscarPokemonButton = document.getElementById("buscar__pokemon");

let bucarPokemonOnClick = elementoBuscarPokemonButton.addEventListener(
    "click",
    async (e) => {
        //para limpar ou adiconar valor ~~> elementoBuscarPokemonInput.value = "";
        let nomePokemon = elementoBuscarPokemonInput.value;
        let nomeVazio = nomePokemon.trim().length == 0;

        if (!nomeVazio) {
            let urlFinal = endpointBuscar + nomePokemon + "/";
            try {
                let res = await fetch(urlFinal);
                let pokeInfo = await res.json();
                // console.log(pokeInfo);
                capturarPokemon(pokeInfo);
                elementoBuscarPokemonInput.value = "";
            } catch {
                alert("Pokemon não encontrado");
            }
        } else {
            alert("Nome vazio");
        }
    }
);

let pokemons = [];
buscarPokemonApi();

async function buscarPokemonApi() {
    let res = await fetch(endpoint);
    let req = await res.json();
    let pokemonsLista = req.results;
    // pokemons.push(req);

    pokemons = await Promise.all(
        pokemonsLista.map(async (pokemon) => {
            let pokeInfo = await fetch(pokemon.url);
            let pokeRes = await pokeInfo.json();
            return pokeRes;
        })
    );

    if (pokemons.length > 0) {
        exibirPokemons(pokemons);
    }
    // console.log(pokemonsLista);
}

function exibirPokemons(listaDePokemons) {
    pokemons.forEach((pokemon) => {
        elementoParaInserir.innerHTML += `
             <li class="pokemons__item">
                        <div class="pokemons__content">
                            <img src="${
                                pokemon.sprites.front_default
                            }" alt="Imagem de celular">
                            <div class="pokemons__informacoes">
                                <h3>${pokeNome(pokemon.name)}</h3>
                                <p>Tipo(s): ${getPokeTipos(pokemon.types)}
                                </p>
                                <h4>Peso: ${parseInt(
                                    pokemon.weight * 0.453592
                                )} Kg</h4>
                            </div>
                        </div>
                    </li>
            `;
    });
}

function capturarPokemon(pokemon) {
    elementoParaInserir.innerHTML += `
             <li class="pokemons__item">
                        <div class="pokemons__content">
                            <img src="${
                                pokemon.sprites.front_default
                            }" alt="Imagem de celular">
                            <div class="pokemons__informacoes">
                                <h3>${pokeNome(pokemon.name)}</h3>
                                <p>Tipo(s): ${getPokeTipos(pokemon.types)}
                                </p>
                                <h4>Peso: ${parseInt(
                                    pokemon.weight * 0.453592
                                )} Kg</h4>
                            </div>
                        </div>
                    </li>
            `;
}

function getPokeTipos(listaDeTipos) {
    let tipos = [];
    listaDeTipos.forEach((tipo) => {
        tipos.push(tipo.type.name);
    });

    return tipos.join(", ");
}

function pokeNome(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}
