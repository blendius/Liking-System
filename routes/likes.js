const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Likes = require('../model/Likes');

router.get('/user/:id/', async (req, res) => {
    //checking if user with that ID exists
    const userLikes = await User.findOne({ _id: req.params.id });
    if (!userLikes) return res.status(400).send('User does not exist');

    return res.send({
        username: userLikes.username,
        likes: userLikes.likes
    })


});

router.get('/user/:id/like', verify, async (req, res) => {
    //checking if person being liked exists
    const liked = await User.findOne({ _id: req.params.id });
    if (!liked) return res.status(400).send('User does not exist');


    const liker = await User.findOne({ _id: req.user._id })

    const likedusername = liked.username;
    const likerusername = liker.username;
    const likedlikerUsername = likerusername + likedusername

    //check if user has already liked user
    const likeTest = await Likes.findOne({ likerliked: likedlikerUsername });
    if (likeTest) return res.status(400).send('You have already like this user');

    const like = new Likes({
        liker: likerusername,
        liked: likedusername,
        likerliked: likedlikerUsername,
    });
    try {
        //adding like to user likes
        const likes = await User.findOne({ username: likedusername });
        await User.updateOne({ _id: req.params.id }, { likes: (likes.likes + 1) });

        //saving the like to database
        const savedLike = await like.save();
        res.send({ like: like._id });
    } catch (err) {
        res.status(400).send(err);
    }


});

router.get('/user/:id/unlike', verify, async (req, res) => {
    //checking if person being liked exists
    const liked = await User.findOne({ _id: req.params.id });
    if (!liked) return res.status(400).send('User does not exist');


    const liker = await User.findOne({ _id: req.user._id })

    const likedusername = liked.username;
    const likerusername = liker.username;
    const likedlikerUsername = likerusername + likedusername

    //check if user has already liked user
    const likeTest = await Likes.findOne({ likerliked: likedlikerUsername });
    if (!likeTest) return res.status(400).send('You have not liked this user');

    //Removing the like from user
    const likes = await User.findOne({ username: likedusername });
    await User.updateOne({ _id: req.params.id }, { likes: (likes.likes - 1) });

    //removing the like from likes table
    const deletedLike = await Likes.findOneAndDelete({ likerliked: likedlikerUsername })
    res.send("Like has been removed")

});
router.get('/most-liked', async (req, res) => {
    const maxLikes = await User.find().sort({ likes: -1 }).limit(1);
    res.send(maxLikes)


});



module.exports = router;