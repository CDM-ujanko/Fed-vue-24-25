// @ts-nocheck
import 'dotenv/config'
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt'

import userProtectedRoutes from './routes/user-protected.js';

//import { FSPostStore } from './models/FSPostStore.js';
import { MySqlPostStore } from './models/MySqlPostStore.js';
import { MySqlUserStore } from './models/MySqlUserStore.js';

const app = express();

const PORT = process.env.PORT;

const store = new MySqlPostStore();
const userStore = new MySqlUserStore();

const STATIC_DIR = 'static'
const POST_IMAGE_LOCATION = '/post-images'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, STATIC_DIR + POST_IMAGE_LOCATION),
    filename: (req, file, cb) => cb(null, `${Date.now()}.${file.originalname.split('.').slice(-1)}`)
})

const upload = multer({ storage });

// Start server
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.static('static'));

app.use('/user', userProtectedRoutes);

app.use(passport.initialize());

app.get('/post', async (req, res) => {
    try {
        let page = req.query.page ? parseInt(req.query.page) : 0;
        let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 6;

        let start = page * pageSize;
        let end = start + pageSize;

        let posts = await store.list(start, end);
        res.json(posts);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/post/:id', async (req, res) => {
    try {
        let post = await store.read(req.params.id)
        console.log(post);
        res.json(post);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// Create a new post
app.post('/post', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let item = req.body;
    res.json(await store.create(item));
});

// Edit an existing post
app.post('/post/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let post = store.read(req.params.id)
        let item = req.body;

        post = { ...post, ...item }

        res.json(await store.update(item));
    }

    catch (e) {
        console.error(e);
        res.status(400).json(e.message);
    }
})

app.get('/post/:id/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let id = await store.delete(req.params.id);
        res.json(id);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/gallery', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let paths = (await fs.readdir(STATIC_DIR + POST_IMAGE_LOCATION))
        .map(p => `${POST_IMAGE_LOCATION}/${p}`);
    res.json(paths);
})

app.post('/upload', [passport.authenticate('jwt', { session: false }), upload.single('picture')], async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json('File is required');
            return;
        }
        res.json(req.file.path.replace(STATIC_DIR, ''));
    }
    catch (e) {
        res.status(400).json(e.message);
    }
})

app.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json('Invalid username or password!');
    }

    try {
        let match = await userStore.check(req.body.username, req.body.password);
        if (match) {
            let tokenObj = {
                username: req.body.username
            }
            let token = jwt.sign(tokenObj, process.env.JWT_KEY, { expiresIn: '30 days' });
            res.json(token);
        } else {
            res.status(401).json('Invalid username or password!');
        }
    } catch (e) {
        console.error(e);
        res.status(401).json('Invalid username or password!');
    }
});

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
}, async (token, done) => {
    try {
        let user = userStore.read(token.username);
        return user ? done(null, user) : done(null, false);
    } catch (e) {
        return done(e, false)
    }
}))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});