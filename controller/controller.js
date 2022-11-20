const User = require('../models/user-model');

const bcrypt = require('bcryptjs');
const Geo = require('geo-nearby');
var geohash = require('ngeohash');

const activeUsers = []



exports.user_locations = async (req, res) => {
    const { userid, startObject, endObject } = req.body;
    const user = await User.findByIdAndUpdate(userid, { startLocation: startObject, endLocation: endObject });
    res.send({ error: false, message: 'User locations updated successfully' });
}

exports.nearby_users = async (req, res) => {
    const { userid } = req.params;
    const user = await User.findById(userid);
    // const { coordinates, users } = req.body;
    const latitude = user.startLocation.coordinates[1];
    const longitude = user.startLocation.coordinates[0];
    let users = await User.find();
    // let users = await User.find({ _id: { $in: activeUsers } });
    users = users.filter(user => user.id !== userid && user.startLocation)
    const data = users.map(user => {
        if (user.startLocation) {
            return [user?.startLocation?.coordinates[1], user?.startLocation?.coordinates[0], user.id]
        }
    })
    const nearbyUsers = []
    for (let i = 0; i < data.length; i++) {
        const res = await User.findById(data[i][2])
        nearbyUsers.push(res)
    }
    let nearbyUsersData = []
    if (data.length > 0) {
        const dataSet = Geo.createCompactSet(data);
        const geo = new Geo(dataSet, { sorted: true });
        const nearby = geo.nearBy(latitude, longitude, 2000);
        for (let i = 0; i < nearby.length; i++) {
            const val = await User.findById(nearby[i].i)
            nearbyUsersData.push(val)
        }
    }
    res.send({ nearbyUsersData, user });
}