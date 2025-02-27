const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req,res) => {
    try {

        const {name,email,password,worth} = req.body;

        // Added JOI validation for fields.

        // if([name,email,password,worth].some((fields) =>
        // fields?.trim() === "" )){
        //     return res.status(400).send(`Please provide the missing fields`);  
        // }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).send(`Email is already registered`);
        }

        const hasPassword = await bcrypt.hash(password,8);

        const createUser = await User.create({name,email,password : hasPassword,worth});
        await createUser.save();

        res.status(201).send(`${createUser.name} registered successfully.`)
        
    } catch (error) {
        console.log(`Error while registering user : ${error}`);
        res.status(500).send(`Something went wrong.`);
    }
}

const userLogin = async(req,res) => {
    try { 
        const { email, password } = req.body;

        // Added JOI validations for fields
        
        // if(!email || email == null || email == "" || email == undefined){
        //     return res.status(400).send(`Please provide email.`);
        // }

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).send(`User is not registered.`);
        }

        const validPassword = await bcrypt.compare(password, userExist.password);        

        if(!validPassword){
            return res.status(400).send(`Incorrect password.`);
        }
        
        const token = jwt.sign({
            name : userExist.name,
            email : userExist.email,
            worth : userExist.worth
        },
            process.env.SECRET,
       {
            expiresIn : 600
       });

       const loggedInUser = await User.findOne({email}).select("-password")

       res.status(200).send({
        User : loggedInUser,
        Token : token
       });

    } catch (error) {
        console.log(`Error while login ${error}`);
        res.status(500).send(`Something went wrong.`);
    }
}

module.exports = { registerUser, userLogin }