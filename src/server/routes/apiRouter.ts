/**
 * These are the API routes for literally everything not related to users logging in our out.
 */

import * as express from "express";
const { checkAuthenticated, checkGuest } = require("../auth/authCheck");
const vision: any = require("@google-cloud/vision");
const vision_client = new vision.ImageAnnotatorClient();
const https: any = require("axios");
import * as dotenv from "dotenv";
import bodyParser = require("body-parser");
import { text } from "@fortawesome/fontawesome-svg-core";
dotenv.config();
type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router: Router = express.Router();

const { Pool, Client } = require("pg");
const pool: any = new Pool();

const aws: any = require("aws-sdk");
aws.config.update({
  accessKeyId: process.env.AWSKEYID,
  secretAccessKey: process.env.AWSKEY,
});
const s3 = new aws.S3();
const bucket: string = "csc301";
const urlExpiredTime: number = 10;

/**
 * The router for our API calls. Make sure to always send the appropriate HTTP status when
 * you res.send() anything.
 */

/**
 * Get the details of the current logged in user in JSON
 */
router.get(
  "/api/me",
  checkAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    user.password = undefined; //Dont send password with JSON.
    res.status(200).json(user);
  }
);

/**
 * Get the details of a given user.
 */
router.get(
  "/api/users/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    const query_string: string = "SELECT * FROM csc301db.users WHERE id = $1";
    pool
      .query(query_string, [userId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        if (result.rowCount !== 1) {
          res.status(404).send();
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch((err: any) => {
        console.log("error1")
        res.status(400).send();
      });
  }
);

/**
 * Update the params 'default_mode' and 'default_sidebar' for a user, which are 
 * set in the user settings page.
 */
router.post(
  "/api/updateUser/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    const body: any = req.body;
    if (
      body.default_mode === "Both" ||
      body.default_mode === "Canvas" ||
      body.default_mode === "text" ||
      body.default_sidebar === true ||
      body.default_sidebar === true
    ) {
      const query_string: string =
        "UPDATE csc301db.users SET default_mode = $1\
          , default_sidebar = $2 WHERE id = $3";
      pool
        .query(query_string, [body.default_mode, body.default_sidebar, userId])
        .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
          res.status(200).send();
        })
        .catch((err: any) => {
          res.status(400).send();
        });
    } else {
      console.log("error2")
      res.status(400).send();
    }
  }
);

/**
 * Update a final diagnosis for a patient profile with this ID.
 */
router.patch(
  "/api/patientprofilefinaldiagnosis/:id",
  (req: Request, res: Response) => {
    const profile_id: number = parseInt(req.params.id);
    const body: any = req.body;
    const query_string: string =
      "UPDATE csc301db.patient_profile SET \
        final_diagnosis = $1 \
        WHERE id = $2";
    pool
      .query(query_string, [body.final_diagnosis, profile_id])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).json({ message: "Successful update." });
      })
      .catch((err: any) => {
        console.log(err);
        console.log("error3")
        res.status(500).json({ error: err });
      });
  }
);

/**
 * Return all the patient profiles that a user has.
 */
router.get(
  "/api/student/:userId/patientprofiles",
  (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const query_string: string =
      "SELECT * FROM csc301db.patient_profile WHERE student_id = $1";
    pool
      .query(query_string, [parseInt(userId)])
      .then(
        (query_result: { rowCount: number; rows: { [x: string]: any } }) => {
          if (query_result.rowCount === 0) {
            res.status(200).json([]);
          } else {
            const attributes: Array<string> = [
              "pregnant",
              "country_residence",
              "country_visited",
              "complaint",
              "medical_history",
              "social_history",
              "family_history",
              "country",
              "hpi",
              "hospital_history",
              "medications",
              "allergies",
              "work",
              "living_conditions",
              "sexual_history",
              "etoh",
              "drinks_per_week",
              "last_time_smoked",
              "packs_per_day",
              "other_substances",
              "assessments",
              "imaging",
            ];
            for (let j = 0; j < query_result.rowCount; j++) {
              for (let i = 0; i < attributes.length; i++) {
                const this_attribute = attributes[i] + "_canvas";
                if (query_result.rows[j][this_attribute] !== null) {
                  query_result.rows[j][this_attribute] = s3.getSignedUrl(
                    "getObject",
                    {
                      Bucket: bucket,
                      Key: query_result.rows[j][this_attribute],
                      Expires: urlExpiredTime,
                    }
                  );
                }
              }
            }
            res.status(200).json(query_result.rows);
          }
        }
      )
      .catch((err: any) => {
        console.log("error4")
        console.log(err);
        
        res.status(500).json(err);
      });
  }
);

/**
 * Return the patient profile of this id
 */
