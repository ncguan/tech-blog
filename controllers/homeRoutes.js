const router = require('express').Router();
const { User, Blog } = require('../models');
const format_date = require('../utils/helpers');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;