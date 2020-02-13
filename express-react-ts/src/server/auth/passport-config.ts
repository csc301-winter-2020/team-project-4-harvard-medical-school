const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
import * as passport from "passport";
import { User } from '../server';

const dummyUsers:User[] = [
  {
    id: 0,
    username: "student",
    password: "student"
  }, 
  {
    id: 1,
    username: "instructor",
    password: "instructor"
  }, 
  {
    id: 2,
    username: "admin",
    password: "admin"
  }, 
];

/**
 * TODO: Change from dummy data to PSQL query.
 * @param username The username of the user we are trying to find
 */
function getUserByUsername(username: string) {
  console.log(`LOGIN: Trying to log in username: ${username}`);
  
  const usersWithThisUsername: User[]= dummyUsers.filter(u => u.username === username);
  
  // IF there is not exactly one user with this username (because there are 0 users with this username)
  if (usersWithThisUsername.length !== 1){
    return null;
  } else {
    return usersWithThisUsername[0];
  }
}

/**
 * * TODO: Change from dummy data to PSQL query.
 * @param id The id of the user we are trying to find.
 */
function getUserById(id: number) {
  console.log(`LOGIN: Trying to log in user with ID: ${id}`);
  
  const usersWithThisId: User[]= dummyUsers.filter(u => u.id === id);
  
  // IF there is not exactly one user with this username (because there are 0 users with this username)
  if (usersWithThisId.length !== 1){
    console.log(`LOGIN: FAIL: No User with that id.`)
    return null;
  } else {
    return usersWithThisId[0];
  }
}

/**
 * Initializes our passport authentication module.
 */
function initialize(passport: passport.PassportStatic){
  
  // The authenticateUser funciton will be async when run with PSQL
  const authenticateUser = (username:string, password:string, done: (arg0: Error, arg1: boolean | User) => any) => {
    const user = getUserByUsername(username);
    if (user == null){
      const failureMsg = "LOGIN: FAIL: No User with that username.";
      console.log(failureMsg)
      return done(null, false);
    }
    console.log(`Expecting password to be ${user.password}`);
    if (password === user.password) {
      const successMsg = "LOGIN: SUCCESS: User and password match - Successful login.";
      console.log(successMsg);
      return done(null, user)
    } else {
      const failureMsg = "LOGIN: FAIL: Password did not match";
      console.log(failureMsg)
      return done(null, false)
    }
    
  }
  passport.use(new LocalStrategy( {
    usernameField: 'username'
  }, authenticateUser ));
  passport.serializeUser((user:User, done: (arg0: any, arg1: number) => void) => {
    done(null, user.id);
  });
  passport.deserializeUser((id:number, done: (arg0: any, arg1: User) => any) => {
    const user = getUserById(id);
    return done(null, user);
  });
}

module.exports = initialize;