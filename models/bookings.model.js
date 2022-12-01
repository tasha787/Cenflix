const { sequelize, DataTypes } = require("../config/sequelize");

const bookings = sequelize.define("bookings", {
    UserName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ShowDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ShowTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    BookedSeats: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TotalAmount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    BookingStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
 });
 
 sequelize.sync().then(() => {
    console.log('bookings table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = bookings;