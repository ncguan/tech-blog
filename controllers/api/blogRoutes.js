const router = require('express').Router();
const { Comment, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/comment', withAuth, async (req, res) => {
    try {

        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);


    } catch (err) {
        res.json(err);
    }
});

router.post('/post', withAuth, async (req, res) => {
    try {

        const newPost = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newPost);


    } catch (err) {
        res.json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.json({ message: 'No project found with this id' });
            return;
        }

        res.json(projectData);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;