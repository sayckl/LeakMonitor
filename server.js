require('dotenv').config();
const express = require('express');
const path = require('path');
const checkRouter = require('./routes/check');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/check', checkRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
