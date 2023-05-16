const User = require('../models/user.model');

const getUsers = async (req, res) => {
    const { city, address, name } = req.query;
    
    try {
        const users = await User.find(city, address, name);
        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the users.',
            data: users,
        });
    } catch (err) {
        res.status(404).send({ statusCode: 404, statusMessage: 'Internal Server Error', message: null, data: null});
        console.log("Это доказывает что у тебя не получилось",city,address,name);
    }
};

const addUser = async (req, res) => {
    const { name, address, kub, deltakub } = req.body;
    if (kub == null || kub < 0)
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        const user = new User({ name, address, kub, deltakub });
        await user.save();

        res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            message: 'Successfully created a user.',
            data: null,
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const updateUser = async (req, res) => {
    const kub = req.params.kub;
    if (kub == null || kub < 0)
        return res.status(400).send({ statusCode: 400, statusMessage: 'Bad Request', message: null, data: null });

    try {
        await User.findByIdAndUpdate(kub, req.body);

        return res.status(202).send({
            statusCode: 202,
            statusMessage: 'Accepted',
            message: 'Successfully updated a user.',
            data: null,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: null,
            data: null,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.kub);

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully deleted a user.',
            data: null,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
};
