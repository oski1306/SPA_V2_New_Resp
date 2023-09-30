const authorizedUser = {};

function authorization(req,res,next) {
    if(!authorizedUser[req.sessionID]){
        return res.status(401).json({message: "Access Denied!"})
    }
    next();
}

module.exports = {
    authorization,
    authorizedUser
}