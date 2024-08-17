const backendURL = 'https://hmstr-key-opiran-clubs-projects.vercel.app/api/generate-keys';

asyncfunctiongenerateKeys() {
    try {
        const response = awaitfetch(backendURL);
        const keys = await response.json();
        const output = document.getElementById('keysOutput');
        output.value = keys.join('\n');
    } catch (error) {
        console.error('Error generating keys:', error);
    }
}

document.getElementById('generateKeys').addEventListener('click', generateKeys);
