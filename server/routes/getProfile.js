const router = require("express").Router();
const user = require("../models/User")
const repairs = require("../models/Repair")
const authorization = require("../middleware/authorization");
const { Router } = require("express");

router.get("/getprofile", (req, res) => {
	try {

		const {testID} = req.body

		const query = user.findById({_id: testID}).lean()

		query.select('first_name last_name join_date')

		query.exec(function (err, docs) {
			res.status(200).json({
				"first_name": docs.last_name,
				"last_name": docs.last_name,
				"date_joined": docs.join_date,
			})
		})
	}
	catch (err) {
		console.log(err)
	}
});
module.exports = router;