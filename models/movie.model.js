const { sequelize, DataTypes } = require("../config/sequelize");

const movie = sequelize.define("movie", {
    MovieID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    MovieName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ParentalGuidance: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieIndustry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieGenre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieDuration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MovieTrailer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TicketPrice: {
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
    MoviePoster: {
        type: DataTypes.STRING,
        allowNull: false
    }

 });
 
 sequelize.sync().then(() => {
    console.log('movies table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = movie;