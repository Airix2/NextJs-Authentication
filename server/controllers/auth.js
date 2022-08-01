import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        //console.log(req.body)
        const { name, email, password } = req.body

        // Validation
        if (!name) return res.status(400).send('Name is required')
        if (!password || password.length < 3) {
            return res.status(400).send('Password is required and should be min 3 characters long')
        }
        let userExist = await User.findOne({email}).exec();
        if (userExist) return res.status(400).send('Email is taken')

        // Hash Password
        const hashedPassword = await hashPassword(password)

        // Register
        const user = new User({
            name, email, password: hashedPassword
        })
        await user.save();
        // console.log('saved user', user);
        return res.json({ok: true})
        
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error. Try Again')
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body

        const user = await User.findOne({email}).exec();
        if (!user) return res.status(400).send("No use found");

        const match = await comparePassword(password, user.password);

        // Create Signed JWT
        const token = jwt.sign(
            { _id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user and token to client, exclude hashed pass
        user.password = undefined;
        
        // Make HTTP only signed so it's not accesible in client side
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, // Only works on https
        });

        // Send user as json response
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error. Try Again')
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({message: 'Signout success'})
    } catch(err) {
        console.log(err)
        return res.status(400).send('Error. Try Again')
    }
}

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').exec();
        console.log('user',user);
        return res.json(user)
    } catch(err) {
        console.log(err);
    }
}