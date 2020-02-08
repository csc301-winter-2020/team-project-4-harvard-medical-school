# Scribe/Team 53

# Product Details

## 1. What are you planning to build?

Our product will be a web application that allows medical students to draft their notes as they interview and diagnose patients in clinical settings; these notes will be actively processed and searched against a list of medical symptoms and key terms every given time interval.

As of now, not much research has been done on how students approach diagnosis decision making, and there isn't any concrete empirical data that helps indicate how students come to a final patient diagnosis.

With the information that our app provides, we can curate and collect statistics about how medical students approach clinical problems in the context of the broader medical curriculum, as well as gain a better understanding of how a their understanding of clinical concepts evolves throughout their medical education.

Additionally, the current method of how medical students organize and submit their notes for academic purposes is unstandardized and needlessly inconvenient; our product aims to speed this process up to make note-taking and submission easier.

The web application has three main interfaces for each kind of our target users: medical students, medical school administrators, and medical educators.

The student-facing side of the application will allow students to draft their notes as they interview patients in hospitals and various clinical settings. These notes are created within patient profiles, which each student is able to create and save for each individual patient. 

Within each patient profile are various pages corresponding to the patient’s biological characteristics. Examples of such pages include demographics, past medical history, physical examination, laboratory results, etc.

Each page of a patient profile is essentially a blank canvas, where students can write their notes via stylus or type information as they interview a patient. Depending on the pages, there may be specific fields that the student must fill out for that page - ex. on the demographics page, the student must specify the patient’s age, gender, and country of residence.

The educator-facing side of the application will allow educators to review patient profiles created by their specific students. Educators will be able to enter a correct diagnosis for a given patient profile (hidden from the student, but can be revealed later). 

The administrator-facing side of the application is able to access the generated list of medical terms and predicted diseases, derived from parsed student notes every given time-interval.

Enclosed within the repository are diagrams of our proposed view for each interface of the application, as determined during our first partner meeting.

## 2. Who are your target users?
* Harvard medical students (all years)
    - **Name**: Nick Sanders
    - **Age**: 21
    - **Background**: A hardworking and curious 2nd year Harvard Medical School student eager to apply his course knowledge to the field via patient diagnoses.
    - **User Environment**: Uses an iPad Pro to take notes and record patient diagnoses.
    - **End Goal**: To be able to take patient diagnoses notes in a more convenient, readable, and elegant way.
* Medical Educators
    - **Name**: Dave Billinger
    - **Age**: 69
    - **Background**: A recently tenured professor of medical sciences at Harvard Medical School. Dave is always looking for ways to make his teaching experience more streamlined.
    - **User Environment**: Uses a desktop PC running Windows 10 to grade and view student submissions (of patient diagnoses). 
    - **End Goal**: To enhance and improve instructor marking efficiency and student convenience for medical student fieldwork submissions.
* Medical Administrators/Researchers
    - **Name**: Samson Liang
    - **Age**: 30
    - **Background**: A post-grad medical researcher currently conducting research pertaining to pedagogical advancements in the medical sciences.
    - **User Environment**: Uses a desktop PC running Windows 10 to compile and process medical students’ notes. 
    - **End Goal**: To advance pedagogical medical sciences through researching trends in student diagnoses over several years of medical schooling.

## 3. Why would users choose your product? What are they using today to solve their problem/need

Currently, medical students take notes on paper or on their own individual text editors while interviewing patients, and would later need to transcribe their notes into a separate web form for submission. 

Our application saves time by speeding up this process, as students can take notes directly within our application (accepting both typed and hand-written stylus inputs), providing a standardized way of organizing all of a student’s notes in one place, as well as providing a convenient method for submission. 

This also makes it easier for educators to view and provide input on their student’s submissions in the very same application, being able to input the correct diagnoses for each of the students’ patient profile notes.

Administrators using the application are also able to view the list of medical terms and diagnoses generated from a student’s notes every given time interval, providing insight on how students organically came to their conclusive prescription to the patient over time. 

