import { Request, Response } from 'express';
import Token from '../models/tokenModel';
import { refreshAccessToken } from './loginController';

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

        let { access_token, refresh_token, expires_in, expires_at } = tokenData;

        if (
            refresh_token &&
            expires_in &&
            expires_at &&
            new Date() >= new Date(expires_at)
        ) {
            access_token = await refreshAccessToken(refresh_token);

            const newExpires_at = new Date();
            newExpires_at.setSeconds(newExpires_at.getSeconds() + expires_in);

            tokenData.access_token = access_token;
            tokenData.expires_at = newExpires_at;
            await tokenData.save();
        }

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
            response.json(data);
        } else {
            response.sendStatus(fetchResponse.status);
        }
    } catch (error) {
        response.send(error);
    }
};
