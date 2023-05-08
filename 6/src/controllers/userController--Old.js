import userModel from "../models/user.model.js";

export const list = async (req,res) => {
    try {
        let users = await userModel.find();
        res.send({result: 'success', payload: users})

    }   catch (error) {
        console.log('Cannot get users with mongoose: ' + error);
    };
};

export const save = async (req, res) => {
    let {firstName, lastName} = req.body;

    if (!firstName||!lastName) {
        return res.send({status: 'error', error: 'Incomplete values'});
    };

    let result = await userModel.create({
        firstName,
        lastName
    });

    res.send({status: 'success', payload: result});
};

export const update = async (req, res) => {
    let {uid} = req.params;
    let userToReplace = req.body;
    if (!userToReplace.firstName||!userToReplace.lastName) {
        return res.send({status: 'error', error: 'Incomplete values'});
    }

    let result = await userModel.updateOne({_id: uid}, userToReplace)
    res.send({status: 'success', payload: result})
};

export const deleteOne = async (req, res) => {
    let {uid} = req.params;
    console.log(uid.length)
    // res.send({status: 'success', payload: uid.length})    
    if (uid.length !== 24) {
        res.send({status: 'error', error: 'Incorrect id'})
    }
    let result = await userModel.deleteOne({_id: uid})
    res.send({status: 'success', payload: result})
};