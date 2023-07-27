//? Previamente tiene que pasar por el middleware de autenticación

const roleMiddlelware = (req, res , next) => {
    if(req.user.role === 'admin'){
        next()
    } else {
        res.status(401).json({message: 'Permission Denied'})
    }
}

module.exports = roleMiddlelware