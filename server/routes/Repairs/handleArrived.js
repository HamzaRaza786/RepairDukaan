const router = require("express").Router();
const authorization = require("../../middleware/authorization");
const repair = require("../../models/Repair")
const worker = require("../../models/Worker")

router.post("/worker/arrived",authorization,async (req,res) => {
    try{    
    const {worker_id} = req.body;      
        const repair_1 = await repair.findOne({worker_id});
       // const worker_1 = await worker.findOne({ _id:repair_1.worker_id });
        repair_1.status = "Repair Started"
        res.status(200).json({ status: "Arrived",details:{
            user_id:repair_1.user_id,
            worker_id:worker_1._id,
            location:repair_1.location,
            status:"Repair Started",
            amount:repair_1.amount
        } });
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err})

    } 
})

router.post("/worker/completed",authorization,async(req,res) =>{
        try{
        const {worker_id} = req.body;
        const repair_1 = await repair.findOne({worker_id});
        const worker_1 = await worker.findOne({ _id:worker_id });
        repair_1.status = "Completed"
        worker_1.status = "Available"
        res.status(200).json({ status: "Completed",details:{
            user_id:repair_1.user_id,
            worker_id:worker_1._id,
            location:repair_1.location,
            status:"Completed",
            amount:repair_1.amount
        } });
        }
        catch(err){
            console.log(err);
            res.status(400).json({error:err})
        }
})
module.exports = router;