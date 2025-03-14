const express = require('express');
const { getUserById } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authenticateToken, getUserById);

module.exports = router;
