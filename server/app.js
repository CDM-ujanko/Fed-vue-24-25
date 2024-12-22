import 'dotenv/config'
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

import { FSPostStore } from './models/FSPostStore.js';

const app = express();

const PORT = process.env.PORT;

const store = new FSPostStore();

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
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

app.use(express.static('static'));


app.get('/post', async (req, res) => {
    try {
        let offset = req.query.offset ? parseInt(req.query.offset) : 0;
        let limit = req.query.limit ? parseInt(req.query.limit) : 6;

        res.json(store.list(offset, limit));
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/post/:id', (req, res) => {
    try {
        let post = store.read(req.params.id)
        res.json(post);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.post('/post', upload.single('picture'), async (req, res) => {
    if (!req.file) {
        res.status(400).json('File is required');
        return;
    }

    let item = req.body;
    item.picture = req.file.path.replace(STATIC_DIR, '');

    res.json(await store.create(item));
});

app.post('/post/:id', upload.single('picture'), async (req, res) => {
    console.log(req.file, req.body);
    try {
        let post = store.read(req.params.id)
        let item = req.body;

        post = { ...post, ...item }

        if (req.file) {
            console.log('picure we have');
            post.picture = req.file.path.replace(STATIC_DIR, '');
        }

        res.json(await store.update(item));
    }

    catch (e) {
        res.status(400).json(e.message);
    }
})

app.get('/post/:id/delete', (req, res) => {
    try {
        let id = store.delete(req.params.id)
        res.json(id);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/gallery', async (req, res) => {
    let paths = (await fs.readdir(STATIC_DIR + POST_IMAGE_LOCATION))
        .map(p => `${POST_IMAGE_LOCATION}/${p}`);
    res.json(paths);
})

app.post('/upload', upload.single('picture'), async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});