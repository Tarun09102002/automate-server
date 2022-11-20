const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const controller = require('./controller/controller');
const Geo = require('geo-nearby');
var geohash = require('ngeohash');

const userClass = require('./controller/userClass')
const routeClass = require('./controller/routeClass')

let server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server started on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // server = 
    })
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/users/register', userClass.register_user)

app.post('/users/login', userClass.login_user)

app.post('/user/locations', routeClass.user_locations)

app.get('/user/nearby/:userid', routeClass.nearby_users)

module.exports = server;