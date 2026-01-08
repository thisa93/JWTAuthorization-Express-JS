import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
dotEnv.config();

//User Registration
export const register = async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = new User({
            userName: req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        await user.save();
        res.status(200).json("User Registered Successfully");
    } catch(error){
        res.status(500).json(error.message);
    }
};

//User Login
export const login = async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json("User not found.");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).json("Wrong Password");

        const token = jwt.sign(
            {id: user._id},
            process.env.JWTSECRET,
            {expiresIn: "1d"}
        );

        res.json({token,user});
    } catch(error){
        res.status(500).json(error.message);
    }
};