document.getElementById('generateKeyBtn').addEventListener('click', async () => {
    try {
        // Send a request to your API to generate the keys
        const response = await fetch('/api/generate-keys');

        // Parse the JSON response
        const keys = await response.json();

        // Handle the keys (e.g., display them on the page)
        console.log('Generated keys:', keys);

        // Assuming you have an element with id 'keysOutput' to display the keys
        const keysOutput = document.getElementById('keysOutput');
        keysOutput.innerHTML = keys.map(key => `<p>${key}</p>`).join('');

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error generating keys:', error);
    }
});
