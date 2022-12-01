const { sequelize, DataTypes } = require("../config/sequelize");

const userCredentials = sequelize.define("userCredentials", {
    UserName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
 });
 
 sequelize.sync().then(() => {
    console.log('userCredentials table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = userCredentials;