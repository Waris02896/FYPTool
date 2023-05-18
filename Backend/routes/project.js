const express = require('express');
const { createProject, projectList } = require('../controllers/project/project');
const { verifyAccessToken } = require('../middlewares/jsonwebtoken');
const { addUser } = require('../controllers/project/team');
const { createProcessCard } = require('../controllers/project/processCard');
const router = express.Router();

// router.get('/projects', verifyAccessToken, projectlist);
router.post('/project', verifyAccessToken, createProject);
router.get('/projectList', verifyAccessToken, projectList);
router.post('/addUser', verifyAccessToken, addUser);
router.post('/processCard', verifyAccessToken, createProcessCard)
// router.get('/projectlist', verifyAccessToken, projectlist);

module.exports = router;