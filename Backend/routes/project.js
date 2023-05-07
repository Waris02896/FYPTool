const express = require('express');
const { projectlist } = require('../controllers/project/project');
const { verifyAccessToken } = require('../middlewares/jsonwebtoken');
const router = express.Router();

router.get('/projects', verifyAccessToken, projectlist);

module.exports = router;