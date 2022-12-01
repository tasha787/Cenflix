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

const sendVerificationCode = (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    const user = { userName: userName, email: email, password: password };
    req.session.userData = user;

    const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        let pos = Math.floor(Math.random() * givenSet.length);
        code += givenSet[pos];
    }

    req.session.code = code;

    let mail = transporter.sendMail({
        from: '"Cenflix" <yourscenflix@gmail.com>',
        to: `${email}`,
        subject: "Verification Code",
        text: "Hello world?",
        html: `<h1>Cenflix Verification Code!</h1>
               <p><b>Your Code is : ${code}</b></p>`
    });
    res.render("user/verifyCode", { Email: email });

}

const verifyCode = (req, res) => {
    const Code = req.body.code;
    if (Code == req.session.code) {
        res.redirect(307, "/user/signUpConfirm");
    }
    else {
        req.session.code = null;
        res.send("Wrong Verification Code!\nTry To SignUp Again...");
    }
}

const sendFeedBack = (req, res) => {
    const userName = req.session.user.username;
    const type = req.body.feedBackType;
    const feedBackMsg = req.body.feedBackMsg;

    sequelize.sync().then(() => {
        console.log('feedBack table created successfully!');

        feedBack.create({
            UserName: userName,
            Type: type,
            FeedBackMsg: feedBackMsg
        }).then(resp => {
            res.redirect("/user/homePage");
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}

const displayHomePage = (req, res) => {

    sequelize.sync().then(() => {
        slider.findAll().then(slider => {
            movie.findAll({
                where: {
                    MovieStatus: "Running"
                }
            }).then(movie => {
                res.render("user/homePage", { slider: slider, movieData: movie });
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

const DisplayBookMovie = (req, res) => {
    const MovieID = req.params.MovieID;

    let seats = "";

    sequelize.sync().then(() => {
        bookings.findAll({
            where: {
                MovieID: MovieID
            },
            attributes: ['BookedSeats'],
        }).then(BookedSeats => {
            if (BookedSeats) {
                seats = BookedSeats;
            }
            else {
                seats = "";
            }
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

    // ========================================================================//

    sequelize.sync().then(() => {
        movie.findOne({
            where: {
                MovieID: MovieID
            }
        }).then(movie => {
            if (movie) {
                res.render("user/bookMovie", { movie: movie, seats: seats });
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

const BookMovie = (req, res) => {
    const MovieID = req.query.MovieID;
    const Seats = (req.query.seats).split(" ");
    const userName = req.session.user.username;

    sequelize.sync().then(() => {
        movie.findOne({
            where: {
                MovieID: MovieID
            }
        }).then(MovieData => {
            if (MovieData) {
                Seats.forEach(function (seat) {
                    bookings.create({
                        UserName: userName,
                        MovieID: MovieData.MovieID,
                        MovieName: MovieData.MovieName,
                        ShowDate: MovieData.ShowDate,
                        ShowTime: MovieData.ShowTime,
                        BookedSeats: seat,
                        TotalAmount: MovieData.TicketPrice,
                        BookingStatus: "Pending",
                        MovieStatus: "Running"
                    }).then(resp => {
                    }).catch((error) => {
                        console.error('Failed to create a new record : ', error);
                    });
                })
                res.render("user/printTicket", { MovieData: MovieData, userName: userName, seats: req.query.seats });
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

const logOut = (req, res) => {
    req.session.user = null;
    req.cookies.CurrentRole = "";
    res.redirect("/cenflix");
}

module.exports = {
    signIn,
    signUp,
    sendVerificationCode,
    verifyCode,
    sendFeedBack,
    displayHomePage,
    DisplayBookMovie,
    BookMovie,
    logOut
}
