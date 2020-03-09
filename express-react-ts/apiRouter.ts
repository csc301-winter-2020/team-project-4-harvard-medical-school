import * as express from "express";
const { checkAuthenticated, checkGuest } = require("../auth/authCheck");
import * as dotenv from "dotenv";
// @ts-ignore
import bodyParser = require("body-parser");
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
 * TODO: Get the details of the current logged in user in JSON
 */
router.get(
  "/api/me",
  checkAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    user.password = undefined; //Dont send password with JSON.
    res.status(200).json(req.user);
  }
);

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
      res.status(400).send();
    }
  }
);

/**
 * TODO: Return all the patient profiles that a user has.
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
            res.status(404).send();
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
        console.log(err);
        res.status(500).json(err);
      });
  }
);

/**
 * TODO: Return the patient profile of this id
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
          console.log(result);

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
              console.log(this_attribute);
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
router.post(
  "/api/patientprofile/",
  (req: Request, res: Response, next: NextFunction) => {
    // const patientId: string = req.params.patientId;
    const new_patient: any = req.body;
    console.log(req.body);
    const params_arr: any = [];
    params_arr.push(new_patient.student_id);
    // params_arr.push(new_patient.patient_id);
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
      console.log(key_name);
      if (new_patient[attributes[i] + "_canvas"] === null) {
        upload_promise.push(Promise.resolve(null));
      } else {
        upload_promise.push(
          save_to_aws(new_patient[attributes[i] + "_canvas"], key_name)
        );
      }
    }
    console.log(upload_promise);
    Promise.all(upload_promise)
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          params_arr.push(values[i]);
        }
        console.log("upload sceesss");
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
            assessments_canvas, imaging_canvas \
            ) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8, $9\
                ,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,\
                $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, \
                $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44,\
                $45, $46, $47, $48, $49, $50, $51) RETURNING id;";
        return pool.query(insert_query, params_arr);
      })
      .then((result: any) => {
        console.log(result);
        res.status(200).json(result.rows[0]);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

/**
 * Create a new patient profile for patient <patientId>
 */
router.patch(
  "/api/patientprofile/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const profile_id: string = req.params.id;
    const new_patient: any = req.body;
    console.log(req.body);
    const params_arr: any = [];
    // params_arr.push(profile_id);
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
      console.log(key_name);
      if (new_patient[attributes[i] + "_canvas"] === null) {
        upload_promise.push(Promise.resolve(null));
      } else {
        upload_promise.push(
          save_to_aws(new_patient[attributes[i] + "_canvas"], key_name)
        );
      }
    }
    console.log(upload_promise);
    Promise.all(upload_promise)
      .then(values => {
        for (let i = 0; i < values.length; i++) {
          params_arr.push(values[i]);
        }
        console.log("upload sceesss");
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
            assessments_canvas, imaging_canvas, id \
            ) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8, $9\
                ,$10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,\
                $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, \
                $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44,\
                $45, $46, $47, $48, $49, $50, $51, $52) RETURNING id;";
        return pool.query(insert_query, params_arr.concat([profile_id]));
      })
      .then((result: any) => {
        console.log(result);
        res.status(200).json(result.rows[0]);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

/**
 * TODO: Return all templates for a user
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
        // console.log(result);
        if (result.rowCount === 0) {
          res.status(404).json({ error: "That template does not exist." });
        }
        // const template_arr: any = result.rows;
        // for (let i = 0; i < template_arr.length; i++) {
        //   template_arr[i].template = JSON.parse(template_arr[i].template);
        // }
        res.status(200).json(result.rows[0]);
      })
      .catch((err: any) => {
        console.log(err);
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
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
);

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
        console.log(err);
        res
          .status(500)
          .json({ message: "An error occurred while deleting this template." });
      });
  }
);

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
        console.log(err);
        res.status(400).send();
      });
  }
);

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
        id, last_modified, first_name, family_name, gender, age, country_residence, pregnant\
        FROM csc301db.patient_profile WHERE student_id = $1";
    pool
      .query(query_string, [student_id])
      .then((result: any) => {
        res.status(200).json(result.rows);
      })
      .catch((err: any) => {
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
        console.log(err);
        res.status(400).send();
      });
  }
);

/**
 * TODO: Return all the classes this user (student) is in
 */
router.get(
  "/api/student/:userId/classes",
  (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    res.status(200).json("");
  }
);

/**
 * TODO: Return all the classes this instructor manages
 */
router.get(
  "/api/instructor/:userId/classes",
  (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    res.status(200).json("");
  }
);

export default router;
