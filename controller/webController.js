const { default: mongoose } = require('mongoose');

exports.index = async (req, res) => {
    try {
        res.status(200).json({'status':'success', 'message':'This is first base route.'});
    } catch (err) {
        res.status(400).json(err)
    }
}