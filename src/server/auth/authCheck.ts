/**
 * Helper middleware functions that are used to determine if users should be
 * able to access certain routes.
 */

import * as express from 'express';
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

/**
 * Checks if the user is currently logged in. If not, send them 403.
 */
function checkAuthenticated(req: Request, res: Response, next:NextFunction){
  if (req.isAuthenticated()){
    // The user is authenticated. Call the next middleware.
    return next();
  } else {
    //If the user is not authenticated, then redirect them to the root (login) page (so they can log in.)
    res.sendStatus(403);
  }
}

/**
 * Checks if the user is an admin. If not, send them 403.
 */
function checkAdmin(req: Request, res: Response, next:NextFunction){
  const u:any = req.user;
  if (u.user_type === "Administrator"){
    return next();
  } else {
    res.sendStatus(403);
  }
}

/**
 * Checks if the user is an instructor. If not, send them 403.
 */
function checkInstructor(req: Request, res: Response, next:NextFunction){
  const u:any = req.user;
  if (u.user_type === "Educator"){
    return next();
  } else {
    res.sendStatus(403);
  }
}

/**
 * Checks if the user is a student. If not, send them 403.
 */
function checkStudent(req: Request, res: Response, next:NextFunction){
  const u:any = req.user;
  if (u.user_type === "Student"){
    return next();
  } else {
    res.sendStatus(403);
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
  checkAdmin,
  checkInstructor,
  checkStudent,
}