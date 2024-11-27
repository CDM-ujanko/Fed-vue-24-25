import 'dotenv/config'
import express from 'express';

const app = express();

const PORT = process.env.PORT;

app.get('/admin', (req, res) => {
    res.send('Welcome to my admin page!!');
})

app.get('/json', (req, res) => {
    res.json([{ name: 'Boban', occupation: 'runner!' }]);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});