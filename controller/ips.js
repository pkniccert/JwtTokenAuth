const { default: mongoose } = require('mongoose');
const Ip = require('../model/ip');

exports.index = async (req, res) => {
    try {
        const allip = await Ip.find({});
        res.status(200).json(allip);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.create = async (req, res) => {
    try {
        // Get ip input
        const { type, endpoint } = req.body;

        // Validate ip input
        if (!(type && endpoint)) {
            res.status(400).json({ 'message': 'All input is required' });
        }

        // check if ip already exist
        // Validate if ip exist in our database
        const oldip = await Ip.findOne({ endpoint });

        if (oldip) {
            return res.status(409).json({ 'message': 'IP Already Exist. Please Login' });
        }

        // Create ip in our database
        const ip = await Ip.create({
            type,
            endpoint,
        });
        res.status(201).json(ip);
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.unique = async (req, res) => {
    try {
        const { endpoint } = req.body;
        const uniqueIp = await Ip.findOne({ endpoint });
        if (uniqueIp) {
            res.status(200).json({ 'status': 'success', 'data': uniqueIp });
        } else {
            res.status(400).json({ 'status': 'error', 'message': 'This ' + endpoint + ' is not exist!..' });
        }
    } catch (err) {
        res.status(400).json({ 'status': 'error', 'message': err });
    }
}

exports.update = async (req, res) => {
    try {
        const { type, endpoint } = req.body;
        const filter = req.params.id;
        const options = { new: true };
        const updateDoc = {
            $set: {
                type: type,
                endpoint: endpoint
            },
        };
        if (!mongoose.Types.ObjectId.isValid(filter)) {
            res.status(401).json({ 'status': 'error', 'message': "Invalid ObjectId.!" });
        }
        const result = await Ip.findByIdAndUpdate(filter, updateDoc, options);

        if (!result) {
            res.status(401).json({ 'status': 'error', 'message': "Document Note Found.!" });
        } else {
            res.status(200).json({ 'status': 'sucess', 'data': result });
        }
    } catch (err) {
        res.status(500).json({ 'status': 'error', 'message': err.codeName });
    }
}

exports.ipStatus = async (req, res) => {
    try {
        const { endpoint } = req.body;
        const uniqueIp = await Ip.findOne({ endpoint });
        if (uniqueIp) {
            if (uniqueIp.status == 1) {
                result = await uniqueIp.update({ $set: { status: 0 } });
                if (result.acknowledged == true) {
                    message = 'Status successfully update.';
                } else {
                    message = 'Something wrong.';
                }
            } else {
                result = await uniqueIp.update({ $set: { status: 1 } });
                if (result.acknowledged == true) {
                    message = 'Status successfully update.';
                } else {
                    message = 'Something wrong.';
                }
            }
            res.status(200).json({ 'status': 'success', 'message': message });
        } else {
            res.status(400).json({ 'status': 'error', 'message': 'This ' + endpoint + ' is not exist!..' });
        }
    } catch (err) {
        res.status(400).json({ 'status': 'error', 'message': err.message });
    }
}


