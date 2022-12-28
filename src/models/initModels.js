const Users = require('./users.models');
const RecoveryPassword = require('./recoveryPasswords.models');

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPassword)
    RecoveryPassword.belongsTo(Users)
};

module.exports = initModels