router.get(
  "/api/patientprofile/:Id",
  (req: Request, res: Response, next: NextFunction) => {
    const profile_id: string = req.params.Id;
    const query_string: string =
      "SELECT * FROM csc301db.patient_profile WHERE id = $1";
    pool
      .query(query_string, [parseInt(profile_id)])
      .then((query_result: { rowCount: number; rows: any[] }) => {
        if (query_result.rowCount === 0) {
          res.status(404).send();
        } else {
          const result: any = query_result.rows[0];
          // console.log(result);

          const attributes: Array<string> = [
            "pregnant",
            "country_residence",
            "country_visited",
            "complaint",
            "medical_history",
            "social_history",
            "family_history",
            "country",
            "hpi",
            "hospital_history",
            "medications",
            "allergies",
            "work",
            "living_conditions",
            "sexual_history",
            "etoh",
            "drinks_per_week",
            "last_time_smoked",
            "packs_per_day",
            "other_substances",
            "assessments",
            "imaging",
          ];
          // the for loop to translate key into url
          for (let i = 0; i < attributes.length; i++) {
            const this_attribute = attributes[i] + "_canvas";
            if (result[this_attribute] !== null) {
              // console.log(this_attribute);
              result[this_attribute] = s3.getSignedUrl("getObject", {
                Bucket: bucket,
                Key: result[this_attribute],
                Expires: urlExpiredTime,
              });
            }
          }
          res.status(200).json(result);
        }
      })
      .catch((err: any) => {
        console.log("error5")
        console.log(err);
        res.status(500).send();
      });
    // res.status(200).json('');
  }
);

function save_to_aws(data: any, key: string): any {
  const params: any = {
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(data, null, 2),
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, function(err: any, data: any) {
      // console.log("upload success");
      if (err) {
        console.log("error6")
        console.log(err);
        reject();
      } else {
        // console.log("Success");
        resolve(key);
      }
    });
  });
}

/**
 * Create a new patient profile for patient <patientId>
 */
router.post(
  "/api/patientprofile/",
  (req: Request, res: Response, next: NextFunction) => {
    // const patientId: string = req.params.patientId;
    const new_patient: any = req.body;
    // console.log(req.body);
    const params_arr: any = [];
    params_arr.push(new_patient.student_id);
    params_arr.push(new_patient.first_name);
    params_arr.push(new_patient.family_name);
    params_arr.push(new_patient.age);
    params_arr.push(new_patient.gender_at_birth);
    params_arr.push(new_patient.gender);
    params_arr.push(new_patient.smoker);
    const upload_promise: any = [];
    const attributes: Array<string> = [
      "pregnant",
      "country_residence",
      "country_visited",
      "complaint",
      "medical_history",
      "social_history",
      "family_history",
      "country",
      "hpi",
      "hospital_history",
      "medications",
      "allergies",
      "work",
      "living_conditions",
      "sexual_history",
      "etoh",
      "drinks_per_week",
      "last_time_smoked",
      "packs_per_day",
      "other_substances",
      "assessments",
      "imaging",
    ];
    for (let i = 0; i < attributes.length; i++) {
      params_arr.push(new_patient[attributes[i]]);
    }
    for (let i = 0; i < attributes.length; i++) {
      const time: number = Date.now();
      const key_name: string = `canvas_${req.user}_${attributes[i]}_${time}`;
      if (new_patient[attributes[i] + "_canvas"] === null) {
        upload_promise.push(Promise.resolve(null));
      } else {
        upload_promise.push(
          save_to_aws(new_patient[attributes[i] + "_canvas"], key_name)
        );
      }
    }
    Promise.all(upload_promise)
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          params_arr.push(values[i]);
        }
        // console.log("upload sceesss");
        return pool.query(
          "DELETE FROM csc301db.patient_profile WHERE student_id = $1 AND patient_id = $2",
          [new_patient.student_id, new_patient.patient_id]
        );
      })
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        const insert_query: string =
          "INSERT INTO csc301db.patient_profile \
            (last_modified, student_id, first_name, family_name, age, gender_at_birth\
            ,gender, smoker, pregnant, country_residence, country_visited, complaint, medical_history,\
            social_history, family_history, country, hpi, \
            hospital_history, medications,\
            allergies, work, \
            living_conditions, sexual_history, \
            etoh, drinks_per_week, \
             last_time_smoked, \
            packs_per_day, other_substances,assessments, imaging,\
            pregnant_canvas, country_residence_canvas, country_visited_canvas,\
            complaint_canvas, medical_history_canvas,\
            social_history_canvas, family_history_canvas, country_canvas,\
            hpi_canvas, \
            hospital_history_canvas, medications_canvas,\
            allergies_canvas, work_canvas, \
            living_conditions_canvas, sexual_history_canvas, \
            etoh_canvas, drinks_per_week_canvas, \
             last_time_smoked_canvas, \
            packs_per_day_canvas, other_substances_canvas, \
             assessments_canvas, imaging_canvas, class_id, template_id \
            ) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8, $9\
                ,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,\
                $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, \
                $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44,\
                $45, $46, $47, $48, $49, $50, $51, $52, $53) RETURNING id;";
        return pool.query(insert_query, [...params_arr, new_patient.class_id, new_patient.template_id]);
      })
      .then((result: any) => {
        // console.log(result);
        res.status(200).json(result.rows[0]);
      })
      .catch((err: any) => {
        console.log("error7")
        console.log(err);
        res.status(400).json(err);
      });
  }
);

