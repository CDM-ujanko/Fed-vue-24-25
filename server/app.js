import 'dotenv/config'
import express from 'express';
import multer from 'multer';

import { FSPostStore } from './models/FSPostStore.js';

const app = express();

const PORT = process.env.PORT;

const store = new FSPostStore();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'static/post-images'),
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
    console.log(req.file, req.body);
    if (!req.file) {
        res.status(400).json('File is required');
        return;
    }

    let item = req.body;
    item.picture = req.file.path.replace('static', '');

    res.json(await store.create(item));
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});