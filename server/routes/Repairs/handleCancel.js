const router = require("express").Router();
const repair = require("../../models/Repair")
const worker = require("../../models/Worker")
const authorization = require("../../middleware/authorization");
router.post("/user/cancel", async(req,res) => {
    try {
    const { repair_id,
        time
        } = req.body;
        var amount = 0
       // console.log(repair_id)
        const repair_1 = await repair.findById(repair_id);
        const worker_1 = await worker.findByIdAndUpdate(repair_1.worker_id,{status:"Available"});
        //worker_1.status = "Available"
        //repair_1.status="Cancelled"
        if(repair_1.repair_type=="Car"){
            if(time > 5){
            amount = 150
            res.status(200).json({ status: "Booking Cancelled",details:{
                repair_id:repair_id,
                user_id:repair_1.user_id,
                worker_id:worker_1._id,
                location:repair_1.location,
                status:"Cancelled",
                amount:150
            } });}
            else
                res.status(200).json({ status: "Booking Cancelled",details:{
                    repair_id:repair_id,
                    user_id:repair_1.user_id,
                    worker_id:worker_1._id,
                    location:repair_1.location,
                    status:"Cancelled",
                    amount:0
                } });
            }
        else{
            if(time > 5){
                amount = 50
            res.status(200).json({ status: "Booking Cancelled",details:{
                user_id:repair_1.user_id,
                worker_id:worker_1._id,
                location:repair_1.location,
                status:"Cancelled",
                amount:50
            } });}
            else
                res.status(200).json({ status: "Booking Cancelled",details:{
                    user_id:repair_1.user_id,
                    worker_id:worker_1._id,
                    location:repair_1.location,
                    status:"Cancelled",
                    amount:0
                } });
        }
        //worker.save();
        //repair.save();
        repair2 = await repair.findByIdAndUpdate(repair_id,{status:"Cancelled",amount:amount});
}
    catch(err){
        console.log(err);
        res.status(400).json({error:err})
    }
});
module.exports = router;