/**
 * Patch a patient profile for patient <patientId>
 */
router.patch(
  "/api/patientprofile/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const profile_id: string = req.params.id;
    const new_patient: any = req.body;
    const class_id: string = new_patient.class_id;
    const template_id: string = new_patient.template_id;
    const params_arr: any = [];
    params_arr.push(new_patient.student_id);
    params_arr.push(new_patient.first_name);
    params_arr.push(new_patient.family_name);
    params_arr.push(new_patient.age);
    params_arr.push(new_patient.gender_at_birth);
    params_arr.push(new_patient.gender);
    params_arr.push(new_patient.smoker);
    const upload_promise: any = [];
    const attributes: Array<string> = [
      "pregnant",
      "country_residence",
      "country_visited",
      "complaint",
      "medical_history",
      "social_history",
      "family_history",
      "country",
      "hpi",
      "hospital_history",
      "medications",
      "allergies",
      "work",
      "living_conditions",
      "sexual_history",
      "etoh",
      "drinks_per_week",
      "last_time_smoked",
      "packs_per_day",
      "other_substances",
      "assessments",
      "imaging",
    ];
    for (let i = 0; i < attributes.length; i++) {
      params_arr.push(new_patient[attributes[i]]);
    }
    for (let i = 0; i < attributes.length; i++) {
      const time: number = Date.now();
      const key_name: string = `canvas_${req.user}_${attributes[i]}_${time}`;
      // console.log(key_name);
      if (new_patient[attributes[i] + "_canvas"] === null) {
        upload_promise.push(Promise.resolve(null));
      } else {
        upload_promise.push(
          save_to_aws(new_patient[attributes[i] + "_canvas"], key_name)
        );
      }
    }
    // console.log(upload_promise);
    Promise.all(upload_promise)
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          params_arr.push(values[i]);
        }
        // console.log("upload sceesss");
        return pool.query(
          "DELETE FROM csc301db.patient_profile WHERE id = $1",
          [profile_id]
        );
      })
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        const insert_query: string =
          "INSERT INTO csc301db.patient_profile \
            (last_modified, student_id, first_name, family_name, age, gender_at_birth\
            ,gender, smoker, pregnant, country_residence, country_visited, complaint, medical_history,\
            social_history, family_history, country, hpi, \
            hospital_history, medications,\
            allergies, work, \
            living_conditions, sexual_history, \
            etoh, drinks_per_week, \
             last_time_smoked, \
            packs_per_day, other_substances, assessments, imaging,\
            pregnant_canvas, country_residence_canvas, country_visited_canvas,\
            complaint_canvas, medical_history_canvas,\
            social_history_canvas, family_history_canvas, country_canvas,\
            hpi_canvas, \
            hospital_history_canvas, medications_canvas,\
            allergies_canvas, work_canvas, \
            living_conditions_canvas, sexual_history_canvas, \
            etoh_canvas, drinks_per_week_canvas, \
             last_time_smoked_canvas, \
            packs_per_day_canvas, other_substances_canvas, \
             assessments_canvas, imaging_canvas, id, class_id, template_id \
            ) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8, $9\
                ,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,\
                $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, \
                $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44,\
                $45, $46, $47, $48, $49, $50, $51, $52, $53, $54) RETURNING id;";
        return pool.query(insert_query, [...params_arr, profile_id, class_id, template_id]);
      })
      .then((result: any) => {
        // console.log(result);
        res.status(200).json(result.rows[0]);
      })
      .catch((err: any) => {
        console.log("error9")
        console.log(err);
        res.status(400).json(err);
      });
  }
);

/**
 * Return all templates for a user
 */
