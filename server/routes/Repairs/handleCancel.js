const router = require("express").Router();
const repair = require("../../models/Repair")
const worker = require("../../models/Worker")
const authorization = require("../../middleware/authorization");
router.post("/user/cancel", authorization,async(req,res) => {
    try {
    const { repair_id,
        time,
        repair_type
        } = req.body;
        const repair_1 = await repair.findOne({_id:repair_id});
        const worker_1 = await worker.findOne({ _id:repair_1.worker_id });
        worker_1.status = "Available"
        if(repair_type=="Car"){
            if(time > 5)
            res.status(200).json({ status: "Booking Cancelled",details:{
                user_id:repair_1.user_id,
                worker_id:worker_1._id,
                location:repair_1.location,
                status:"Cancelled",
                amount:150
            } });
            else
                res.status(200).json({ status: "Booking Cancelled",details:{
                    user_id:repair_1.user_id,
                    worker_id:worker_1._id,
                    location:repair_1.location,
                    status:"Cancelled",
                    amount:0
                } });
            }
        else{
            if(time > 5)
            res.status(200).json({ status: "Booking Cancelled",details:{
                user_id:repair_1.user_id,
                worker_id:worker_1._id,
                location:repair_1.location,
                status:"Cancelled",
                amount:50
            } });
            else
                res.status(200).json({ status: "Booking Cancelled",details:{
                    user_id:repair_1.user_id,
                    worker_id:worker_1._id,
                    location:repair_1.location,
                    status:"Cancelled",
                    amount:0
                } });
        }
            
}
    catch(err){
        console.log(err);
        res.status(400).json({error:err})
    }
});
module.exports = router;