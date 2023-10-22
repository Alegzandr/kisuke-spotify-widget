import { Router } from 'express';
import { handleNowPlaying } from '../controllers/nowPlayingController';

const router = Router();

router.get('/now-playing/:uuid', handleNowPlaying);

export default router;
