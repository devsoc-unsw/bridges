const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
