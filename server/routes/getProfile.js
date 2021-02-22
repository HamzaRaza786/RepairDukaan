const router = require("express").Router();
const user = require("../models/User")
const repairs = require("../models/Repair")
const authorization = require("../middleware/authorization");

router.get("/api/user/getprofile", authorization, async (req, res) => {
	const user_profile = await user.findOne()
    
});