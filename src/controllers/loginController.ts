import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { saveToken } from '../models/tokenModel';

dotenv.config();

export const handleLogin = (_request: Request, response: Response) => {
    const scopes = 'user-read-currently-playing';

    response.redirect(
        'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            process.env.SPOTIFY_CLIENT_ID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(process.env.REDIRECT_URI as string)
    );
};

export const handleCallback = async (request: Request, response: Response) => {
    const code = request.query.code || null;
    const base64credentials = Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
    ).toString('base64');

    try {
        const fetchResponse = await fetch(
            'https://accounts.spotify.com/api/token',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + base64credentials,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `code=${code}&redirect_uri=${encodeURIComponent(
                    process.env.REDIRECT_URI as string
                )}&grant_type=authorization_code`,
            }
        );

        const data = await fetchResponse.json();
        const access_token = data.access_token;

        const uuid = uuidv4();
        await saveToken(uuid, access_token);

        response.redirect(`/now-playing/${uuid}`);
    } catch (error) {
        response.send(error);
    }
};
