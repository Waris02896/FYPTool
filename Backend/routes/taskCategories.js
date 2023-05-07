const express = require('express');
const { createTaskCategory, getAllTaskCategories } = require('../controllers/task/taskCategories');
const { verifyAccessToken } = require('../middlewares/jsonwebtoken');
const router = express.Router();

router.get("/taskCategories", verifyAccessToken, getAllTaskCategories);
router.post('/taskCategories', verifyAccessToken, createTaskCategory);

module.exports = router;