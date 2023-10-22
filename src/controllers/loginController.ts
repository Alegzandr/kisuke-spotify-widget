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
            process.env.CLIENT_ID +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(process.env.REDIRECT_URI as string)
    );
};

export const handleCallback = async (request: Request, response: Response) => {
    const code = request.query.code || null;
    const base64credentials = Buffer.from(
        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
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
        const refresh_token = data.refresh_token;
        const expires_in = data.expires_in;

        const expires_at = new Date();
        expires_at.setSeconds(expires_at.getSeconds() + expires_in);

        const uuid = uuidv4();
        await saveToken(
            uuid,
            access_token,
            refresh_token,
            expires_in,
            expires_at
        );

        response.redirect(`/now-playing/${uuid}`);
    } catch (error) {
        response.send(error);
    }
};

export const refreshAccessToken = async (refresh_token: string) => {
    const base64credentials = Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
    ).toString('base64');

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + base64credentials,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        throw error;
    }
};
