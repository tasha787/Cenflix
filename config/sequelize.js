const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'CENFLIX',
    'root',
    '9pocvy2rg',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = { sequelize, DataTypes };