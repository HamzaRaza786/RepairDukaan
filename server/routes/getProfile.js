const router = require("express").Router();
const user = require("../models/User")
const repairs = require("../models/Repair")
const authorization = require("../middleware/authorization");
const { Router } = require("express");

router.get("/api/user/getprofile", (req, res) => {
	const { testID } = req.body

	user.findById({ _id: testID }, function(err, docs) {
		if(err) {
			console.log(err)
		}
		else {
			res.status(200).json({
				"first_name": docs.first_name,
				"last_name": docs.last_name,
				"date_joined": docs.join_date
			})
		}
	}).lean();
});

module.exports = router