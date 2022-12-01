const { sequelize } = require("../config/sequelize");
const adminCredentials = require("../models/adminCredentials.model");
const userCredentials = require("../models/userCredentials.model");
const feedBack = require("../models/feedBack.model");
const slider = require("../models/slider.model");
const movie = require("../models/movie.model");
const booking = require("../models/bookings.model");
const visitors = require("../models/visitors.model");

const transporter = require("../config/transporter");
const path = require("path");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };


const SignIn = (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    sequelize.sync().then(() => {
        adminCredentials.findOne({
            where: {
                UserName: userName,
                Password: password
            }
        }).then(resp => {
            if (resp) {
                const admin = { username: userName, password: password };
                req.session.admin = admin;
                res.cookie("CurrentRole", "Admin");
                res.redirect("/admin/dashBoard");
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

const displayUIAccordingly = (req, res) => {
    let admin = "";
    const name = req.session.admin.username;
    name == "Dawood_Usman" ? admin = "Admin 1.0" : admin = "Admin 2.0";
    res.render(`admin${req.url}`, { Name: name, Admin: admin });
}

const displayCustomers = (req, res) => {

    let admin = "";
    const name = req.session.admin.username;
    name == "Dawood_Usman" ? admin = "Admin 1.0" : admin = "Admin 2.0";

    sequelize.sync().then(() => {
        userCredentials.findAll().then(customersData => {
            res.render("admin/viewUsers", { customersData: customersData, Name: name, Admin: admin });
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}

const displayFeedBack = (req, res) => {

    let admin = "";
    const name = req.session.admin.username;
    name == "Dawood_Usman" ? admin = "Admin 1.0" : admin = "Admin 2.0";

    sequelize.sync().then(() => {
        feedBack.findAll().then(customersFeedBack => {
            res.render("admin/viewFeedBack", { customersFeedBack: customersFeedBack, Name: name, Admin: admin });
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}

module.exports = {
    SignIn,
    displayUIAccordingly,
    displayCustomers,
    displayFeedBack
}