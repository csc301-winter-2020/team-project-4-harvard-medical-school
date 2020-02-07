import * as express from 'express';

type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router:Router = express.Router();

/**
 * The router for our API calls. Make sure to always send the appropriate HTTP status when
 * you res.send() anything.
 */

/**
 * TODO: Get the details of the current logged in user in JSON
 */
router.get('/api/me', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        example: "hello",
        example2: "world"
    });
});

/**
 * TODO: Return all the patient profiles that a user has.
 */
router.get('/api/student/:userId/patientprofiles', (req:Request, res:Response, next:NextFunction) => {
    const userId = req.params.userId;
    res.status(200).json('');
});

/**
 * TODO: Return the patient profile of this id
 */
router.get('/api/patientprofile/:patientId', (req:Request, res:Response, next:NextFunction) => {
    const patientId = req.params.patientId;
    res.status(200).json('');
});

/**
 * TODO: Return all the classes this user (student) is in
 */
router.get('/api/student/:userId/classes', (req:Request, res:Response, next:NextFunction) => {
    const userId = req.params.userId;
    res.status(200).json('');
});

/**
 * TODO: Return all the classes this instructor manages
 */
router.get('/api/instructor/:userId/classes', (req:Request, res:Response, next:NextFunction) => {
    const userId = req.params.userId;
    res.status(200).json('');
});

export default router;