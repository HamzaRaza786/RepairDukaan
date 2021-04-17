const router = require('express').Router();
let Workers = require('../models/workers.model');

router.route('/').get((req, res) => {
  Workers.find()
    .then(Workers => res.json(Workers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/worker/register').post((req, res) => {
  console.log("Here ");
  const { first_name, last_name, email, password, phone_number } = req.body;
  const user_1 = await user.findOne({ email })
  if (user_1){
    return res.status(401).json("User already exist");
  }
  
  else {
    const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;
  const email = req.body.email;
  const phone_number = req.body.phone_number;

  const newWorkers = new Workers({
    first_name,
    last_name,
    password,
    email,
    phone_number
  });

  newWorkers.save()
  .then(() => res.json('Worker added!'))
  .catch(err => res.status(400).json('Error: ' + err));
}
});
  

router.route('/:id').get((req, res) => {
  Workers.findById(req.params.id)
    .then(Workers => res.json(Workers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Workers.findByIdAndDelete(req.params.id)
    .then(() => res.json('Worker deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/worker/update').put((req, res) => {
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