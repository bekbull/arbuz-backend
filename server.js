const app = require('./app');
const port = process.env.PORT || 3000;
const host = 'localhost';

app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
