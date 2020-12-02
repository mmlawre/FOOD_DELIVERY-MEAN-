const jwt = require("jsonwebtoken");

const Inventory = require("../models/inventory.model.js");

exports.create = (req, res) => {
 
    const inventory = new Inventory({
        userID: req.body.userID,
        itemName: req.body.itemName,
        itemCategory: req.body.itemCategory,
        price: req.body.price,
        stock: req.body.stock,
      });
    
    inventory.save((err, newInventory) => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json({ inventory: newInventory});
    });
};

exports.get = (req, res) => {
    Inventory.find({userID : req.params.userID}, (err, inventories) => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json(inventories);
    });
};

exports.get_one = (req, res, next) => {
    Inventory.findById(req.params.userID, (err, user) => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json(user);
    });
};

exports.update = (req, res, next) => {
    Inventory.findById(req.params.id, (err, inventory) => {
        if (err) {
            return res.status(422).send(err);
        }
        if (!inventory) {
            res.status(404).send({ message: 'Inventory not found' });
        }

        inventory.set(req.body);
        inventory.save((err, updatedUser) => {
            if (err) {
                return res.status(422).send(err);
            }
            res.json(updatedUser);
        });
    });
};

exports.delete = (req, res, next) => {
    Inventory.deleteOne({ _id: req.params.id }, (err, result) => {
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
