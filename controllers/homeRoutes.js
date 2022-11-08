const router = require('express').Router();
const { User, Blog } = require('../models');
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
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        //render blogs from logged in user
    } catch (err) {
        res.status(500).json(err);
    }
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

    res.render('signup', {logged_in: req.session.logged_in });
});

module.exports = router;