const router = require("express").Router();
const authorization = require("../../middleware/authorization");
const repair = require("../../models/Repair")
const worker = require("../../models/Worker")
const user = require("../../models/User")
router.post("/worker/arrived",async (req,res) => {
    try{    
    const {worker_id} = req.body;      
        const repair_1 = await repair.findOneAndUpdate({worker_id:worker_id,status:"In Progress"},{status:"Repair Started"});
       // const worker_1 = await worker.findOne({ _id:repair_1.worker_id });
      //  repair_1.status = "Repair Started"
       // repair_1.status="Repair Started"
        res.status(200).json({ status: "Arrived",details:{
            user_id:repair_1.user_id,
            worker_id:repair_1.worker_id,
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
router.post("/worker/completed",async(req,res) =>{
        try{
        const {worker_id} = req.body;
        const repair_1 = await repair.findOneAndUpdate({worker_id:worker_id,status:"Repair Started"},{status:"Completed"});
        const worker_1 = await worker.findOneAndUpdate({ _id:worker_id },{status:"Available"});
        console.log(repair_1)
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
router.post("/worker/completed_surplus",async(req,res) =>{
    try{
    const {worker_id,paid} = req.body; 
    const repair_1 = repair.findOneAndUpdate({worker_id:worker_id},{status:"Completed"});
        const worker_1 = await worker.findOneAndUpdate({ _id:worker_id },{status:"Available"});
        const user_1 = await  user.findOne({ _id:repair_id });
    res.status(200).json({ status: "Completed",details:{
        user_id:repair_1.user_id,
        worker_id:worker_1._id,
        location:repair_1.location,
        status:"Completed",
        amount:repair_1.amount 
    } });
    user_1.balance = balance + paid - repair_1.amount;
    }
    catch(err){
        console.log(err);
        res.status(400).json({error:err})
    }
})
module.exports = router;