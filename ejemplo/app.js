const exress = require('express');
const app = exress();
const router = exress.Router();

app.get('/', (req, res) => {
    res.send({message:'Respuestaa de ejemplo'});
    });

const PORT = 8899;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});