const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");


let connectionString = process.env.MONGO_URL;


async function initialize(){

    await mongoose.connect(connectionString);

}


async function registerUser(userName, password, password2){

    if(password !== password2){
        throw new Error("Passwords do not match");
    }


    const existingUser = await User.findOne({
        userName:userName
    });


    if(existingUser){
        throw new Error("User already exists");
    }


    const hashPassword = await bcrypt.hash(password,10);


    const newUser = new User({

        userName:userName,

        password:hashPassword,

        favourites:[]

    });


    await newUser.save();


    return true;

}



async function checkUser(userName,password){


    const user = await User.findOne({
        userName:userName
    });


    if(!user){
        throw new Error("User not found");
    }


    const validPassword =
        await bcrypt.compare(password,user.password);


    if(!validPassword){
        throw new Error("Invalid password");
    }


    return user;

}


async function getFavourites(userName){

    const user = await User.findOne({
        userName:userName
    });
    if(!user){
        throw new Error("User not found");
    }

    return user.favourites;

}

async function getUserByUserName(userName){

    const user = await User.findOne({
        userName:userName
    });

    if(!user){
        throw new Error("User not found");
    }

    return user;

}

async function addFavourite(userName,id){

    const user = await User.findOne({
        userName:userName
    });


    if(!user){
        throw new Error("User not found");
    }

    if(!user.favourites.includes(id)){

        user.favourites.push(id);

        await user.save();

    }


    return user.favourites;

}



async function removeFavourite(userName,id){

    const user = await User.findOne({
        userName:userName
    });

    if(!user){
        throw new Error("User not found");
    }

    user.favourites =
        user.favourites.filter(
            fav => fav !== id
        );


    await user.save();


    return user.favourites;

}



module.exports = {

    initialize,

    registerUser,

    checkUser,

    getUserByUserName,

    getFavourites,

    addFavourite,

    removeFavourite

};