import { Request, Response } from 'express';
import Token from '../models/tokenModel';

export const handleNowPlaying = async (
    request: Request,
    response: Response
) => {
    const uuid = request.params.uuid;

    try {
        const tokenData = await Token.findOne({ uuid });
        if (!tokenData) {
            return response.status(404).send('Not Found');
        }

        const access_token = tokenData.access_token;

        const fetchResponse = await fetch(
            'https://api.spotify.com/v1/me/player/currently-playing',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            response.json({ song: data.item.name });
        } else {
            response.sendStatus(fetchResponse.status);
        }
    } catch (error) {
        response.send(error);
    }
};
