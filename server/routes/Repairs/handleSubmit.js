const router = require("express").Router();
const user = require("../../models/User")
const repair = require("../../models/Repair")
const worker = require("../../models/Worker")
const authorization = require("../../middleware/authorization");
router.post("/user/submit", async(req,res) => {
    try {
        //console.log(req.body)
    const { user_id,
        location,
        repair_type,
        } = req.body;
        //console.log(location)
        const user_1 = await user.findOne({ _id:user_id });
        const worker_1 = await worker.findOneAndUpdate({status:"Available"},{status:"Busy"});
        if(user_1){
            if(worker_1){
                if(repair_type=="Car"){
            let newRepair = await repair.create({
                user_id:user_1._id,
                worker_id:worker_1._id,
                location: {"latitude":location.latitude,"longitude":location.longitude},
                status:"In Progress",
                repair_type,
                amount:300,
                
            });
            res.status(200).json({ status: "Repair Booked",details:{
                user_id:user_1._id,
                worker_id:worker_1._id,
                location: {"latitude":location.latitude,"longitude":location.longitude},
                status:"In Progress",
                repair_type,
                amount:300
            } });
        }
        else{
            let newRepair = await repair.create({
                user_id:user_1._id,
                worker_id:worker_1._id,
                location: {"latitude":location.latitude,"longitude":location.longitude},
                status:"In Progress",
                repair_type,
                amount:300
            });
            res.status(200).json({ status: "Repair Booked",details:{
                id:newRepair._id,
                user_id:user_1._id,
                worker_id:worker_1._id,
                location: {"latitude":location.latitude,"longitude":location.longitude},
                status:"In Progress",
                repair_type,
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
        res.status(400).json({error:err})

    }
});
module.exports = router;