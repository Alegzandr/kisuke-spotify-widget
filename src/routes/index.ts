import { Router, static as expressStatic } from 'express';
import path from 'path';

const router = Router();

router.use('/public', expressStatic(path.resolve(__dirname, '../public')));

router.get('/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/home.html'));
});

export default router;
