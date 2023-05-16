const express = require('express');
const { projectlist, createProject } = require('../controllers/project/project');
const { verifyAccessToken } = require('../middlewares/jsonwebtoken');
const router = express.Router();

// router.get('/projects', verifyAccessToken, projectlist);
router.post('/project', verifyAccessToken, createProject);

module.exports = router;