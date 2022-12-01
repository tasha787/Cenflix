const { sequelize } = require("../config/sequelize");
const transporter = require("../config/transporter");
const userCredentials = require("../models/userCredentials.model");
const feedBack = require("../models/feedBack.model");
const slider = require("../models/slider.model");
const movie = require("../models/movie.model");
const bookings = require("../models/bookings.model");

const signIn = (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;

    sequelize.sync().then(() => {
        userCredentials.findOne({
            where: {
                UserName: userName,
                Password: password
            }
        }).then(resp => {
            if (resp) {
                const user = { username: userName, password: password };
                req.session.user = user;
                res.cookie("CurrentRole", "user");
                res.redirect("/user/homePage");
            }
            else {
                res.send("Invalid Credientials");
            }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

const signUp = (req, res) => {

    const userData = req.session.userData;

    const userName = userData.userName;
    const email = userData.email;
    const password = userData.password;

    sequelize.sync().then(() => {
        console.log('UserCredentials table created successfully!');

        userCredentials.create({
            UserName: userName,
            Email: email,
            Password: password
        }).then(resp => {
            req.session.userData = null;
            res.redirect("/user/signIn");
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}


module.exports = {
    signIn,
    signUp
}
