/**
 * These API routes are used for anything that has to do with user accounts.
 * Logging in, out, registration, modifying a user.
 */

import * as express from "express";
import { Router, Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as path from "path";

const { Pool, Client } = require("pg");
const pool: any = new Pool();

const router: Router = express.Router();

//Auth
const { checkAuthenticated, checkGuest } = require("../auth/authCheck");

/**
 * Route to accept login POST requests.
 */
router.post(
  "/login",
  checkGuest,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

/**
 * Registers a user.
 */
router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const body: any = req.body;
  const query: string =
    "INSERT INTO csc301db.users (username, first_name, last_name, avatar_url, email, password, year, user_type, date_create, location) VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9)";
  pool
    .query(query, [
      body.username,
      body.first_name,
      body.last_name,
      body.avatar_url,
      body.email,
      body.password,
      body.year,
      body.user_type,
      "Toronto General Hospital"
    ])
    .then((result: any) => {
      console.log(result);
      res.status(200).json({
        message: "Successfully registered this user: " + body.username,
      });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(400).json({
        message: `The following error occurred while registering: ${err}`,
      });
    });
});

/**
 * Logs out a user.
 */
router.get(
  "/logout",
  checkAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`A user has been logged out.`);
    req.logout();
    res.redirect("/");
  }
);

/**
 * Get all users.
 */
router.get("/api/users/all", (req: Request, res: Response) => {
  const query_string: string = "SELECT * FROM csc301db.users";
  pool
    .query(query_string, [])
    .then((query_result: { rowCount: number; rows: any[] }) => {
      const result: any = query_result.rows;
      res.status(200).json(result);
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ message: "An error occurred." });
    });
  // res.status(200).json('');
});

/**
 * Update user in the user table.
 */
router.patch(
  "/me",
  checkAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    const userId: number = user.id;
    const body: any = req.body;
    console.log(body);
    const query: string =
      "UPDATE csc301db.users SET \
        username = $1, \
        avatar_url = $2, \
        first_name = $3, \
        last_name = $4, \
        email = $5, \
        year = $6, \
        user_type = $7, \
        default_mode = $8, \
        default_sidebar = $9, \
        location = $10 \
        WHERE id = $11";
    pool
      .query(query, [
        body.username,
        body.avatar_url,
        body.first_name,
        body.last_name,
        body.email,
        body.year,
        body.user_type,
        body.default_mode,
        body.default_sidebar,
        body.location,
        userId,
      ])
      .then((result: any) => {
        console.log(result);
        res.status(200).json({
          message: "Successfully updated this user: " + body.username,
        });
      })
      .catch((err: any) => {
        console.log(err);
        res.status(400).json({
          message: `The following error occurred while updating: ${err}`,
        });
      });
  }
);

export default router;
