const User = require('../model/user');

exports.dashboard = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.status(200).json(allUser);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.profile = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.status(200).json(allUser);
    } catch (err) {
        res.status(400).json(err)
    }
}