By understanding how students approach diagnosis decision making, we can learn to prevent medical errors, as well as better guide students in their medical education. 

## 4. How will you build it?
Our plan is to deploy an Express + React Node.js application on Heroku. We have decided to use TypeScript to maintain our Express and React files to maintain code quality and make it easier for team members to pick up any technology that they are unfamiliar with (via VSCode’s intellisense and autocomplete). 

The majority of our team is already well acquainted with Express, React, Node.js, TypeScript, and Heroku, having used such technologies to develop web applications in previous courses (mainly CSC309).

We have decided to host our application's database on AWS, as our designated database architect has extensive experience with this technology. Our partner has notified us that he is willing to pay the costs of maintaining our AWS database while the product is under development. 

Our application will require an OCR solution to recognize user handwriting. We plan to use Google’s Cloud Vision API, as we have personally tested it as a team and deemed it accurate enough in handling our inputs. Amazon S3 Object Storage will be used for image storage.

Our application will also integrate with the Isabel Health Care API, which will give clients information about potential diagnoses, disease predictions, and suggestions to further patient interviews.

## 5. What are the user stories that make up the MVP?
2. As a medical science educator, Dave would like a Chrome compatible web application to view and manage student patient diagnoses  in order to streamline the teaching process.
3. As a medical researcher, Samson would like a way to collect student diagnoses notes to be used for research purposes in order to advance pedagogy in the medical sciences.
4. As a medical student, Damian would like to organize his patient interview notes into patient profiles that clearly outline the characteristics of each patient in an easily accessible way. 
5. As a medical student, Kyle would like to customize the default patient profile layout to fit his personal organizational standards. 
6. As a medical student, Anna would like to use different color schemes to better visualise her notes. 
7. As a medical student, Jamali would like to have intelligent forms to learn how different chemicals interact with each other.
8. As a medical student, James would like to save his notes on his device and on the cloud so that he can access them anywhere.
9. As a medical student, Peter would like to have the notes he writes with a stylus be automatically parsed into English so that he could organize his notes into text documents.
10. As a researcher, Alexander would need to create class information in order to manage different offerings of classes.
11. As a researcher, Alexander would need to add students to classes in order to track students who enroll in different classes.
12. As a student, Kenneth would like to swipe left and right to view different pages to more easily switch between notes.
13. As a researcher, Timothy would like to log the note diffs (student note taking progress) at short regular intervals in order to track student progress over time, a valuable research metric.
14. As a student, Tahani would like to parse templates which show different fields for different studies in order to more easily organize different types of patient diagnoses.
15. As a researcher, Lilith would like to parse student notes and match it with the Isabel API in order to better identify trends in student note-taking abilities and provide a metric for their growth.
16. As an educator, Yiping would like to annotate and comment on student notes in order to provide more extensive feedback on the students’ work directly.
17. As a student, Charlie would like to be able to get hints and tips on the fly from the Harvard medical database in order to aid his diagnoses based on symptoms
18. As an educator, I want to be able to lock helps and tips to certain students so newer students can practice their diagnosis, but allow aid upper year students who already have the abilities by allowing them to get help.
19. As an educator, I want to email the student if I need to contact them about their work if I have any questions or need to get in touch with them.
20. As an educator, Lee would like to enter the final diagnoses for the patient on student diagnoses as a way of marking and providing feedback on student notes.
21. As a student, Tony would like to extend canvas on each page of the patient diagnoses template in case he runs out space for notes in a certain field.
22. As a student, Stephen would like to return to the main menu on any page in the patient template in order to save time.
 
