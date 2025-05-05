import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const message = 'Hello, World!';
    res.send(message);
});

app.listen(PORT, () => {
    console.log(`Express server is running at http://localhost:${PORT}`);
    console.log(`Server is running at http://localhost:${PORT}`);
});