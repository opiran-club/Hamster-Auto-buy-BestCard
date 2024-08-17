document.getElementById('generateKeyBtn').addEventListener('click', () => {
    fetch('/api/generate-keys')
        .then(response => response.json())
        .then(keys => {
            // Handle the keys (for example, displaying them)
            console.log('Generated keys:', keys);
        })
        .catch(error => {
            console.error('Error generating keys:', error);
        });
});
