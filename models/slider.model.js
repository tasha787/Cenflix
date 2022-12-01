const { sequelize, DataTypes } = require("../config/sequelize");

const slider = sequelize.define("slider", {
    SliderNo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    SliderImage: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('slider table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = slider;