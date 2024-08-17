document.addEventListener('DOMContentLoaded', function() {
    const games = [
        "Riding Extreme 3D",
        "Chain Cube 2048",
        "My Clone Army",
        "Train Miner",
        "Merge Away",
        "Twerk Race 3D"
    ];

    const gameSelector = document.getElementById('game-selector');
    const resultDiv = document.getElementById('result');
    const generateBtn = document.getElementById('generate-btn');

    games.forEach((game, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = game;
        gameSelector.appendChild(option);
    });

    generateBtn.addEventListener('click', function() {
        const selectedGameIndex = gameSelector.value;
        fetch('https://regular-phantom-nerve.glitch.me/generate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameIndex: selectedGameIndex })
        })
        .then(response => response.json())
        .then(data => {
            if (data.promoCode) {
                resultDiv.textContent = `Generated Key: ${data.promoCode}`;
            } else {
                resultDiv.textContent = 'There was an error generating the key.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'There was an error generating the key.';
        });
    });
});
