const express =require('express')
const router = express.Router()
const authMiddleware = require('../../middleware/authMiddleware')


router.get('/protected-route', authMiddleware.verifyToken, (req,res) => {
    'You have access to the protected route'
})


module.exports = router








