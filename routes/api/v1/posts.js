const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);
// Setting the session cookie as false because we do not want to generate session cookie

module.exports = router;