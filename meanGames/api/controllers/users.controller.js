
const  mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const  User = mongoose.model("User");

module.exports.Register = function(req, res) {
    
    if(req.body && req.body.username && req.body.password) {

        bcrypt.genSalt(10)
        .then((generatedSalt) => Passwordhash(generatedSalt, req))
        .then((hashPass) => registering(hashPass, req))
        .then((user) => res.status(201).json(user))
        .catch((err) => res.status(500).json(err));
    }
}   
        function registering(encrypted_password, req){
            const newUser = {
                username: req.body.username,
                password: encrypted_password,
                name: req.body.name
    
            }

              return User.create(newUser)
        }      
       
        function passwordhash(generatedSalt, req){
            return bcrypt.hash(req.body.password, generatedSalt);
        }



module.exports.Login = function(req, res) {

    if(req.body && req.body.username && req.body.password) {

        User.findOne({username: req.body.username})
             .then((user) => validationUsername(user, res))
             .then((doc) => validatePassword(user,req))
             .then((same) => this.Login(user, res, {username: req.body.username}))
    }
}
     
        function validationUsername(user,res){
            if(!user) {

                res.status(401).json({"message" : "check username or password"})

            }
            console.log("the username exists", user)
                 
                return;
        }
            
        function validatePassword(user, req){
            return bcrypt.compare(req.body.password, user.password); 

        }
            const credentials = {
                username: req.body.username
            }
        function login(user, res, credentials){
            const response = {
                status: 200
            }
            if (user) {
                response.message = jwt.sign({ payload: credentials.username }, process.env.PASS_PHRASE, { expiresIn: 3600 });
            } else {
                response.status = 401;
                response.message = { "message": "please check credentails" };
            }
            res.status(response.status).json(response.message);
        }

module.exports.authenticate = function (req, res, next) {
    const userHeader = req.headers.authorization;

    if (userHeader) {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(token, process.env.PASS_PHRASE, function(err, decodedToken) {
            if(err) {
                console.log("Encored error in JWT ", err);
                res.status(401).json({message: "Unauthorized"})
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({message: "Missing Token"})
    }
}