const router = require('express').Router();
const { User, Blog } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json(userData);
        });

    } catch (err) {
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.json({ message: 'Incorrect username or password. Please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.json({ message: 'Incorrect email or password. Please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => { res.end(); });
    } else {
        res.end();
    }
});

module.exports = router;