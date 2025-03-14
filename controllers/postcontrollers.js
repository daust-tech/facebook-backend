const pool = require('../config/db');

exports.getPosts = async (req, res) => {
  try {
    const [posts] = await pool.execute('SELECT posts.id, users.name, posts.content, posts.created_at FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const [result] = await pool.execute('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content]);
    res.status(201).json({ message: 'Post created', postId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};