router.get(
  "/api/student/:userId/templates",
  (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    const query_string: string =
      "SELECT * FROM csc301db.templates WHERE user_id = $1";
    pool
      .query(query_string, [userId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error10")
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

/**
 * Get the template for this user and template id.
 */
router.get(
  "/api/student/:userId/template/:templateId",
  (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);
    const templateId: number = parseInt(req.params.templateId);
    const query_string: string =
      "SELECT * FROM csc301db.templates WHERE user_id = $1 AND template_id = $2";
    pool
      .query(query_string, [userId, templateId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        if (result.rowCount === 0) {
          res.status(404).json({ error: "That template does not exist." });
        }
        res.status(200).json(result.rows[0]);
      })
      .catch((err: any) => {
        console.log("error11")
        if (Number.isNaN(templateId)){
          console.log("PatientProfile has Null (or deleted) template. The default template will be used instead.");
        } else {
          console.log(`There was an error fetching the corresponding template for user ${userId} and templateId ${templateId}`);
          console.log(err);
        }
        res.status(500).json({ error: err });
      });
  }
);

/**
 * Update a user template
 */
router.patch(
  "/api/student/:userId/template/:templateId",
  (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);
    const templateId: number = parseInt(req.params.templateId);
    const body: any = req.body;
    const query_string: string =
      "UPDATE csc301db.templates SET\
        template_name = $1,\
        date_millis = $2,\
        template = $3\
        WHERE user_id = $4 AND template_id = $5";
    pool
      .query(query_string, [
        body.template_name,
        body.date_millis,
        JSON.stringify(body.template),
        userId,
        templateId,
      ])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).json({ message: "Successful update." });
      })
      .catch((err: any) => {
        console.log("error12")
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

/**
 * Deletes a template for a given user.
 */
router.delete(
  "/api/student/:userId/templates/:templateId",
  (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);
    const templateId: number = parseInt(req.params.templateId);
    const insert_query: string =
      "DELETE FROM csc301db.templates WHERE user_id = $1 AND template_id = $2";
    pool
      .query(insert_query, [userId, templateId])
      .then(() => {
        res.status(200).json({ message: "Successful deletion." });
      })
      .catch((err: any) => {
        console.log("error13")
        console.log(err);
        res
          .status(500)
          .json({ message: "An error occurred while deleting this template." });
      });
  }
);

/**
 * Creates a new template for a user.
 */
router.post(
  "/api/student/:userId/templates/new",
  (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId);
    const body: any = req.body;
    const insert_query: string =
      "INSERT INTO csc301db.templates(user_id, template_id, template_name,\
        date_millis, template) VALUES ($1, DEFAULT, $2, $3, $4)";
    pool
      .query(insert_query, [
        userId,
        body.template_name,
        body.date_millis,
        JSON.stringify(body.template),
      ])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).send();
      })
      .catch((err: any) => {
        console.log("error14")
        console.log(err);
        res.status(400).send();
      });
  }
);

router.get(
  "/api/reviewOfSystems/:patientId",
  (req: Request, res: Response, next: NextFunction) => {
    const patientId: number = parseInt(req.params.patientId);
    const query_string: string =
      "SELECT info FROM csc301db.review_of_systems\
      WHERE patient_id = $1";
    pool
      .query(query_string, [patientId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        if (result.rowCount === 0) {
          res.status(404).send();
        } else {
          res.status(200).json(result.rows[0].info);
        }
      });
  }
);

router.post(
  "/api/reviewOfSystems/:patientId",
  (req: Request, res: Response, next: NextFunction) => {
    const patientId: number = parseInt(req.params.patientId);
    const delete_string: string =
      "DELETE FROM csc301db.review_of_systems \
    WHERE patient_id = $1";
    pool
      .query(delete_string, [patientId])
      .then((result: any) => {
        const insert_string: string =
          "INSERT INTO csc301db.review_of_systems \
      (patient_id, info ) VALUES ($1, $2)";
        return pool.query(insert_string, [patientId, JSON.stringify(req.body)]);
      })
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).send();
      })
      .catch((err: any) => {
        console.log("error15")
        res.status(400).send();
      });
  }
);

router.get(
  "/api/physicalExaminations/:patientId",
  (req: Request, res: Response, next: NextFunction) => {
    const patientId: number = parseInt(req.params.patientId);
    const query_string: string =
      "SELECT info FROM csc301db.physical_examinations\
      WHERE patient_id = $1";
    pool
      .query(query_string, [patientId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        if (result.rowCount === 0) {
          res.status(404).send();
        } else {
          res.status(200).json(result.rows[0].info);
        }
      });
  }
);

router.post(
  "/api/physicalExaminations/:patientId",
  (req: Request, res: Response, next: NextFunction) => {
    const patientId: number = parseInt(req.params.patientId);
    const delete_string: string =
      "DELETE FROM csc301db.physical_examinations \
    WHERE patient_id = $1";
    pool
      .query(delete_string, [patientId])
      .then((result: any) => {
        const insert_string: string =
          "INSERT INTO csc301db.physical_examinations \
      (patient_id, info ) VALUES ($1, $2)";
        return pool.query(insert_string, [patientId, JSON.stringify(req.body)]);
      })
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).send();
      })
      .catch((err: any) => {
        console.log("error16")
        res.status(400).send();
      });
  }
);

router.get(
  "/api/labResults/:patientId",
  (req: Request, res: Response, next: NextFunction) => {
    const patientId: number = parseInt(req.params.patientId);
    const query_string: string =
      "SELECT info FROM csc301db.lab_results\
      WHERE patient_id = $1";
    pool
      .query(query_string, [patientId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        if (result.rowCount === 0) {
          res.status(404).send();
        } else {
          res.status(200).json(result.rows[0].info);
        }
      });
  }
);

