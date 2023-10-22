import { Request, Response, Router, static as expressStatic } from 'express';
import path from 'path';
import { handleLogin, handleCallback } from '../controllers/loginController';

const router = Router();

router.use('/', expressStatic(path.resolve(__dirname, '../public')));

router.get('/login', handleLogin);

router.get('/callback', handleCallback);

router.get('/now-playing/:id', (_request: Request, response: Response) => {
    response.sendFile(path.resolve(__dirname, '../views/widget.html'));
});

router.get('/', (_request: Request, response: Response) =>
    response.sendFile(path.resolve(__dirname, '../views/home.html'))
);

export default router;
