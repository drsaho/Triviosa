const router = require("express").Router()

//base url localhost:3001

router.get("/", (req, res) => {
    // query db here
    res.render("homepage.handlebars")
})


router.get("/login", (req, res) => {

    res.render("login.handlebars")
})

router.get("/profile", (req, res) => {
    // query user info here
    res.render("profile.handlebars")
})

module.exports = router