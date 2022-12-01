const express = require("express");
const adminRouter = express.Router();

const adminAuth = require("../middlewares/auth").adminAuth;
const adminMethods = require("../controllers/admin.controller");

const { movieUpload, sliderUpload } = require("../config/multer");

adminRouter.get("/signIn", (req, res) => { res.render("admin/signIn"); });
adminRouter.post("/signIn", adminMethods.SignIn);

adminRouter.get("/dashBoard", adminAuth, adminMethods.displayDashBoard);

adminRouter.get("/runningMovies", adminAuth, adminMethods.displayRunningMovies);

adminRouter.get("/addMovie", adminAuth, adminMethods.displayUIAccordingly);
adminRouter.post("/addMovie", adminAuth, movieUpload.single("moviePoster"), adminMethods.addMovie);

adminRouter.get("/editMovie/:MovieID", adminAuth, adminMethods.DisplayEditMovie);
adminRouter.post("/editMovie", adminAuth, movieUpload.single("moviePoster"), adminMethods.EditMovie);

adminRouter.get("/featuredMovie/:MovieID", adminAuth, adminMethods.featuredMovie);

adminRouter.get("/confirmBooking", adminAuth, adminMethods.confirmBooking);
adminRouter.get("/deleteBooking", adminAuth, adminMethods.deleteBooking);


adminRouter.get("/viewUsers", adminAuth, adminMethods.displayCustomers);

adminRouter.get("/pendingBookings", adminAuth, adminMethods.displayPendingMovies);

adminRouter.get("/runningMoviesBookings", adminAuth, adminMethods.displayRunningMoviesBookings);

adminRouter.get("/featuredMoviesBookings", adminAuth, adminMethods.displayFeaturedMoviesBookings);

adminRouter.get("/uploadSlider", adminAuth, adminMethods.displayUIAccordingly);

adminRouter.post("/uploadSlider", adminAuth, sliderUpload.fields([{
    name: 'slider-1', maxCount: 1
}, {
    name: 'slider-2', maxCount: 1
}, {
    name: 'slider-3', maxCount: 1
}]), adminMethods.uploadSlider);

adminRouter.get("/moviesHistory", adminAuth, adminMethods.displayMoviesHistory);

adminRouter.get("/paymentDetails", adminAuth, adminMethods.displayPaymentDetails);

adminRouter.get("/generateReport", adminAuth, adminMethods.displayGenerateReport);
adminRouter.get("/printReport", adminAuth, adminMethods.generateReport);

adminRouter.get("/viewFeedBack", adminAuth, adminMethods.displayFeedBack);

adminRouter.get("/logout", adminAuth, adminMethods.logOut);

module.exports = adminRouter;