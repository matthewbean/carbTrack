const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require("../middelware/auth");

const { check, validationResult } = require('express-validator')


const User = require('../models/User')

//@route            GET  api/auth
//@description      Get logged in user
//@access           Private
router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//@route            POST  api/auth
//@description      Auth user and get token
//@access           Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter your password').exists()
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ msg: 'Invalid Username/Password'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid Username/Password'})
        }

        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600000
        }, (err, token)=>{
            if(err)throw err;
            res.json({ token });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route            PUT  api/auth
//@description      change goals
//@access           Public
router.put('/', auth, async(req, res)=>{
    const { carbsGoal, fatGoal, id } = req.body;
    //build a contact object
    const goalFields = {};
     goalFields.carbsGoal = carbsGoal;
     goalFields.fatGoal = fatGoal;


    try {
        let user = await User.findById(id);
        if(!user) return res.status(404).json({ msg: 'User not found'});

        //Make sure user owns contact

        user = await User.findByIdAndUpdate(id,
             { $set:goalFields},
              {new: true})


            res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;