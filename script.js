const games = [
    { name: "CLONE" },
    { name: "TRAIN" },
    { name: "MERGE" },
    { name: "TWERK" },
    { name: "BIKE" },
    { name: "CUBE" }
];

functiongenerateRandomSegment(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

functiongenerateKey(gameName) {
    return`${gameName}-${generateRandomSegment(3)}-${generateRandomSegment(4)}-${generateRandomSegment(4)}-${generateRandomSegment(3)}`;
}

functiongenerateKeys() {
    document.getElementById('keysOutput').innerText = '';
    games.forEach(game => {
        const key = generateKey(game.name);
        displayKey(key);
    });
}

functiondisplayKey(key) {
    const output = document.getElementById('keysOutput');
    output.innerText += `${key}\n`;
}

document.getElementById('generateKeys').addEventListener('click', generateKeys);
