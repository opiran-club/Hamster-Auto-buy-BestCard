const games = [
    { name: "CLONE" },
    { name: "TRAIN" },
    { name: "MERGE" },
    { name: "TWERK" },
    { name: "BIKE" },
    { name: "CUBE" }
];

function generateRandomSegment(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateKey(gameName) {
    return`${gameName}-${generateRandomSegment(3)}-${generateRandomSegment(4)}-${generateRandomSegment(4)}-${generateRandomSegment(3)}`;
}

function generateKeys() {
    document.getElementById('keysOutput').innerText = '';
    games.forEach(game => {
        const key = generateKey(game.name);
        displayKey(key);
    });
}

function displayKey(key) {
    const output = document.getElementById('keysOutput');
    output.innerText += `${key}\n`;
}

document.getElementById('generateKeys').addEventListener('click', generateKeys);
