const Mapping = require('../models/mapping.model');

module.exports = {
    async add(req, res) {
        try {
            const mapping = new Mapping(req.body);
            await mapping.save();
            res.status(201).send(mapping);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    async get(req, res) {
        try {
            const mapping = await Mapping.find();
            res.status(200).send(mapping);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}