# Process Details
## Q6: What are the roles & responsibilities on the team?
| Role Title                           | Description                                                                                                                                                                                                                                                                                                                                                   | Members Assigned                                    |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Database Architect                   | Responsible for designing the tables and their columns to store the persisting data in a meaningful and efficient way.                                                                                                                                                                                                                                        | Qingyuan Qie                                        |
| React Frontend Developer             | Responsible for creating the Components the clients will see and interact with on the front-end. Components must be styled to support an intuitive experience in both portrait and landscape modes.                                                                                                                                                           | Christopher Marcok, Chris Koehler, Lance Oribello   |
| Backend Developer                    | Responsible for API development, Handwriting OCR, Isabel API calls, interacting with public libraries/APIs, handling requests from the frontend, and management of the backend infrastructure for the web application. In particular, the backend developers must write maintainable and testable code built using Node.js & Express.js.                      | Sanggon Choi, Steven Kang, Robert Tan, Qingyuan Qie |
| UI/UX Design                         | Responsible for determining the graphical layout of the application; this encompasses the display layout, interface animation, view transitions, and other visual interactions. Also ensures the user's experience of the app feels like it proceeds in an intuitive and logical manner. This role will work in close partnership with front-end development. | Lance Oribello                                      |
| QA Tester/Software Developer in Test | Responsible for ensuring that the product is working as intended; tests possible user interactions with the feature in order to confirm the function and/or discover issues that must be resolved.                                                                                                                                                            | Steven Kang                                         |
| Product Manager                      | Responsible for facilitating the organization of the group, dealing with team logistics, feature specification, timeline management, and partner communication.                                                                                                                                                                                               | Lance Oribello                                      |
| Full Stack Developer                 | All group members will take on full stack development as needed.                                                                                                                                                                                                                                                                                              | Lance Oribello                                      |

| Name               | Description                                                 | Strengths                                              | Weaknesses                                      |
|--------------------|-------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------|
| Sanggon Choi       | Backend developer; mostly database and API development      | SQL databases, JavaScript, Project management          | UI/UX design, React, macOS development          |
| Robert Tan         | Backend developer (APIs)                                    | Object Oriented Programming, Documentation, Javascript | Algorithms, React, DevOPs                       |
| Qingyuan Qie       | Backend developer                                           | JavaScript, Linux, SQL databases                       | UI design, React, project management            |
| Chris Koehler      | Full stack developer (primarily frontend)                   | C++, Java, Databases                                   | UI, CSS, Authentication                         |
| Lance Oribello     | Frontend developer, UI/UX design                            | JavaScript, React, Product management                  | Databases, Express, System design               |
| Christopher Marcok | Full stack developer with emphasis on front-end development | NoSQL, Frontend design, Express                        | Algorithms, System design, Mobile development   |
| Steven Kang        | Full stack developer (primarily backend)                    | Scripting, Express, SQL                                | Web interfaces, Deployment, Agile methodologies |


## Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have.
* When and where? Recurring or ad hoc? In-person or online?
    - At least once a week on Slack and/or in person, aiming for everyone to attend in person but people who cannot be there in person will connect remotely online
    - Meeting days will vary per each week based on project partner availability, but each week will have one or more meetings
    - Any other events are ad hoc and as needed, and students actively check the Slack channel to communicate with each other on a consistent basis
    - Code reviews are done online, preferably in 24 hours of each pull request
* What's the purpose of each meeting?
    - To share the weekly status updates among each other (students) and make sure everything is progressing correctly
    - Any issues that arise can be discussed at length here, however we will try to resolve any potential roadblocks as they come up rather than wait until the meeting to discuss them
    - To update the project partner with our progress
* You must have at least 2 meetings with your project partner (if you have one). Describe them here:
    - Please see the minutes of our meeting below. We only were able to schedule one meeting with our partner.
* What did you discuss during the meetings?
    - The goal of this product and what its future is
    - Various constraints on the project (ex: that it is an MVP)
    - What the UI was to look like and the flow of various views that the project partner wanted
    - The functionality of all the components at a high level
    - How we will be using the APIs they provide us
