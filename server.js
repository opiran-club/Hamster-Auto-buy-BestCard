const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const games = [
  { name: "Riding Extreme 3D", appToken: "d28721be-fd2d-4b45-869e-9f253b554e50", promoId: "43e35910-c168-4634-ad4f-52fd764a843f" },
  { name: "Chain Cube 2048", appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2", promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3" },
  { name: "My Clone Army", appToken: "74ee0b5b-775e-4bee-974f-63e7f4d5bacb, promoId: "fe693b26-b342-4159-8808-15e3ff7f8767" },
  { name: "Train Miner", appToken: "82647f43-3f87-402d-88dd-09a90025313f", promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954" },
  { name: "Merge Away", appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833, promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4" },
  { name: "Twerk Race 3D", appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c", promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c" }
];

app.post('/generate-key', async (req, res) => {
  const { gameIndex } = req.body; // Assuming the game index is sent in the request body
  const game = games[gameIndex];
  
  if (!game) {
    return res.status(404).send('Game not found');
  }

  const clientId = generateClientId();
  const clientToken = await login(game.appToken, clientId);
  
  if (clientToken) {
    const hasCode = await emulateProgress(clientToken, game.promoId);
    if (hasCode) {
      const promoCode = await generateKey(clientToken, game.promoId);
      res.json({ promoCode });
    } else {
      res.status(500).send('Error during emulate progress');
    }
  } else {
    res.status(500).send('Error during login');
  }
});

function generateClientId() {
  return `${Date.now()}-${Math.random().toString().slice(2,21)}`;
}

async function login(appToken, clientId) {
  // ... Convert the login function to use fetch and return the clientToken
}

async function emulateProgress(clientToken, promoId) {
  // ... Convert the emulate progress function to use fetch and check for 'hasCode'
}

async function generateKey(clientToken, promoId) {
  // ... Convert the generate key function to use fetch and return the 'promoCode'
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

