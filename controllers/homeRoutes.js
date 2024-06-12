const router = require("express").Router()
const { User} = require("../Models")
//base url localhost:3001

router.get("/", (req, res) => {
    // query db here
    res.render("homepage.handlebars")
})


router.get("/login", (req, res) => {

    res.render("login.handlebars")
})

router.get("/profile", async (req, res) => {
    // query user info here
    try{
        const userData = await User.findAll()

        const users = userData.map(user => user.get({plain: true}))
       console.log(users)
        res.render("profile.handlebars", {users}) 
    }catch(err){
        console.log(err)
    }
    
})

router.get("/signup", (req, res) => {
    // query user info here
    res.render("signup.handlebars")
})

module.exports = router