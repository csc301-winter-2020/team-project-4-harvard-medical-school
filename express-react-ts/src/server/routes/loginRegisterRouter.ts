import * as express from 'express';

type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router:Router = express.Router();

/**
 * TODO: Log in the user.
 */
router.post('/login', (req:Request, res:Response, next:NextFunction) => {
  //Use passport.authenticate.
  res.sendStatus(200);
});

/**
 * TODO: Register a user
 */
router.post('/register', (req:Request, res:Response, next:NextFunction) => {
  res.sendStatus(201);
});

/**
 * TODO: Logout the user. Make sure the user is logged in first.
 */
router.get('/logout', (req:Request, res:Response, next:NextFunction) => {
  res.sendStatus(200);
});

/**
 * TODO: Update user in the user table.
 */
router.patch('/:userId', (req:Request, res:Response, next:NextFunction) => {
  const userId = req.params.userId;
  res.sendStatus(204);
});

export default router;