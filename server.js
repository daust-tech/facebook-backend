require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Facebook API is running!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


app.post('/posts', authenticateToken, async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
        return res.status(400).json({ message: "Post content is required!" });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO posts (user_id, content) VALUES (?, ?)',
            [userId, content]
        );
        res.json({ message: "Post created successfully!", postId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: "Database error!", error: err });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT posts.id, posts.content, users.username, posts.created_at FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Database error!", error: err });
    }
});
