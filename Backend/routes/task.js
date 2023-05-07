const express = require('express');
const { getTaskCategories } = require('../controllers/task/task');
const { verifyAccessToken } = require('../middlewares/jsonwebtoken');
const router = express.Router();

router.get("/taskCategories", verifyAccessToken, getTaskCategories);

module.exports = router;