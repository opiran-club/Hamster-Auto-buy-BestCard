document.getElementById("generateKeysButton").addEventListener("click", async function () {
    try {
        const response = await fetch("/api/generate-keys");

        // Check if response is ok and if it's JSON
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();

        // Attempt to parse the JSON
        let keys;
        try {
            keys = JSON.parse(text);
        } catch (err) {
            console.error("Failed to parse JSON:", text);
            throw new Error('Response was not valid JSON');
        }

        console.log("Generated keys:", keys);
        document.getElementById("output").innerText = keys.join("\n");
    } catch (error) {
        console.error("Error generating keys:", error);
        document.getElementById("output").innerText = "Error generating keys";
    }
});
