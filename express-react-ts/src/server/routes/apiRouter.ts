import * as express from 'express';
const { checkAuthenticated, checkGuest } = require('../auth/authCheck');
import * as dotenv from "dotenv";
import bodyParser = require('body-parser');
dotenv.config();
type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router:Router = express.Router();

const {Pool, Client} = require("pg");
const pool: any = new Pool();

const aws: any = require('aws-sdk');
aws.config.update({accessKeyId: process.env.AWSKEYID, secretAccessKey: process.env.AWSKEY});
const s3 = new aws.S3();
const bucket: string = 'csc301';
const urlExpiredTime: number = 10;

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

router.get('/api/updateUser/:userId', (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    const body: any = req.body;
    if (body.default_mode === 'Both' || body.default_mode === 'Canvas' ||
    body.default_mode === 'text' || body.default_sidebar === true ||
    body.default_sidebar === true ) {
        pool.connect().then((client) => {
            const query_string: string = "UPDATE csc301db.users SET default_mode = $1\
            , default_sidebar = $2 WHERE id = $3";
            client.query(query_string, [body.default_mode, body.default_sidebar, userId]); 
        }).then(result => {
            res.status(200).send();
        }).catch((err) => {
            res.status(400).send();
        });
    } else {
        res.status(400).send();
    }
    
});

/**
 * TODO: Return all the patient profiles that a user has.
 */
router.get('/api/student/:userId/patientprofiles', (req:Request, res:Response, next:NextFunction) => {
    const userId = req.params.userId;
    pool.connect().then((client: { query: (arg0: string, arg1: number[]) => any; }) => {
        const query_string: string = "SELECT * FROM csc301db.patient_profile WHERE student_id = $1";
        return client.query(query_string, [parseInt(userId)]);
    }).then(((query_result: { rowCount: number; rows: { [x: string]: any; }; }) => {
        if (query_result.rowCount === 0) {
            res.status(404).send();
        } else {
            const attributes: Array<string> =
            ['pregnant', 'country_residence', 'country_visited', 'complaint',
            'medical_history', 'social_history', 'family_history'];
            for (let i = 0; i < query_result.rowCount; i++) {
                for (let i = 0; i < attributes.length; i++) {
                    const this_attribute = attributes[i] + '_canvas';
                    if (query_result.rows[this_attribute] !== null) {
                        query_result.rows[this_attribute] = s3.getSignedUrl('getObject', {
                            Bucket: bucket,
                            Key: query_result.rows[this_attribute],
                            Expires: urlExpiredTime
                        });
                    }
                }
            }
            res.status(200).json(query_result.rows);
        }
    }));
});

/**
 * TODO: Return the patient profile of this id
 */
router.get('/api/patientprofile/:patientId', (req:Request, res:Response, next:NextFunction) => {
    const patientId:string = req.params.patientId;
    pool.connect().then((client: { query: (arg0: string, arg1: number[]) => any; }) => {
        const query_string: string = "SELECT * FROM csc301db.patient_profile WHERE patient_id = $1";
        return client.query(query_string, [parseInt(patientId)]);
    }).then(((query_result: { rowCount: number; rows: any[]; }) => {
        if (query_result.rowCount === 0) {
            res.status(404).send();
        } else {
            const result: any = query_result.rows[0];
            console.log(result);

            const attributes: Array<string> =
            ['pregnant', 'country_residence', 'country_visited', 'complaint',
            'medical_history', 'social_history', 'family_history', 'country',
            'hpi', 'hospital_history', 'medications', 'allergies', 'work', 
            'living_conditions', 'sexual_history', 'etoh', 'drinks_per_week',
            'last_time_smoked', 'packs_per_day', 'other_substances'];
            // the for loop to translate key into url
            for (let i = 0; i < attributes.length; i++) {
                const this_attribute = attributes[i] + '_canvas';
                if (result[this_attribute] !== null) {
                    console.log(this_attribute);
                    result[this_attribute] = s3.getSignedUrl('getObject', {
                        Bucket: bucket,
                        Key: result[this_attribute],
                        Expires: urlExpiredTime
                    });
                }
            }
            res.status(200).json(result);
        }
    })).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
    // res.status(200).json('');
});


