/**
 * Functions for passport initialization. Passport is the module we are using
 * for logging in and out and stuff.
 */


const LocalStrategy = require("passport-local").Strategy;
import * as passport from "passport";
import { User } from "../server";

const { Pool, Client } = require("pg");

const pool: any = new Pool();

/**
 * Finds a user with a given username.
 * @param username The username of the user we are trying to find
 */
function getUserByUsername(username: string) {
  console.log(`LOGIN: Trying to log in username: ${username}`);

  return new Promise<User>((resolve, reject) => {
        const query: string =
          "SELECT id, username, password, default_mode, default_sidebar FROM csc301db.users WHERE username = $1";
        pool.query(query, [username])
      .then((result: any) => {
        console.log(result);
        if (result.rowCount == 1) {
          resolve(result.rows[0]);
        } else {
          resolve(null);
        }
      });
  });
}

/**
 * * Finds a user based on an id.
 * @param id The id of the user we are trying to find.
 */
function getUserById(id: number) {
  console.log(`LOGIN: Trying to log in user with ID: ${id}`);

  return new Promise<User>((resolve, reject) => {
        const query: string =
          "SELECT * FROM csc301db.users WHERE id = $1";
        pool.query(query, [id])
      .then((result: any) => {
        if (result.rowCount == 1) {
          resolve(result.rows[0]);
        } else {
          resolve(null);
        }
      });
  });
}

/**
 * Initializes our passport authentication module.
 */
function initialize(passport: passport.PassportStatic) {
  // The authenticateUser funciton will be async when run with PSQL
  const authenticateUser = (
    username: string,
    password: string,
    done: (arg0: Error, arg1: boolean | User) => any
  ) => {
    getUserByUsername(username).then((user: User) => {
      if (user == null) {
        const failureMsg = "LOGIN: FAIL: No User with that username.";
        console.log(failureMsg);
        return done(null, false);
      }
      console.log(`Expecting password to be ${user.password}`);
      if (password === user.password) {
        const successMsg =
          "LOGIN: SUCCESS: User and password match - Successful login.";
        console.log(successMsg);
        return done(null, user);
      } else {
        const failureMsg = "LOGIN: FAIL: Password did not match";
        console.log(failureMsg);
        return done(null, false);
      }
    });
  };
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
      },
      authenticateUser
    )
  );
  passport.serializeUser(
    (user: User, done: (arg0: any, arg1: number) => void) => {
      done(null, user.id);
    }
  );
  passport.deserializeUser(
    (id: number, done: (arg0: any, arg1: User) => any) => {
      getUserById(id).then(user => {
        return done(null, user);
      });
    }
  );
}

module.exports = initialize;
