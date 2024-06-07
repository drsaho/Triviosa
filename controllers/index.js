const router = require("express").Router()
const homeRoutes = require("./homeRoutes")

//localhost:3001
router.use("/", homeRoutes)


module.exports = router