const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const blog = blogData.get({ plain: true });

        const commentData = await Comment.findAll({
            where: { blog_id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('blog', {
            ...blog,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        try {
            const userData = await User.findByPk(req.session.user_id, {
                attributes: { exclude: ['password'] },
                include: [{ model: Blog }],
            });

            const user = userData.get({ plain: true });

            res.render('dashboard', {
                ...user,
                logged_in: true
            });
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        const blog = blogData.get({ plain: true });

        res.render('edit', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.json(err);
    }
});

router.get('/newpost', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('newpost');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup', { logged_in: req.session.logged_in });
});

module.exports = router;