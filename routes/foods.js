const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middelware/auth");

const User = require('../models/User')
const Food = require ('../models/Food')
//@route            GET  api/contacts
//@description      Get all users contacts
//@access           Private
router.get('/', auth, async(req, res)=>{
    try{
        const foods = await Food.find({ user: req.user.id}).sort({ date: -1})
        res.json(foods)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route            POST  api/users
//@description      Add new contact
//@access           Private
router.post('/', auth, [ [
    check('name', 'Name is required')
    .not()
    .isEmpty()
    ]
],  async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, carbs, fat } = req.body;
    try {
        const newFood = new Food({
            name,
            carbs,
            fat,
            user: req.user.id
        });

        const food = await newFood.save();

        res.json(food)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route            PUT  api/contacts/:id
//@description      update contact
//@access           Private
router.put('/:id', auth, async(req, res)=>{
    const { name, carbs, fat } = req.body;
    //build a contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(carbs) contactFields.carbs = email;
    if(fat) contactFields.fat = phone;

    try {
        let food = await Food.findById(req.params.id);
        if(!food) return res.status(404).json({ msg: 'Contact not found'});

        //Make sure user owns contact
        if(food.user.toString() !== req.user.id){
            return res.status(401).jason({ msg: 'Not authorized'});
        }
        food = await Food.findByIdAndUpdate(req.params.id,
             { $set:contactFields},
              {new: true})


            res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// //@route            DELETE  api/users/:id
// //@description      delete contact
// //@access           Private
router.delete('/:id', auth, async(req, res)=>{
    try {
        let food = await Food.findById(req.params.id);
        if(!food) return res.status(404).json({ msg: 'Contact not found'});

        //Make sure user owns contact
        if(food.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized'});
        }
        await Food.findByIdAndRemove(req.params.id);
            res.json({ msg: "Contact removed "});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;