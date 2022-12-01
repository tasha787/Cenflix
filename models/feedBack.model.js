const { sequelize, DataTypes } = require("../config/sequelize");

const feedBack = sequelize.define("feedBack", {
    UserName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FeedBackMsg: {
        type: DataTypes.STRING,
        allowNull: false
    }
 });
 
 sequelize.sync().then(() => {
    console.log('feedBack table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = feedBack;