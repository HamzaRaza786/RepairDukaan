const router = require("express").Router();
const bcrypt = require('bcrypt-nodejs');
const user = require("../models/User")
const jwtGenerator = require("../utils/jwtGenerator");
router.post("/signup/customer",async(req,res) => {
    try{
        const {first_name,last_name,email,phone,password} = req.body;
        const user_1 = await user.findOne({email})

        if (user_1){
            return res.status(401).json("User already exist");
        }
        else {
            const saltRound = 10;
            const salt = bcrypt.genSaltSync(saltRound);
            const hash = bcrypt.hashSync(password, salt);
            let newUser = await user.create({
                "user_type": "Customer",
                "first_name":first_name,
                "last_name" :last_name,
                "join_date": new Date(Date.now()).toLocaleString().split(',')[0],
                "email" : email,
                "password" : hash,
                "phone_number": phone 
            });
            const token = jwtGenerator(newUser._id);
            res.json({token});
        }
    }catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error " + err);
    }
});
router.route('/').get((req, res) => {
    user.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;