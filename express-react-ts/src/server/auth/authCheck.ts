import * as express from 'express';
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

/**
 * Checks if the user is currently logged in. If not, send them to the '/' page.
 */
function checkAuthenticated(req: Request, res: Response, next:NextFunction){
  if (req.isAuthenticated()){
    // The user is authenticated. Call the next middleware.
    return next();
  } else {
    //If the user is not authenticated, then redirect them to the root (login) page (so they can log in.)
    res.redirect('/');
  }
}

/**
 * Check if the user is not logged in. If they are, send them to the '/home' page.
 */

function checkGuest(req: Request, res: Response, next:NextFunction){
  if (!req.isAuthenticated()){
    console.log(`${req.user} is a guest.`)
    return next();
  } else {
    console.log(`${req.user} is logged in.`)
    res.redirect('/home');
  }
}


module.exports =  {
  checkAuthenticated,
  checkGuest,
}