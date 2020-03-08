const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
import * as passport from "passport";
import { User } from "../server";

const { Pool, Client } = require("pg");

const pool: any = new Pool();

/**
 * TODO: Change from dummy data to PSQL query.
 * @param username The username of the user we are trying to find
 */
function getUserByUsername(username: string) {
  console.log(`LOGIN: Trying to log in username: ${username}`);

  return new Promise<User>((resolve, reject) => {
    pool
      .connect()
      .then((client: any) => {
        const query: string =
          "SELECT id, username, password, default_mode, default_sidebar FROM csc301db.users WHERE username = $1";
        return client.query(query, [username]);
      })
      .then((result: any) => {
        console.log(result);
        if (result.rowCount == 1) {
          resolve(result.rows[0]);
        } else {
          resolve(null);
        }
      });
  });

  // IF there is not exactly one user with this username (because there are 0 users with this username)
  // if (usersWithThisUsername.length !== 1){
  //   return null;
  // } else {
  //   return usersWithThisUsername[0];
  // }
}
// getUserByUsername('will');

/**
 * * 
 * @param id The id of the user we are trying to find.
 */
function getUserById(id: number) {
  console.log(`LOGIN: Trying to log in user with ID: ${id}`);

  return new Promise<User>((resolve, reject) => {
    pool
      .connect()
      .then((client: any) => {
        const query: string =
          "SELECT * FROM csc301db.users WHERE id = $1";
        return client.query(query, [id]);
      })
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
