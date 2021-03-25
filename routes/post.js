const express = require('express');
const passport = require('passport');
const router = express.Router();

const PostController = require('../controllers/post_controller');
// Passport.checkAuthentication is used so that no one can post without signing in
// If an outsider sign-in and checks the form action url and other attrributes than
// he can sign-out and edit the html home page using inspect and create a form with
// the attributes and action then he will be prevented from posting using this authentication
router.post('/create',passport.checkAuthentication,PostController.create);
module.exports = router;