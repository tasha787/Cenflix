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

const DisplayEditMovie = (req, res) => {

    let admin = "";
    const name = req.session.admin.username;
    name == "Dawood_Usman" ? admin = "Admin 1.0" : admin = "Admin 2.0";
    const MovieID = req.params.MovieID;
    sequelize.sync().then(() => {
        movie.findOne({
            where: {
                MovieID: MovieID
            }
        }).then(movie => {
            if (movie) {
                res.render("admin/editMovie", { movie: movie, Name: name, Admin: admin });
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

const EditMovie = (req, res) => {
    if (!req.file) {
        return res.send("File Not Recieved!");
    }

    const MovieID = req.body.movieID;
    const MovieName = req.body.movieName;
    const MovieStatus = req.body.movieStatus;
    const ParentalGuidance = req.body.moviePG;
    const MovieIndustry = req.body.movieIndustry;
    const MovieGenre = req.body.movieGenre;
    const MovieDuration = req.body.movieDuration;
    const MovieTrailer = req.body.movieTrailer;
    const TicketPrice = req.body.ticketPrice;
    const ShowDate = req.body.showDate;
    const ShowTime = req.body.showTime;
    const MoviePoster = req.file.originalname;

    sequelize.sync().then(() => {
        console.log('movie table created successfully!');
        movie.update({
            MovieName: MovieName,
            MovieStatus: MovieStatus,
            ParentalGuidance: ParentalGuidance,
            MovieIndustry: MovieIndustry,
            MovieGenre: MovieGenre,
            MovieDuration: MovieDuration,
            MovieTrailer: MovieTrailer,
            TicketPrice: TicketPrice,
            ShowDate: ShowDate,
            ShowTime: ShowTime,
            MoviePoster: MoviePoster
        },
            {
                where: {
                    MovieID: MovieID
                }
            }
        ).then(resp => {
            res.redirect("/admin/runningMovies");
        }).catch((error) => {
            console.error('Failed to update a new record : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

const addMovie = (req, res) => {

    if (!req.file) {
        return res.send("File Not Recieved!");
    }

    const MovieID = req.body.movieID;
    const MovieName = req.body.movieName;
    const MovieStatus = req.body.movieStatus;
    const ParentalGuidance = req.body.moviePG;
    const MovieIndustry = req.body.movieIndustry;
    const MovieGenre = req.body.movieGenre;
    const MovieDuration = req.body.movieDuration;
    const MovieTrailer = req.body.movieTrailer;
    const TicketPrice = req.body.ticketPrice;
    const ShowDate = req.body.showDate;
    const ShowTime = req.body.showTime;
    const MoviePoster = req.file.originalname;

    sequelize.sync().then(() => {
        console.log('movie table created successfully!');

        movie.create({
            MovieID: MovieID,
            MovieName: MovieName,
            MovieStatus: MovieStatus,
            ParentalGuidance: ParentalGuidance,
            MovieIndustry: MovieIndustry,
            MovieGenre: MovieGenre,
            MovieDuration: MovieDuration,
            MovieTrailer: MovieTrailer,
            TicketPrice: TicketPrice,
            ShowDate: ShowDate,
            ShowTime: ShowTime,
            MoviePoster: MoviePoster
        }).then(resp => {
            res.redirect("/admin/runningMovies");
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

const displayRunningMovies = (req, res) => {

    let admin = "";
    const name = req.session.admin.username;
    name == "Dawood_Usman" ? admin = "Admin 1.0" : admin = "Admin 2.0";

    sequelize.sync().then(() => {
        movie.findAll({
            where: {
                MovieStatus: "Running"
            }
        }).then(movieData => {
            res.render("admin/runningMovies", { movieData: movieData, Name: name, Admin: admin });
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}

const featuredMovie = (req, res) => {
    sequelize.sync().then(() => {
        movie.update({
            MovieStatus: "Featured",
        },
            {
                where: {
                    MovieID: req.params.MovieID
                }
            }
        ).then(resp => {
            booking.update({
                MovieStatus: "Featured",
            },
                {
                    where: {
                        MovieID: req.params.MovieID
                    }
                }
            ).then(resp => {
                res.redirect("/admin/runningMovies");
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
            res.redirect("/admin/runningMovies");
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

const displayPendingMovies = (req, res) => {

    let admin = "";
    const name = req.session.admin.username;
    name == "Dawood_Usman" ? admin = "Admin 1.0" : admin = "Admin 2.0";

    sequelize.sync().then(() => {
        booking.findAll({
            attributes: ['MovieID', 'UserName', 'MovieName', 'ShowDate', 'ShowTime', [sequelize.fn('count', sequelize.col('TotalAmount')), 'BookedSeats'], [sequelize.fn('sum', sequelize.col('TotalAmount')), 'TotalAmount']],
            group: ["UserName", "MovieID"],
            where: {
                BookingStatus: "Pending",
                MovieStatus: "Running"
            }
        }).then(bookingDetails => {
            res.render("admin/pendingBookings", { bookingDetails: bookingDetails, Name: name, Admin: admin });
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}


const confirmBooking = (req, res) => {
    sequelize.sync().then(() => {
        booking.update({
            BookingStatus: "Confirmed",
        },
            {
                where: {
                    MovieID: req.query.MovieID,
                    UserName: req.query.UserName
                }
            }
        ).then(resp => {
            res.redirect("/admin/pendingBookings");
        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

const deleteBooking = (req, res) => {
    sequelize.sync().then(() => {
        Book.destroy({
            where: {
                MovieID: req.query.MovieID,
                UserName: req.query.UserName
            }
        }).then(resp => {
            res.redirect("/admin/pendingBookings");
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
    displayFeedBack,
    DisplayEditMovie,    
    addMovie,
    EditMovie,
    displayRunningMovies,
    featuredMovie,
    displayPendingMovies,
    confirmBooking,
    deleteBooking
}