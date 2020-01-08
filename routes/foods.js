const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middelware/auth");

const User = require('../models/User')
const Food = require ('../models/Food')
//@route            GET  api/food
//@description      Get all users food
//@access           Private
router.get('/', auth, async(req, res)=>{
    try{
        const foods = await Food.find({ user: req.user.id}).sort({ date: 1})
        res.json(foods)

    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'Server Error'});
    }
});

//@route            POST  api/users
//@description      Add new food
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
    const { name, carbs, fat, date } = req.body;
    try {
        const newFood = new Food({
            name,
            carbs,
            fat,
            date,
            user: req.user.id
        });

        const food = await newFood.save();

        res.json(food)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// //@route            DELETE  api/users/:id
// //@description      delete food
// //@access           Private
router.delete('/:id', auth, async(req, res)=>{
    try {
        let food = await Food.findById(req.params.id);
        if(!food) return res.status(404).json({ msg: 'Food not found'});

        //Make sure user owns food
        if(food.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized'});
        }
        await Food.findByIdAndRemove(req.params.id);
            res.json({ msg: "Food removed "});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;