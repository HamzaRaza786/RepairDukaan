const router = require("express").Router();
const authorization = require("../../middleware/authorization");
const repair = require("../../models/Repair")
router.post("/user/status",async (req,res) => {
try{
const {user_id} = req.body;      
        const repair_1 = await repair.findOneAndUpdate({user_id:worker_id});
        res.status(200).json({
            status:repair_1.status
        })
    }catch(err){
        res.status(400).json({err})
    }
})
module.exports = router;