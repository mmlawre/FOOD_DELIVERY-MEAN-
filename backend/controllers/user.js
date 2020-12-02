const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");

exports.register = (req, res) => {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephone: req.body.telephone,
        active: true,
    });

    user.save((err, newUser) => {
        if (err) {
            return res.status(422).send(err);
        }
        const token = jwt.sign(
            { email: newUser.email, userId: newUser._id },
            process.env.JWT_KEY
        );
        res.json({ user: newUser, token });
    });
};

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return res.status(401).send(err);
        }
        if (!user) {
            return res.status(401).send({ message: 'Email or Password Invalid' });
        }
        user.verifyPassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    process.env.JWT_KEY
                );
                res.json({ token, user });
            } else {
                res.status(401).send({ message: 'Email or Password Invalid' });
            }
        });
    });
};

exports.get_all = (req, res) => {
    User.find({ active: true }, (err, users) => {
        if (err) {
            return res.status(422).send(err);
        }

        res.json(users);
    });
};

exports.get_one = (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            return res.status(422).send(err);
        }

        res.json(user);
    });
};

exports.update = (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            return res.status(422).send(err);
        }
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        }

        user.set(req.body);
        user.save((err, updatedUser) => {
            if (err) {
                return res.status(422).send(err);
            }

            res.json(updatedUser);
        });
    });
};

exports.delete = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId }, (err, result) => {
        if (err) {
            return res.status(422).send(err);
        }
        if (result && result.deletedCount > 0) {
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    });
};
