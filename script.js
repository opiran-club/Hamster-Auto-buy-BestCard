document.addEventListener('DOMContentLoaded', () => {
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const keysOutput = document.getElementById('keysOutput');

    generateKeyBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/generate-keys');
            const keys = await response.json();

            console.log('Generated keys:', keys);
            keysOutput.innerHTML = keys.map(key => `<p>${key}</p>`).join('');
        } catch (error) {
            console.error('Error generating keys:', error);
        }
    });
});
