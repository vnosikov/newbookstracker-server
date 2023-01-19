require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

const connectionString = `mongodb+srv://adminprod:${process.env.MONGODB_KEY}@prodcluster.pc2bg.mongodb.net/newdb?retryWrites=true&w=majority`;

const cors = require('cors');
app.use(cors({origin: ['http://localhost:5173', 'https://bookstracker.cyclic.app'] }));

mongoose.connect(connectionString).then(
  () => {
    require('./routes/books')(app);

    app.listen(PORT, () => {
      console.log('Listening');
    });
  }
);
