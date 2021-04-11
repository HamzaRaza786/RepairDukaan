module.exports = function (req, res, next) {
    const { fname,email, password } = req.body;
    //console.log("here in validInfo",req.body,"now path",req.path)

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path == "/signup/customer") {
        //console.log(!email.length);
        if (![email, fname, password].every(Boolean)) {
            return res.json({msg:"Missing Credentials"});
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path == "/login/customer") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    //console.log("going to the signup function")
    next();
};