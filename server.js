require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth')

const app = express();
app.use((req, res, next) => {
    console.log('Middleware function');
    next(); // Pass control to the next middleware function
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));
app.use('/auth', authRoutes);


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('connected to mongoDB');
}).catch(err => {
    console.log(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});