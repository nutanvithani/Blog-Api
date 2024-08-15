const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new blog post
router.post('/', authMiddleware, async (req, res) => {
    try {
        const blog = new Blog({ ...req.body, author: req.user.id });
        await blog.save();
        res.status(201).send(blog);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.send(blogs);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name');
        if (!blog) return res.status(404).send();
        res.send(blog);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a blog post
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, author: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!blog) return res.status(404).send();
        res.send(blog);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a blog post
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user.id });
        if (!blog) return res.status(404).send();
        res.send(blog);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
