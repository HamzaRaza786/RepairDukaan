const router = require("express").Router();
const bcrypt = require('bcrypt-nodejs');
const user = require("../models/User")
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");
router.post("/user/submit",authorization, async(req,res) => {
    const { user_id,
        customer_id,
        price,
        repair_id,
        repair_type,
        status,
        location: {
            latitude,
            longitude
        }} = req.body;
});