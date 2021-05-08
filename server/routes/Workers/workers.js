const router = require('express').Router();
let Workers = require('../../models/Worker');
const bcrypt = require('bcrypt-nodejs');
const authorization = require("../../middleware/authorization");
const validInfo = require('../../middleware/validInfo');
router.route('/worker/register').post(async(req, res) => {
    const { first_name, last_name, email, password, phone_number } = req.body;
    const user_1 = await Workers.findOne({ email })
    if (user_1) {
        return res.status(401).json("User already exist");
    }
    else {
        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(password, salt);
        const newWorkers = new Workers({
            first_name,
            last_name,
            "password":hash,
            email,
            phone_number,
            status:"Available"
        });
        newWorkers.save()
            .then(() => res.json('Worker added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});
router.route('/worker/login').post(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user_1 = await Workers.findOne({ email }).lean()
        if (!user_1) {
            return res.json({ status: 'error', error: 'Invalid username' })
        }
        if (await bcrypt.compareSync(password, user_1.password)) {
            const token = jwtGenerator(user_1._id);
            res.status(200).json({
                status: "success",
                token: token
            })
        }
        else {
            res.status(400).json({ status: 'error', error: 'Invalid password' });
        }
    }
    catch (err) {
        res.status(400).json({ status: "error " + err });
    }
});

router.route('/worker/update').put(async(req, res) => {
    Workers.findById(req.body.email)
        .then(Workers => {
            Workers.first_name = req.body.first_name;
            Workers.last_name = req.body.last_name;
            Workers.password = req.body.password;
            Workers.email = req.body.email;
            Workers.phone_number = req.body.phone_number;

            Workers.save()
                .then(() => res.json('Worker updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;