function save_to_aws(data: any, key: string): any {
    const params:any = {
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(data, null, 2)
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, function(err: any, data: any) {
            console.log("upload success");
            if (err) {
                console.log(err);
                reject();
            } else {
                console.log("Success");
                resolve(key);
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
    params_arr.push(new_patient.smoker);
    const upload_promise: any = [];
    const attributes: Array<string> =
            ['pregnant', 'country_residence', 'country_visited', 'complaint',
            'medical_history', 'social_history', 'family_history', 'country',
            'hpi', 'hospital_history', 'medications', 'allergies', 'work', 
            'living_conditions', 'sexual_history', 'etoh', 'drinks_per_week',
            'last_time_smoked', 'packs_per_day', 'other_substances'];
    for (let i = 0; i < attributes.length; i++) {
        params_arr.push(new_patient[attributes[i]]);
    }
    for (let i = 0; i < attributes.length; i++) {
        const time: number = Date.now();
        const key_name: string = `canvas_${patientId}_${req.user}_${attributes[i]}_${time}`;
        console.log(key_name);
        if (new_patient[attributes[i]+"_canvas"] === null) {
            upload_promise.push(Promise.resolve(null));
        } else {
            upload_promise.push(
                save_to_aws(new_patient[attributes[i]+"_canvas"], key_name));
        }
    }
    console.log(upload_promise);
    Promise.all(upload_promise).then((values) => {
        for (let i = 0; i < values.length; i++) {
            params_arr.push(values[i]);
        }
        console.log('upload sceesss');
        return pool.query(
            "DELETE FROM csc301db.patient_profile WHERE student_id = $1 AND patient_id = $2",
        [new_patient.student_id, new_patient.patient_id]);
    }).then((result) => {
        const insert_query: string = "INSERT INTO csc301db.patient_profile \
            (student_id, patient_id, first_name, family_name, age, gender_at_birth\
            ,gender, smoker, pregnant, country_residence, country_visited, complaint, medical_history,\
            social_history, family_history, country, hpi, \
            hospital_history, medications,\
            allergies, work, \
            living_conditions, sexual_history, \
            etoh, drinks_per_week, \
             last_time_smoked, \
            packs_per_day, other_substances, \
            pregnant_canvas, country_residence_canvas, country_visited_canvas,\
            complaint_canvas, medical_history_canvas,\
            social_history_canvas, family_history_canvas, country_canvas,\
            hpi_canvas, \
            hospital_history_canvas, medications_canvas,\
            allergies_canvas, work_canvas, \
            living_conditions_canvas, sexual_history_canvas, \
            etoh_canvas, drinks_per_week_canvas, \
             last_time_smoked_canvas, \
            packs_per_day_canvas, other_substances_canvas \
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9\
                ,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,\
                $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, \
                $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44,\
                $45, $46, $47, $48);"; 
        return pool.query(insert_query, params_arr);
    }).then((result) => {
        res.status(200).send();
    }).catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });  
})

/**
 * TODO: Return all templates for a user
 */
router.get('/api/student/:userId/templates', (req:Request, res:Response, next:NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    pool.connect().then((client) => {
        const query_string: string = "SELECT * FROM csc301db.templates WHERE user_id = $1";
        return client.query(query_string, [userId]);
    }).then((result) => {
        if (result.rowCount === 0) {
            res.status(404).send();
        }
        const template_arr: any = result.rows;
        for (let i = 0; i < template_arr.length; i++) {
            template_arr[i].template = JSON.parse(template_arr[i].template);
        }
        res.status(200).json(template_arr);
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });

});

router.post('/api/student/:userId/templates/new', (req:Request, res:Response, next:NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    const body: any = req.body;
    pool.connect().then((client) => {
        const insert_query: string = "INSERT INTO csc301db.templates(user_id, template_name,\
            date_millis, template) VALUES ($1, $2, $3, $4)";
        return client.query(insert_query, [userId, body.template_name,
             body.date_millis, JSON.stringify(body.template)]);
    }).then((result) => {
        res.status(200).send();
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

// const example_template_json = {
//     "user_id": 1,
//     "template_name": "MyNewTemplate",
//     "date_millis": 123123123123123,
//     "template": [
//         {
//             "title": "Social History",
//             "fields": ["Work"]
//         },
//         {
//             "title": "Demographics",
//             "fields": ["sexAtBirth", "lastName", "firstname"],
//         },
//     ],
// }

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