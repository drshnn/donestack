const express = require('express')
const router = express.Router()
const {register,login,forgotPwd,resetPwd} = require('../controllers/auth')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgot').post(forgotPwd)
router.route('/reset/:resetToken').put(resetPwd)


module.exports = router
