const express = require('express');

const walletRoutes = require('./routes/api/wallet');
const transactionRoutes = require('./routes/api/transaction');
const userRoutes = require('./routes/api/user');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World'));

//Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, (req, res) => console.log(`listening on port ${PORT}`));
