import 'dotenv/config'
import express from 'express';
import { getAll, getPost } from './data/posts.js';

const app = express();

const PORT = process.env.PORT;

// Start server
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

app.use(express.static('static'));


app.get('/admin', (req, res) => {
    res.send('Welcome to my admin page!!');
})

app.get('/json', (req, res) => {
    res.json([{ name: 'Boban', occupation: 'runner!' }]);
})

app.get('/post', async (req, res) => {
    try {
        let offset = req.query.offset ? parseInt(req.query.offset) : 0;
        let limit = req.query.limit ? parseInt(req.query.limit) : 6;
        let posts = getAll();

        res.json({
            posts: posts.slice(offset, offset + limit),
            totalSize: posts.length
        });

    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/post/:id', (req, res) => {
    try {
        let post = getPost(req.params.id);
        res.json(post);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});