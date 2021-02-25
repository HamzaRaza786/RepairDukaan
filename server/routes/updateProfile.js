const router = require("express").Router();
const user = require("../models/User")
//onst repairs = require("../models/Repair")
//const authorization = require("../middleware/authorization");
//const { Router } = require("express");

router.post("/api/user/updateprofile", (req, res) => {
    const { testID, firstName, lastName } = req.body;

    user.findByIdAndUpdate(testID, { first_name: firstName, last_name: lastName }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json({
                "first_name": docs.first_name,
                "last_name": docs.last_name,
                "date_joined": docs.join_date,
            })
        }
    }).lean();
});
module.exports = router;