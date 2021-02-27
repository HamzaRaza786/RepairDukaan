const router = require("express").Router();
const user = require("../models/User")
const authorization = require("../middleware/authorization");

<<<<<<< HEAD
router.get("/api/customer/getprofile", authorization, (req, res) => {
	user.findById({ _id: req.user }, function(err, docs) {
=======
router.get("/api/user/getprofile",authorization, (req, res) => {
	const { testID } = req.body

	user.findById({ _id: testID }, function(err, docs) {
>>>>>>> 43a42d5ccebc24624d339cae6f84da9050a383a1
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