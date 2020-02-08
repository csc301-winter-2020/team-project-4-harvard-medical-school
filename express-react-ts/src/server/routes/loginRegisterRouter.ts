import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';

type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router:Router = express.Router();

//Auth
const { checkAuthenticated, checkGuest } = require('../auth/authCheck');

/**
 * Route to accept login POST requests.
 * TODO: Redirect to home on success, send a HTTP error code on failure, instead of redirect again to root.
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/',
}));

/**
 * TODO: Register a user
 */
router.post('/register', (req:Request, res:Response, next:NextFunction) => {
  res.sendStatus(201);
});

/**
 * Logs out a user.
 */
router.get('/logout', checkAuthenticated, (req:Request, res:Response, next:NextFunction) => {
  console.log(`A user has been logged out.`);
  req.logout();
  res.redirect("/");
});

/**
 * TODO: Update user in the user table.
 */
router.patch('/:userId', (req:Request, res:Response, next:NextFunction) => {
  const userId = req.params.userId;
  res.sendStatus(204);
});

export default router;