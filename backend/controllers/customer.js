const jwt = require("jsonwebtoken");

const Customer = require("../models/customer.model.js");

exports.create = (req, res) => {
    console.log('requestion body', req.body)
 
    const customer = new Customer({
        userID: req.body.userID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cardType: req.body.cardType,
        cardNumber: req.body.cardNumber,
        exp: req.body.exp,
        cvc: req.body.cvc
      });
    
    customer.save((err, newCustomer) => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json({ customer: newCustomer});
    });
};

exports.get = (req, res) => {
    console.log('called get customers', req.params.userID)
    Customer.find({userID : req.params.userID}, (err, customers) => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json(customers);
    });
};

exports.get_one = (req, res, next) => {
    Customer.findById(req.params.userID, (err, user) => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json(user);
    });
};

exports.update = (req, res, next) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            return res.status(422).send(err);
        }
        if (!customer) {
            res.status(404).send({ message: 'Customer not found' });
        }

        customer.set(req.body);
        customer.save((err, updatedCustomer) => {
            if (err) {
                return res.status(422).send(err);
            }
            res.json(updatedCustomer);
        });
    });
};

exports.delete = (req, res, next) => {
    Customer.deleteOne({ _id: req.params.id }, (err, result) => {
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
