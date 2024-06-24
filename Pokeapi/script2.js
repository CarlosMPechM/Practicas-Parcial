function searchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.trim().toLowerCase();

    if (pokemonName === '') {
        alert('Por favor ingrese un nombre de Pokémon.');
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado.');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonInfo(data);
            addToPokemonTable(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayPokemonInfo(data) {
    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = `
        <div>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${capitalizeFirstLetter(data.name)}</h2>
            <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        </div>
    `;
}

function addToPokemonTable(data) {
    const tableBody = document.getElementById('pokemonTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${capitalizeFirstLetter(data.name)}</td>
        <td>${data.types.map(type => type.type.name).join(', ')}</td>
        <td>${data.height / 10} m</td>
        <td>${data.weight / 10} kg</td>
    `;
    tableBody.appendChild(newRow);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
