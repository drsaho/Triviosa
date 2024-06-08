const router = require("express").Router()
const homeRoutes = require("./homeRoutes")
const apiRoutes = require("./api")

//localhost:3001
router.use("/", homeRoutes)// responsible for view urls and get from db
router.use("/api", apiRoutes) // responsible for posts, puts, deletes and any changes to db

module.exports = router