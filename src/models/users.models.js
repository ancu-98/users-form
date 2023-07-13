const {DataTypes} = require('sequelize');

const db = require('../utils/database');

const Users = db.define('users',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2,50]
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2,50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
                msg: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 8 characters long'
            }
        }
    },
    gender: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'normal'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Users