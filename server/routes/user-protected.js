import { Router } from 'express';
import { MySqlUserStore } from '../models/MySqlUserStore.js';
import basicAuth from 'express-basic-auth';

const userStore = new MySqlUserStore();

const router = Router();

router.use(basicAuth({
    users: {
        [process.env.USER_SERVICE_USER]: process.env.USER_SERVICE_KEY
    }
}))

router.get('/hello', (req, res) => {
    res.json('ok!');
});

router.post('/', async (req, res, next) => {
    try {
        res.json(await userStore.create(req.body));
    } catch (e) {
        next(e);
    }
});

export default router;