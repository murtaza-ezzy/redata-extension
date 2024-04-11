const Tracking = require('../models/tracking.model');

module.exports = {
    async add(req, res) {
        try {
            const { url, time } = req.body;
            const startOfDay = new Date();
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setUTCHours(23, 59, 59, 999);

            const existingTracking = await Tracking.findOne({
                uid: req.session.user._id,
                url,
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            });

            if (existingTracking) {
                existingTracking.time = time;
                await existingTracking.save();
                res.status(200).send({ message: 'Tracking updated successfully' });
            } else {
                const tracking = new Tracking({ url, uid, time });
                await tracking.save();
                res.status(200).send({ message: 'Tracked successfully' });
            }
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    async get(req, res) {
        let tracking = await Tracking.find({ uid: req.session.user._id });
        res.json(tracking);
    }
}