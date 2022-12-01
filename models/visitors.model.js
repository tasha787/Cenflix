const { sequelize, DataTypes } = require("../config/sequelize");

const visitors = sequelize.define("visitors", {
    VisitorCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('visitors table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = visitors;