* What were the outcomes of each meeting?
    - To make sure everyone is on the same page and that everyone has the high level view of the product to be created
    - Discuss with the project partner about our design choices and project tech stack choice
    - Confirmation with the project partner that they are on board with the direction it is being taken with respect to all of the above
* You must provide meeting minutes.

**Note:** these minutes are a condensed version of what was recorded during the meeting
##### 5:00 - 5:15pm: Partner went over a general overview of the project
* Specified that it is a proof of concept
* A “glorified web form”
* Wants a measure of how effective medical students are
* Wants a history of revisions and changes
* Stores the ‘delta’ for every patient’s notes over time
* What symptoms they narrow down to first
* A web application gives more empirical data on how students learn
##### 5:15 - 5:25pm: Partner went into technical requirements
* Overview of the Isabel API
* A “glorified webmd” used by legitimate doctors
* Takes in symptoms and keywords, outputs disease differentials
* We will receive specific instructions on how to use Isabel
* Important to find a good handwriting processing library
##### 5:30 - 5:55pm: Partner went into feature specifications
* In going through the specifications, we illustrated diagrams to help visualize the views the partner requested
* We only need to hardcode the userbase
* Instructor’s should be able to search through the student database
* Look at a student’s profile, emphasized a ‘read-only’ look at their notes
* Instructor can enter a final diagnosis for the patient - note, we do not have to connect this diagnosis with any other infrastructure (ex. school grading portal)
* Students can add new patients/templates, as well as export their notes locally
* Partner presented the various different pages students have access to and the different forms of each page
* Expanded on having a ‘Helps and Tips’ allowing students to query Isabel
* Partner outline 3 major undertakings: providing the “glorified form” aspect of the application, having good handwriting processing, and using Isabel properly
##### 5:55 - 6:00pm
* Minor clarifications
* Established slack communication
* Confirmed next meeting to be next week Friday (after the deliverable deadline unfortunately)
* Established a weekly meeting time of Fridays at 6:00pm

## Q8: What artifacts will you use to self-organize?
1. Trello
2. Slack

We are using Trello to maintain a checklist of tasks, which is updated continuously as we progress through the project. This is further enhanced by the plug-in we are using which integrates Trello into Slack, which allows us to readily receive notifications whenever any change is made on the Trello board.

Tasks get assigned to team members depending on the roles that we have already assigned to each person: we will first figure out what skills are needed to complete the task, and hand it off to a teammate with the appropriate skills. However, if one person is getting too much work, then we distribute the work among the others depending on the nature of the work (basically the next suitable person).

We determine the status of work of completion by having 3 other members on the team check over the work. For example, the workflow for a task may go like this:

1. Someone creates a task on the Trello board
2. A member of the team (possibly the one who created the task) gets to work, and eventually the finishes writing putting in on the ‘ready for check’ section
3. Once another member has checked the work, they will mark down that the work is confirmed by them.
4. When 3 people have confirmed the task, then it is moved into the ‘completed’ section.

We picked Trello because:

