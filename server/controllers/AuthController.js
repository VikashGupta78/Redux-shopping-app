const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the correct field name
        const newUser = new UserModel({ 
            name, 
            email, 
            password: hashedPassword // Use the correct field name
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: "User successfully created",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error in signup",
            success: false,
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(409).json({
                message: "User not exists",
                success: false
            });
        }

        // Hash the password
        const isPassword = await bcrypt.compare(password, user.password);

        //mathing the password
        if(!isPassword){
            return res.status(409).json({
                message: "password incorrect",
                success: false
            });
        }

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '2h'}
        )

        res.status(200).json({
            message: "User logged in",
            success: true,
            token: jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error in login",
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    signup, login
};
