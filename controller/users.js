const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Contacts').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users)
    });
}; 

const getSingle = async (req, res) => {
    const UserId1 = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('Contacts').find({_id: UserId1});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0])
    });
}; 

const createUser = async(req, res) => {
    //const userId = new ObjectId(req.parmas.id);
    const user = {
        First_name: req.body.First_name,
        Last_name: req.body.Last_name,
        Email: req.body.Email,
        Favorite_color: req.body.Favorite_color,
        Birthday: req.body.Birthday
        };
    const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(user);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating contact');
    }
};
const updateUser = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        First_name: req.body.First_name,
        Last_name: req.body.Last_name,
        Email: req.body.Email,
        Favorite_color: req.body.Favorite_color,
        Birthday: req.body.Birthday
    };
    const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating contact');
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({_id: userId});
    if (response.deleteCount > 0 ){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting contact');
    }
}
 
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};