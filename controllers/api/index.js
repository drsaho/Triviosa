const router = require("express").Router()
const userRoutes = require("./userRoutes")


//base url here is localhost:3001/api/
router.use("/users", userRoutes)





module.exports = router;