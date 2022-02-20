const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

console.log('router(user) is loaded');

router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.get('/game1/:id', passport.checkAuthentication,usersController.game1);
router.post('/update/:id', passport.checkAuthentication,usersController.update);
router.post('/update_game1/:id', passport.checkAuthentication,usersController.update_game1);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
    ),usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;
