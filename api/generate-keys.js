import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default async (req, res) => {
    if (req.method === 'GET') {
        const appTokens = [
            'd28721be-fd2d-4b45-869e-9f253b554e50',
            'd1690a07-3780-4068-810f-9b5bbf2931b2',
            '74ee0b5b-775e-4bee-974f-63e7f4d5bacb',
            '82647f43-3f87-402d-88dd-09a90025313f',
            '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
            '61308365-9d16-4040-8bb0-2f4a4c69074c'
        ];

        const generateKey = async (appToken) => {
            try {
                const response = await axios.post('https://api.gamepromo.io/promo/create-code', {
                    promoId: uuidv4()
                }, {
                    headers: {
                        'Authorization': `Bearer ${appToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data.promoCode;
            } catch (error) {
                console.error('Error generating key:', error);
                return 'Error generating key';
            }
        };

        try {
            const keys = await Promise.all(appTokens.map(generateKey));
            res.status(200).json(keys);
        } catch (error) {
            console.error("Failed to generate keys:", error);
            res.status(500).json({ error: 'Failed to generate keys' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
