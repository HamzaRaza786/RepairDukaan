const router = require("express").Router();
const user = require("../models/User")
const repairs = require("../models/Repair")
const authorization = require("../middleware/authorization");
const { Router } = require("express");

router.get("/getprofile",(req, res) => {
	try {
		const query = user.findById('602d9002022d673150ce8a28')

		query.select('first_name last_name')

		query.exec(function (err, docs) {
			res.status(200).json({
				"first_name": docs.last_name,
				"last_name": docs.last_name
			})
		})
	}
	catch (err) {
		console.log(err)
	}
});
module.exports = router;