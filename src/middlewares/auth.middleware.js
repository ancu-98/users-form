const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const jwtSecret = require('../../config').api.jwtSecret;
const { findUserById } = require('../users/users.controllers');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
};

passport.use(
    new JwtStrategy(options, async(tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
        .then(user => {
            if(user){
                done(null,tokenDecoded) //? Caso exitoso porque el usuario si existe
            } else {
                done(null, false) //? Caso fallido, en el que no genera un error, pero no existe un usuario.
            }
        })
        .catch(err => {
            done(err, false) //? Caso fallido, en el que si genera un error
        })
    })
);

module.exports = passport;