const express = require("express");
const userRouter = express.Router();
const userMethods = require("../controllers/user.controller");
const userAuth = require("../middlewares/auth").userAuth;

userRouter.get("/signIn", (req, res) => { res.render("user/signIn"); });
userRouter.post("/signIn", userMethods.signIn);

userRouter.get("/signUp", (req, res) => { res.render("user/signUp"); });
userRouter.post("/signUp", userMethods.sendVerificationCode);

userRouter.post("/verifyCode", userMethods.verifyCode);

userRouter.post("/signUpConfirm", userMethods.signUp);

userRouter.get("/homePage", userAuth, userMethods.displayHomePage);

userRouter.get("/bookMovie/:MovieID", userAuth, userMethods.DisplayBookMovie);

userRouter.get("/printTicket", userAuth, userMethods.BookMovie);

userRouter.get("/aboutUs", userAuth, (req, res) => { res.render("user/aboutUs"); });

userRouter.get("/contactUs", userAuth, (req, res) => {
    const userName = req.session.user.username;
    res.render("user/contactUs", { userName });
});

userRouter.post("/contactUs", userMethods.sendFeedBack);

userRouter.get("/logOut", userMethods.logOut);

module.exports = userRouter;