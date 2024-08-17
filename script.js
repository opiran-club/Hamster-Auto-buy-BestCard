constEVENTS_DELAY = 20000;  // delay in msconst games = [
    {name: "Riding Extreme 3D", appToken: "d28721be-fd2d-4b45-869e-9f253b554e50", promoId: "43e35910-c168-4634-ad4f-52fd764a843f"},
    {name: "Chain Cube 2048", appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2", promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3"},
    {name: "My Clone Army", appToken: "74ee0b5b-775e-4bee-974f-63e7f4d5bacb", promoId: "fe693b26-b342-4159-8808-15e3ff7f8767"},
    {name: "Train Miner", appToken: "82647f43-3f87-402d-88dd-09a90025313f", promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954"},
    {name: "Merge Away", appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833", promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4"},
    {name: "Twerk Race 3D", appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c", promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c"}
];

functiongenerateClientId() {
    return`${Date.now()}-${Math.floor(Math.random() * 10000000000000000000)}`;
}

asyncfunctionlogin(appToken, clientId) {
    const response = awaitfetch("https://api.gamepromo.io/promo/login-client", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({appToken, clientId, clientOrigin: "deviceid"})
    });
    const data = await response.json();
    return data.clientToken;
}

asyncfunctionemulateProgress(clientToken, promoId) {
    const response = awaitfetch("https://api.gamepromo.io/promo/register-event", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${clientToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({promoId, eventId: crypto.randomUUID(), eventOrigin: "undefined"})
    });
    const data = await response.json();
    return data.hasCode;
}

asyncfunctiongenerateKey(clientToken, promoId) {
    const response = awaitfetch("https://api.gamepromo.io/promo/create-code", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${clientToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({promoId})
    });
    const data = await response.json();
    return data.promoCode;
}

asyncfunctionsendToTelegram(botToken, channelId, message) {
    awaitfetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: newURLSearchParams({
            chat_id: channelId,
            text: message,
            parse_mode: "MarkdownV2"
        })
    });
}

asyncfunctionstartKeyGeneration() {
    const botToken = document.getElementById('botToken').value;
    const channelId = document.getElementById('channelId').value;
    const output = document.getElementById('output');

    for (const game of games) {
        const clientId = generateClientId();
        const clientToken = awaitlogin(game.appToken, clientId);

        if (!clientToken) {
            output.innerText += `Error generating client token for ${game.name}\n`;
            continue;
        }

        let hasCode = false;
        for (let i = 0; i < 20; i++) {
            awaitnewPromise(r =>setTimeout(r, EVENTS_DELAY));
            hasCode = awaitemulateProgress(clientToken, game.promoId);

            if (hasCode === "true") {
                break;
            }
        }

        const key = awaitgenerateKey(clientToken, game.promoId);
        if (key) {
            const message = `${game.name} : ${key}`;
            output.innerText += `${message}\n`;
            if (botToken && channelId) {
                awaitsendToTelegram(botToken, channelId, `\`${key}\``);
            }
        } else {
            output.innerText += `Error generating key for ${game.name}\n`;
        }

        awaitnewPromise(r =>setTimeout(r, 10000)); // wait 10 seconds between games
    }
}
