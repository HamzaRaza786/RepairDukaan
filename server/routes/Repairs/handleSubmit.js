const router = require("express").Router();
const user = require("../../models/User")
const repair = require("../../models/Repair")
const worker = require("../../models/Worker")
const authorization = require("../../middleware/authorization");
router.post("/user/submit",authorization, async(req,res) => {
    try {
    const { user_id,
        location: {
            latitude,
            longitude
        },
        repair_type,
        } = req.body;
        const user_1 = await user.findOne({ _id:user_id });
        const worker_1 = await worker.findOne({status:"Available"});
        if(user_1){
            if(worker_1){
                if(repair_type=="Car"){
            let newRepair = await repair.create({
                user_id:user_1._id,
                worker_id:worker_1._id,
                location,
                status:"In Progress",
                amount:300
            });
            res.status(200).json({ status: "Repair Booked",details:{
                user_id:user_1._id,
                worker_id:worker_1._id,
                location,
                status:"In Progress",
                amount:300
            } });
        }
        else{
            let newRepair = await repair.create({
                user_id:user_1._id,
                worker_id:worker_1._id,
                location,
                status:"In Progress",
                amount:300
            });
            res.status(200).json({ status: "Repair Booked",details:{
                id:newRepair._id,
                user_id:user_1._id,
                worker_id:worker_1._id,
                location,
                status:"In Progress",
                amount:150
            } });
        }
    }
    else{
        res.status(200).json({ status: "Sorry No worker Available"});
    }
}
else{
    res.status(401).json({ status: "Invalid User"});
}
}
    catch(err){
        console.log(err);
    }
});
module.exports = router;