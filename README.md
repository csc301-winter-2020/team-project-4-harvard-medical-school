[Deliverable 2 README](deliverables/deliverable-2)

# Getting Started

```bash
npm install
touch .env
npm run dev
```

Server will start on port 3000. Ensure that any environment variables `process.env.X` where X is your variable are added to the .env file you created.

Deployment to heroku made easy with the `npm run build` script which runs automatically transpiles all files when you push to heroku.

# Deployment
Heroku will automatically deploy the app when you push to the master branch. 

# Database & Google Vision
Database connection has been set up. The following environmental variable must be defined in `.env` 
for the server to run.

`PGUSER`: User name of the database connection 

`PGHOST`: IP address of the database
 
`PGPASSWORD`: Password of the database
 
`PGDATABASE`: Name of the database you want to connect

The information above will be posted in slack channel @private and it will be pined. The server will 
be shutdown if no one is using it. Let `@Qingyuan Qie` know if you can not connect to the database.

In addition, the Google Cloud Vision API need a environmental variable `GOOGLE_APPLICATION_CREDENTIALS`, which is a
path to a json file that stored the credential. The credential file will be posted in Slack `@private` Channel.

# Connecting to the Database by Database Client (Windows)

1. Download [HeidiSQL](https://www.heidisql.com/download.php) or your choice of client.
2. Then click new session in bottom left
3. Network type: postgreSQL tcp/ip
4. Library: libpq-10.dll
5. Hostname: Find this in the `.env` file supplied to you from another dev.
6. User: Find this in the `.env` file supplied to you from another dev.
7. Password: Find this in the `.env` file supplied to you from another dev.
8. Port: 5432
9. Database: postgres
10. Click open
11. Click the tab that says "Query" with the play button
12. Paste in your .sql query file
13. Click the play button in the bar at the top to run the query

# AWS S3
AWS S3 requires yet two more environmental variables.
`AWSKEYID`: This is the ID of the aws access key.
`AWSKEY`: This is the key of the corresponding ID.

Please see Slack Channel @private for the values.

# Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.

# Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.

The client configuration will also build the Sass files found at `/src/client/scss`.

# Development Workflow
```
git checkout dev
git checkout -b <utorid-feature_name>
```
 