1. Many of our members were familiar with it, and we thought it was easy to learn how to use it, for those who did not have previous experiences with it
2. We don’t have to meet in person (it’s inconvenient to have to gather for meetings every time we have some progress on the project
3. It integrates well with Slack, which is our primary form of communication.

## Q9: What are the rules regarding how your team works?
### Communications:
We will be communicating over the internet via Slack. We believe that Slack’s abilities to pin items, create private chats, facilitate calls and its integration with other apps (Trello) will be able to fulfill our communication needs. Should we need to break off into teams, it will be useful to utilize Slack’s multiple text channels to organize communications between individual teams.

We will expect to communicate on a day-by-day basis to organize the team’s needs and objectives. Team members should check Slack on a daily basis to keep up to date about issues and current events. We do not expect to be using phone calls or SMS messaging to communicate amongst each other.

We will also be communicating to our partner through Slack. Additionally, we are scheduled for weekly partner meetings where we will share progress, and ask questions regarding the project.

### Meetings:
We will be meeting at least once a week with our partner, likely in Bahen. We expect that everyone should be able to attend these meetings, but we understand that among 7 team members (and 2 partners) it may not be feasible to have everyone in the same room at the same time. In this case, those who are not physically present should join in via voice call which can be done over Slack. We aim to have at least 5 team members present at any given meeting. 

We have no expectations for meeting amongst team members outside of partner meetings, as most development questions should be resolvable via Slack voice chat or Slack text chat. Should we feel that a large design decision should be made that would benefit a full team being physically present, we can schedule physical meetings as needed.

We do not believe that we will require a meeting moderator, but should we require one in the future, we have appointed David Choi. We will conduct meetings by giving all team members the chance to bring up issues of importance and resolve each through group discussion and brainstorming. During this time we can begin discussion by reviewing what was done in the prior week. Afterwards we will discuss the next steps for development and how to achieve them. We will attempt to prioritize different tasks and create a roadmap for the coming week. Finally we will review what happened in the meeting to make sure everyone is on the same page. 

Should a team member consistently not make an effort to attend meetings or complete action items, then we will firstly confront them about their unacceptable behaviour, or ask if they need assistance with their tasks. If the issue persists, then we will have to discuss with a TA about what action needs to be taken.

### Conflict Resolution:
1. Disagreement on implementation of features
We will try to reach unanimous decisions when possible, otherwise we will default to a majority vote on decisions. 
2. A team member is not responding to communications
If a team member stops attending lecture and does not respond to communications via Slack then we will discuss further actions with a TA. Otherwise we should just remind the unresponsive team member during lecture/tutorial about the issue.
3. A team member attempts to take control of the group and make decisions for everyone.
Sometimes this situation can occur without the team member realizing it. The team as a collective should remind them that we are working democratically and that each team member’s opinion should be weighted equally.

# Highlights
### Express > Django
We decided to use Express over Django based on our team’s familiarity and confidence with Express. We believe that with such a large project, we would like to spend as little time as possible setting up our project so that we would have as much time as possible developing. 
### Typescript > Javascript
We decided to use Typescript instead of Javascript to increase code readability and clarity due to its superior linter and ability to catch issues during transpilation. Using Typescript should also allow users unfamiliar with code another team member wrote to get a quick understanding of how to use their code, by being able to view meaningful function headers and return types.
### Google Handwriting Api
We need to use a third party service to help us parse student handwriting. We decided to use Google’s Handwriting Api due to the brand’s reliability, the API’s intuitive design and because we have free Google Service credits. Other solutions we considered were Tesseract.js, which we found unsuitable as it expected typed text rather than handwriting. We also considered ocrad.js but discovered during the demo that it failed to recognize basic handwriting inputs.
### Slack > Discord
We decided to use Slack instead of discord as our main pipeline of communication due to its increased connotation of professionalism. Many of us use discord for recreational activities, so we thought Slack would be more appropriate to induce a working environment. 
### Kanban > Scrum
We chose Kanban over Scrum because of inexperience with planning how long it might take to complete a feature. Kanban should give us more freedom when it comes to completing features which could all take a variable amount of time. 
### Trello > Github Projects
After trying both Trello and Github Projects, we decided to choose Trello as it seemed more intuitive and supported a wide variety of plugins to enhance and customize our experience. While Github Projects does have native Github integration, our team was unfamiliar with it and did not feel that there was substantial value in learning the new platform.
### React > Angular
We decided to use React due to the fact that it is quick to pick up for people who already know Javascript and many of our group members were already familiar with the framework. By choosing a framework we are comfortable with, we will be able to spend more time implementing features for the MVP.

## Pictures
Imgur album: `https://imgur.com/a/Pxl9fiJ`

Or view on github:

[Administrator View](pics/administrator_app_design.jpg)

[Instructor View](pics/intructor_app_design.jpg)

[Student View](pics/student_app_design.jpg)

