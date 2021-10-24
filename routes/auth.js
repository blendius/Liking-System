const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const { signUpValidation, loginValidation, passwordValidation } = require('../validation')

router.post('/signup', async (req, res) => {
    //validating data
    const { error } = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking for existing user
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //checking for existing username
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send('Username already exists');

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        likes: 0
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});


router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if username exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Username or password is wrong');

    //checking correct password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})
//current logged in user
router.get('/me', verify, async (req, res) => {
    const currentlyLoggedInUser = await User.findOne({ _id: req.user._id });
    res.send(currentlyLoggedInUser)

});
//updating password
router.put('/me/update-password', verify, async (req, res) => {
    //validation for new password
    const { error } = passwordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.updateOne({ _id: req.user._id }, { password: hashedPassword })
    res.status(200).send("Password has been updated");
})

module.exports = router;