document.getElementById('fetch-pokemon').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el Pokémon');
            }
            return response.json();
        })
        .then(data => {
            const pokemonInfoDiv = document.getElementById('pokemon-info');
            pokemonInfoDiv.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h2>${data.name}</h2>
                <p>Número: ${data.id}</p>
                <p>Altura: ${data.height} dm</p>
                <p>Peso: ${data.weight} hg</p>
                <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
            `;
        })
        .catch(error => {
            const pokemonInfoDiv = document.getElementById('pokemon-info');
            pokemonInfoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});