router.post(
  "/api/labResults/:patientId",
  (req: Request, res: Response, next: NextFunction) => {
    const patientId: number = parseInt(req.params.patientId);
    const delete_string: string =
      "DELETE FROM csc301db.lab_results \
    WHERE patient_id = $1";
    pool
      .query(delete_string, [patientId])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        const insert_string: string =
          "INSERT INTO csc301db.lab_results \
      (patient_id, info ) VALUES ($1, $2)";
        return pool.query(insert_string, [patientId, JSON.stringify(req.body)]);
      })
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).send();
      })
      .catch((err: any) => {
        console.log("error17")
        res.status(400).send();
      });
  }
);

/**
 * Route to get attributes need for the homepage.
 */
router.get(
  "/api/studentHomepage/:studentID",
  (req: Request, res: Response, next: NextFunction) => {
    const student_id: number = parseInt(req.params.studentID);
    const query_string: string =
      "SELECT \
        id, last_modified, first_name, family_name, gender, age, country_residence, pregnant, class_id\
        FROM csc301db.patient_profile WHERE student_id = $1";
    pool
      .query(query_string, [student_id])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error18")
        console.log(err);
        res.status(400).json(err);
      });
  }
);

/**
 * Route to delete patientprofile
 */
router.delete(
  "/api/patientProfile/:patientID/:studentID",
  (req: Request, res: Response, next: NextFunction) => {
    const student_id: number = parseInt(req.params.studentID);
    const patient_id: number = parseInt(req.params.patientID);
    const delete_query: string =
      "DELETE FROM csc301db.patient_profile\
    WHERE student_id = $1 AND id = $2";
    pool
      .query(delete_query, [student_id, patient_id])
      .then((result: any) => {
        if (result.rowCount === 0) {
          res.status(404).send();
        } else {
          res.status(200).send();
        }
      })
      .catch((err: any) => {
        console.log("error19")
        console.log(err);
        res.status(400).send();
      });
  }
);

/**
 * Get all the users of type student.
 */
