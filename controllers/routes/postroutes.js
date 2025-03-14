const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPosts);
router.post('/', authenticateToken, createPost);

module.exports = router;
