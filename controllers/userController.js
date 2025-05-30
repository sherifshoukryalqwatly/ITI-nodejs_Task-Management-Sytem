const User = require('../models/userModel.js');

const updateUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findOneAndUpdate(id,req.body,{new:true,runValidators:true});
        res.json(user);
    } catch (error) {
        res.json({error});
    }
}

const deleteUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const data = await User.deleteOne({_id:id});
        res.json(data);
    } catch (error) {
        res.json({error});
    }
}

const deleteAllUsers = async ()=> {
    try {
        const data = await User.deleteMany({});
        res.json(data);
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    deleteAllUsers
}