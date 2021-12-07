const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})