const express = require('express');

const router = express.Router()



router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

module.exports = router;