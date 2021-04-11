const router = require("express").Router();
const bcrypt = require('bcrypt-nodejs');
const user = require("../models/User")
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const jwtGenerator = require("../utils/jwtGenerator");
router.post("/signup/customer", validInfo,async (req, res) => {
    try {
        const { fname, email,lname, password, number } = req.body;
        const user_1 = await user.findOne({ email })

        if (user_1) {
            return res.status(401).json("User already exist");
        }
        else {
            const saltRound = 10;
            const salt = bcrypt.genSaltSync(saltRound);
            const hash = bcrypt.hashSync(password, salt);
            let newUser = await user.create({
                "user_type": "Customer",
                "first_name": fname,
                "last_name": lname,
                "join_date": new Date(),
                "email": email,
                "password": hash,
                "phone_number": number
            });
            res.status(200).json({ status: "success" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error " + err);
    }
});
router.post("/login/customer",validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user_1 = await user.findOne({ email }).lean()
        if (!user_1 || user_1.user_type != "Customer") {
            return res.json({ status: 'error', error: 'Invalid username' })
        }
        if (await bcrypt.compareSync(password, user_1.password)) {
            const token = jwtGenerator(user_1._id);
            res.status(200).json({
                status: "success",
                token: token
            })
        }
        else {
            res.status(400).json({ status: 'error', error: 'Invalid password' });
        }
    }
    catch (err) {
        res.status(400).json({ status: "error " + err });
    }
});
router.get("/isverify",authorization,async(req,res) => {
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;