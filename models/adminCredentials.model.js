const { sequelize, DataTypes } = require("../config/sequelize");

const adminCredentials = sequelize.define("adminCredentials", {
    UserName: {
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
    console.log('adminCredentials table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = adminCredentials;