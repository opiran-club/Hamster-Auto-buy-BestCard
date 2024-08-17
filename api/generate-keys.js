// api/generate-keys.js

import { v4 as uuidv4 } from'uuid';
import axios from'axios';

exportdefaultasync (req, res) => {
    if (req.method === 'GET') {
        // Define the games with appToken and promoId
        const games = [
            { name: "Riding Extreme 3D", appToken: "d28721be-fd2d-4b45-869e-9f253b554e50", promoId: "43e35910-c168-4634-ad4f-52fd764a843f" },
            { name: "Chain Cube 2048", appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2", promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3" },
            { name: "My Clone Army", appToken: "74ee0b5b-775e-4bee-974f-63e7f4d5bacb", promoId: "fe693b26-b342-4159-8808-15e3ff7f8767" },
            { name: "Train Miner", appToken: "82647f43-3f87-402d-88dd-09a90025313f", promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954" },
            { name: "Merge Away", appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833", promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4" },
            { name: "Twerk Race 3D", appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c", promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c" }
        ];

        // Function to generate a key
        
        constgenerateKey = async (appToken, promoId) => {
            try {
                const response = await axios.post('https://api.gamepromo.io/promo/create-code', {
                    promoId
                }, {
                    headers: {
                        'Authorization': `Bearer ${appToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data.promoCode;
            } catch (error) {
                console.error(`Error generating key for appToken ${appToken}:`, error);
                return'Error generating key';
            }
        };

        try {
            const keys = awaitPromise.all(
                games.map(game =>generateKey(game.appToken, game.promoId))
            );
            res.status(200).json(keys);
        } catch (error) {
            console.error('Error generating keys:', error);
            res.status(500).json({ error: 'Failed to generate keys' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