router.get(
  "/api/students/all",
  (req: Request, res: Response, next: NextFunction) => {
    const query_string: string =
      "SELECT * FROM csc301db.users WHERE user_type = 'Student'";
    pool
      .query(query_string, [])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error20")
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

/**
 * Get all the users.
 */
router.get(
  "/api/all/users",
  (req: Request, res: Response, next: NextFunction) => {
    const query_string: string =
      "SELECT * FROM csc301db.users";
    pool
      .query(query_string, [])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error21")
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

/**
 * Get all students enrollment in a specific class
 */
router.get(
  "/api/students/:classID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const query_string: string =
      "SELECT id, first_name, last_name, avatar_url\
     FROM csc301db.users JOIN csc301db.students_enrollment\
     ON csc301db.users.id = csc301db.students_enrollment.student_id\
     WHERE csc301db.students_enrollment.class_id = $1";
    pool
      .query(query_string, [class_id])
      .then((result: any) => {
        if (result.rowCount === 0) {
          res.status(404).send("No students in this class");
        } else {
          res.status(200).json(result.rows);
        }
      })
      .catch((err: any) => {
        console.log("error22")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Get all classes that a student is in.
 */
router.get(
  "/api/classesForStudent/:sid",
  (req: Request, res: Response, next: NextFunction) => {
    const sid: number = parseInt(req.params.sid);
    const query_string: string =
      "SELECT c.* \
     FROM csc301db.class c JOIN csc301db.students_enrollment se \
     ON c.id = se.class_id \
     WHERE se.student_id = $1";
    pool
      .query(query_string, [sid])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error23")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Get all students not enrolled in a specific class
 */
router.get(
  "/api/students/eligible/:classID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const query_string: string =
      "SELECT id, first_name, last_name\
     FROM csc301db.users U1\
     WHERE U1.user_type = 'Student' AND NOT EXISTS (SELECT 1\
      FROM csc301db.users U2 JOIN csc301db.students_enrollment\
      ON U2.id = csc301db.students_enrollment.student_id\
      WHERE U1.id = U2.id AND csc301db.students_enrollment.class_id = $1)";
    pool
      .query(query_string, [class_id])
      .then((result: any) => {
        if (result.rowCount === 0) {
          res.status(404).json("No more eligible students");
        } else {
          res.status(200).json(result.rows);
        }
      })
      .catch((err: any) => {
        console.log("error24")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Add a student to a class
 */
router.post(
  "/api/classes/:classID/:studentID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const student_id: number = parseInt(req.params.studentID);
    const insert_string: string =
      "INSERT INTO csc301db.students_enrollment\
      (class_id, student_id) VALUES ($1, $2)";
    pool
      .query(insert_string, [class_id, student_id])
      .then((result: any) => {
        res.status(200).send("Added student to class");
      })
      .catch((err: any) => {
        console.log("error25")
        res.status(400).send();
      });
  }
);

/**
 * Remove a student from a class
 */
router.delete(
  "/api/classes/:classID/:studentID",
  (req: Request, res: Response, next: NextFunction) => {
    const student_id: number = parseInt(req.params.studentID);
    const class_id: number = parseInt(req.params.classID);
    const delete_query: string =
      "DELETE FROM csc301db.students_enrollment\
       WHERE student_id = $1 AND class_id = $2";
    pool
      .query(delete_query, [student_id, class_id])
      .then((result: any) => {
        if (result.rowCount === 0) {
          res.status(404).send("Enrolled student not found");
        } else {
          res.status(200).send();
        }
      })
      .catch((err: any) => {
        console.log("error26")
        console.log(err);
        res.status(400).send();
      });
  }
);

/**
 * Get all classes
 */
router.get(
  "/api/classes/all",
  (req: Request, res: Response, next: NextFunction) => {
    const query_string: string = "SELECT * FROM csc301db.class";
    pool
      .query(query_string, [])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error27")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Get a class name by ID
 */
router.get(
  "/api/classes/:classID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const query_string: string =
      "SELECT c.*, u.first_name, u.last_name FROM csc301db.class c JOIN csc301db.users u ON \
    u.id = c.instructor_id \
    WHERE c.id = $1";
    pool
      .query(query_string, [class_id])
      .then((result: any) => {
        if (result.rowCount === 0) {
          res.status(404).send("No specified class found");
        } else {
          res.status(200).json(result.rows);
        }
      })
      .catch((err: any) => {
        console.log("error28")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Patch a class name by ID
 */
router.patch(
  "/api/classes/:classID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const body: any = req.body;
    const query_string: string =
      "UPDATE csc301db.class SET name = $1, instructor_id = $2, help_enabled = $3 \
    WHERE id = $4";
    pool
      .query(query_string, [
        body.name,
        body.instructor_id,
        body.help_enabled,
        class_id,
      ])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error29")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Patch a class for just help and tips for a given ID.
 */
router.patch(
  "/api/classesTips/:classID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const body: any = req.body;
    const query_string: string =
      "UPDATE csc301db.class SET help_enabled = $1 \
    WHERE id = $2";
    pool
      .query(query_string, [
        body.help_enabled,
        class_id,
      ])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error30")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Create new class
 */
router.post(
  "/api/classes/",
  (req: Request, res: Response, next: NextFunction) => {
    const new_class = req.body;
    const insert_string: string =
      "INSERT INTO csc301db.class\
      (name, instructor_id) VALUES ($1, $2)";
    pool
      .query(insert_string, [new_class.name, new_class.instructor_id])
      .then((result: { rowCount: number; rows: { [x: string]: any } }) => {
        // console.log(result);
        res.status(200).json(result);
      })
      .catch((err: any) => {
        console.log("error31")
        res.status(400).send();
      });
  }
);

/**
 * Deleting a class
 */
router.delete(
  "/api/classes/:classID",
  (req: Request, res: Response, next: NextFunction) => {
    const class_id: number = parseInt(req.params.classID);
    const delete_enrollment: string =
      "DELETE FROM csc301db.students_enrollment\
       WHERE class_id = $1";
    pool
      .query(delete_enrollment, [class_id])
      .then((result: any) => {
        const delete_class: string =
          "DELETE FROM csc301db.class\
           WHERE id = $1";

        return pool.query(delete_class, [class_id]);
      })
      .then((result: any) => {
        res.status(200).send();
      })
      .catch((err: any) => {
        console.log("error32")
        console.log(err);
        res.status(400).send();
      });
  }
);

/**
 * Get all classes that an instructor teaches
 */
router.get(
  "/api/classesOfInstructors/:instructorId",
  (req: Request, res: Response, next: NextFunction) => {
    const instructor_id: number = parseInt(req.params.instructorId);
    const query_string: string =
      "SELECT id, name \
     FROM csc301db.class \
     WHERE csc301db.class.instructor_id = $1";
    pool
      .query(query_string, [instructor_id])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
        console.log("error33")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

/**
 * Get all instructors
 */
router.get(
  "/api/instructors/all",
  (req: Request, res: Response, next: NextFunction) => {
    const query_string: string =
      "SELECT id, first_name, last_name \
     FROM csc301db.users \
     WHERE csc301db.users.user_type = 'Educator'";
    pool
      .query(query_string)
      .then((result: any) => {
        if (result.rowCount === 0) {
          res.status(404).send("No instructors exist");
        } else {
          res.status(200).json(result.rows);
        }
      })
      .catch((err: any) => {
        console.log("error34")
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
);

function age_helper(age: number) {
  if (age <= 1) {
    return 1;
  } else if (age <= 5) {
    return 3;
  } else if (age <= 16) {
    return 4;
  } else if (age <= 29) {
    return 7;
  } else if (age <= 39) {
    return 5;
  } else {
    return 8;
  }
}

const nameMap: {[key: string]: string} = {
  weightLoss: "Weight Loss",
  weightGain: "Weight Gain",
  fatigue: "Fatigue",
  difficultySleeping: "Difficulty Sleeping",
  feelingUnwell: "Feeling Unwell in General",
  chronicPain: "Chronic Pain",
  fevers: "Fevers",
  chills: "Chills",
  sweatsEndocrine: "Sweats",
  lossOfAppetite: "Loss of Appetite",
  heatIntolerance: "Heat Intolerance",
  coldIntolerance: "Cold Intolerance",
  polyphagia: "Polyphagia",
  polydipsia: "Polydipsia",
  decreaseInVision: "Decrease In Vision",
  increaseInVision: "Increase In Vision",
  blurriness: "Blurriness",
  painVision: "Pain",
  doubleVision: "Double Vision",
  eyeDischarge: "Eye Discharge",
  redEye: "Red Eye",
  painHeadNeck: "Pain",
  soresInMouth: "Sores In Mouth",
  soresAroundMouth: "Sores Around Mouth",
  ulcersInMouth: "Ulcers In Mouth",
  ulcersAroundMouth: "Ulcers Around Mouth",
  masses: "Masses",
  growths: "Growths",
  acuityChange: "Change In Hearing Acuity",
  earPain: "Ear Pain",
  earDischarge: "Ear Discharge",
  nasalDischarge: "Nasal Discharge",
  voiceChange: "Change In Voice",
  hoarseness: "Hoarseness",
  toothPain: "Tooth Pain",
  lumpInThroat: "Sense Of Lump With Swallowing",
  chestPainPulmonary: "Chest Pain",
  cough: "Coughs",
  haemoptysis: "Haemoptysis",
  wheezing: "Wheezing",
  snoring: "Snoring",
  aponoea: "Aponoea",
  chestPainCardiovascular: "Chest Pain",
  chestPressure: "Chest Pressure",
  shortBreathRest: "Shortness Of Breath At Rest",
  shortBreathExertion: "Shortness Of Breath With Exertion",
  orthopnoea: "Orthopnoea",
  paroxysmal: "Paroxysmal Nocturnal Dyspnoea",
  lowerOedema: "Lower Extremity Oedema",
  lossOfConsciousnessCardiovascular: "Sudden Loss Of Consciousness",
  palpitation: "Palpitations",
  legPain: "Leg Pain With Ambulation",
  legCramps: "Leg Cramps With Ambulation",
  ulcersOnFeet: "Ulcers On Feet",
  woundsOnFeet: "Wounds On Feet",
  substernalPain: "Substernal Burning",
  abdominalPain: "Abdominal Pain",
  difficultySwallowing: "Difficulty Swallowing",
  painSwallowing: "Pain Upon Swallowing",
  nausea: "Nausea",
  vomiting: "Vomiting",
  vomitingBlood: "Vomiting Blood",
  abdominalSwelling: "Abdominal Distention",
  jaundice: "Jaundice",
  blackStools: "Black Stools",
  bloodyStools: "Bloody Stools",
  constipation: "Constipation",
  diarrhoea: "Diarrhoea",
  changesInBowelHabits: "Changes In Bowel Habits",
  polyuria: "Polyuria",
  bloodyUrine: "Blood In Urine",
  buringUrination: "Burning With Urination",
  incontinence: "Incontinence",
  urgentUrination: "Urgent Urination",
  frequentUrination: "Frequent Urination",
  incompleteEmptying: "Incomplete Emptying",
  hesitance: "Hesitance",
  decreasedForce: "Decreased Force Of Stream",
  needVoid: "Need To Void Soon After Urination",
  erectileDysfunction: "Erectile Dysfunction",
  penileDischarge: "Penile Discharge",
  penilePain: "Penile Pain",
  testicularPain: "Testicular Pain",
  testicularSwelling: "Testicular Swelling",
  penileUlcers: "Penile Ulcers",
  penileGrowths: "Penile Growths",
  sweatsGynaecological: "Sweats",
  pastPregnancies: "Past Pregnancies",
  vaginalDischarge: "Vaginal Discharge",
  menstruationCessation: "Cessation Of Menstruation",
  menstruationIrregularity: "Irregularity Of Menstruation",
  breastPain: "Breast Pain",
  breastDischarge: "Breast Discharge",
  breastMass: "Breast Mass",
  abnormalBleeding: "Abnormal Bleeding",
  abnormalBruising: "Abnormal Bruising",
  newLumps: "New Lumps Or Bumps",
  lossOfConsciousnessNeurological: "Abrupt Loss Of Consciousness",
  seizureActivity: "Witnessed Seizure Activity",
  numbness: "Numbness",
  weakness: "Weakness",
  dizziness: "Dizziness",
  balanceProblems: "Balance Problems",
  headaches: "Headaches",
  muscleAches: "Muscle Aches",
  jointPain: "Joint Pain",
  jointSwelling: "Joint Swelling",
  lowBackPain: "Low Back Pain",
  kneePain: "Knee Pain",
  kneeSwelling: "Knee Swelling",
  handPain: "Hand Pain",
  handSwelling: "Hand Swelling",
  elbowPain: "Elbow Pain",
  elbowSwelling: "Elbow Swelling",
  hipPain: "Hip Pain",
  hipSwelling: "Hip Swelling",
  shoulderPain: "Shoulder Pain",
  shoulderSwelling: "Shoulder Swelling",
  memory: "Memory Problems",
  confusion: "Confusion",
  anxiety: "Anxious Most Of The Time",
  hairLoss: "Hair Loss",
  skinEruptions: "Skin Eruptions",
  rashes: "Rashes",
  growingSores: "Sores That Grow/Don't Heal",
  lesions: "Lesions Changing In Size, Shape, Colour",
  itching: "Itching"
}

router.post(
  "/api/analysis/:profile_id",
  async (req: Request, res: Response, next: NextFunction) => {
    const image_payloads: string = req.body;
    let all_string: string = "";
    for (let i = 0; i < image_payloads.length; i++) {
      console.log(i);
      const image_payload: string = image_payloads[i];
      const request: any = {
        image: {
          content: image_payload,
        },
        features: [
          {
            type: "DOCUMENT_TEXT_DETECTION",
          },
        ],
        imageContext: {
          languageHints: ["en-t-i0-handwrit"],
        },
      };
      const [result] = await vision_client.annotateImage(request);
      if (result.fullTextAnnotation) {
        const text: string = result.fullTextAnnotation.text;
        all_string += text;
      }
    }
    const profile_id: number = parseInt(req.params.profile_id);
    const db_res = await pool.query(
      "SELECT patient_id, age, gender, pregnant,\
      complaint, HPI, medical_history, hospital_history, medications, allergies\
       FROM csc301db.patient_profile WHERE id = $1",
      [profile_id]
    );
    if (db_res.rowCount === 0) {
      res.status(404).json({});
    }
    
    const age: number = age_helper(db_res.rows[0].age);
    console.log(db_res.rows[0].gender);
    const gender: string = db_res.rows[0].gender === "Male" ? "m" : "f";
    // TODO: FIX THIS LATER
    const pregnant: string = "n";
    const text_arr: any = ["complaint", "HPI", "medical_history", "hospital_history", "medications", "allergies"];
    console.log(profile_id);
    for (let i = 0; i < text_arr.length; i++) {
      if (db_res.rows[0][text_arr[i]]) {
        all_string += " " + db_res.rows[0][text_arr[i]];
      }
    }
    const db_res_review: any = await pool.query("SELECT info FROM csc301db.review_of_systems WHERE patient_id = $1", [profile_id]);
    if (db_res_review.rowCount !== 0) {
      const review_of_systems: any = db_res_review.rows[0].info;
      for (let key1 in review_of_systems) {
        for (let key2 in review_of_systems[key1]) {
          if (review_of_systems[key1][key2]) {
            all_string += ","+ nameMap[key2];
          }
        }
      }
    }
    const isbell_url: string = `https://apisandbox.isabelhealthcare.com/v2/ranked_differential_diagnoses?specialties=28&dob=${age}&sex=${gender}&pregnant=${pregnant}&region=10&querytext=${all_string}&suggest=suggest+differential+diagnosis&flag=sortbyrw_advanced&searchtype=0&web_service=json&callback=diagnosiscallback&authorization=urOSKOJyYvIOj8BnIgBwJI0KgXT4BR9VYShRyAPDdbcChStimoHWbUE6ILUM0Z4S`;
    try {
      console.log(all_string);
      const isbell_res: any = await https.get(isbell_url);
      const final_result: string = isbell_res.data.slice(
        18,
        isbell_res.data.length - 2
      );
      // console.log(JSON.parse(final_result));
      const parsed_result: any = JSON.parse(final_result);
      const insert_string: string =
        "INSERT INTO csc301db.analysis \
    (time_submitted, profile_id, student_input, isbell_result) VALUES \
    (current_timestamp, $1, $2, $3)";
      await pool.query(insert_string, [profile_id, all_string, parsed_result]);
      res.status(200).json({});
    } catch (err) {
      console.log("error36")
      console.log(err);
      res.status(400).json({});
    }
  }
);

router.get(
  "/api/analysis/:profile_id",
  async (req: Request, res: Response, next: NextFunction) => {
    const profile_id = req.params.profile_id;
    const query_string: string =
      "SELECT * FROM csc301db.analysis\
     WHERE profile_id = $1 ORDER BY time_submitted DESC";
    try {
      const result: any = await pool.query(query_string, [profile_id]);
      if (result.rowCount === 0) {
        res.status(404).json({});
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (err) {
      console.log("error37")
      console.log(err);
      res.status(400).json({});
    }
  }
);

router.get(
  "/api/analysisAll/:profile_id",
  async (req: Request, res: Response, next: NextFunction) => {
    const profile_id = req.params.profile_id;
    const query_string: string =
      "SELECT * FROM csc301db.analysis\
     WHERE profile_id = $1 ORDER BY time_submitted DESC";
    try {
      const result: any = await pool.query(query_string, [profile_id]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.log("error38")
      console.log(err);
      res.status(400).json({});
    }
  }
);

export default router;
