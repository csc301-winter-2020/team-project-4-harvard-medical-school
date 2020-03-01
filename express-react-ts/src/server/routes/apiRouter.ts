import * as express from 'express';
const { checkAuthenticated, checkGuest } = require('../auth/authCheck');
import * as aws from "aws-sdk";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();
type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router:Router = express.Router();

import {Pool, Client} from "pg";

const pool: Pool = new Pool();

/**
 * The router for our API calls. Make sure to always send the appropriate HTTP status when
 * you res.send() anything.
 */

/**
 * TODO: Get the details of the current logged in user in JSON
 */
router.get('/api/me', checkAuthenticated, (req:Request, res:Response, next:NextFunction) => {
    const user:any = req.user;
    user.password = undefined; //Dont send password with JSON.
    res.status(200).json(req.user);
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
    const patientId:string = req.params.patientId;
    pool.connect().then((client) => {
        const query_string: string = "SELECT * FROM csc301db.patient_profile WHERE patient_id = $1";
        return client.query(query_string, [parseInt(patientId)]);
    }).then((query_result => {
        if (query_result.rowCount === 0) {
            res.status(404).send();
        } else {
            res.status(200).json(query_result.rows[0]);
        }
    }));
    // res.status(200).json('');
});


function save_to_aws(data: any, key: string): any {
    const params:any = {
        Bucker: bucket,
        Key: "djddjdjjd",
        Body: JSON.stringify(data, null, 2)
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
            console.log("upload success");
            if (err) {
                console.log("FUCKED");
                console.log(err);
                reject();
            } else {
                console.log("Success");
                resolve("KEY"+key);
            }
        });
    });
}

/**
 * Create a new patient profile for patient <patientId>
 */
router.post('/api/patientprofile/:patientId', (req:Request, res:Response, next:NextFunction) => {
    const patientId: string = req.params.patientId;
    const new_patient: any = req.body;
    console.log(req.body);
    const params_arr: any = [];
    params_arr.push(new_patient.student_id);
    params_arr.push(new_patient.patient_id);
    params_arr.push(new_patient.first_name);
    params_arr.push(new_patient.family_name);
    params_arr.push(new_patient.age);
    params_arr.push(new_patient.gender_at_birth);
    params_arr.push(new_patient.gender);
    const upload_promise: any = [];
    const attributes: Array<string> =
    ['pregnant', 'country_residence', 'country_visited', 'complaint',
    'medical_history', 'social_history', 'family_history'];
    for (let i = 0; i < attributes.length; i++) {
        if (new_patient[attributes[i]].type === 'canvas') {
            const time: number = Date.now();
            const key_name: string = `canvas_${patientId}_${req.user}_${attributes[i]}_${time}`;
            console.log(key_name);
            // upload_promise.push(
            //     save_to_aws(new_patient[attributes[i]].value, key_name));
            upload_promise.push(Promise.resolve("CANVAS"+new_patient[attributes[i]].value));
        } else if (new_patient[attributes[i]].type === 'text') {
            upload_promise.push(Promise.resolve("TEXT"+new_patient[attributes[i]].value));
        } else {
            return Promise.reject(400);
        }
    }
    console.log(upload_promise);
    Promise.all(upload_promise).then((values) => {
        for (let i = 0; i < values.length; i++) {
            params_arr.push(values[i]);
        }
        console.log('upload sceesss');
        const insert_query: string = "INSERT INTO csc301db.patient_profile \
            (student_id, patient_id, first_name, family_name, age, gender_at_birth\
            ,gender, pregnant, country_residence, country_visited, complaint, medical_history,\
            social_history, family_history) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9\
                ,$10, $11, $12, $13, $14);";
        return pool.query(insert_query, params_arr);
    }).then((result) => {
        res.status(200).send();
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });  
})

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