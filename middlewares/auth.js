const adminAuth = (req, res, next) => {
    if (!req.session.admin) {
        return res.redirect("/admin/signIn");
    }
    next();
};

const userAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/user/signIn");
    }
    next();
};


module.exports = { adminAuth, userAuth };