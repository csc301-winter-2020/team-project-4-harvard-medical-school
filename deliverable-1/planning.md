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

Below are the diagrams of our proposed views for each interface of the application, as determined during our first partner meeting.

Imgur album: `https://imgur.com/a/Pxl9fiJ`

Or view on github:

[Administrator View](pics/administrator_app_design.jpg)

[Instructor View](pics/intructor_app_design.jpg)

[Student View](pics/student_app_design.jpg)

## 2. Who are your target users?
* Harvard medical students (all years)
    - **Name**: Nick Sanders
    - **Age**: 21
    - **User Environment**: Uses an iPad Pro to take notes and record patient diagnoses.
    - **Background**: Nick is a hardworking and curious 1st year Harvard Medical School student eager to apply his medical course knowledge to the field via patient diagnoses. While he is glad his instructors allow him to use his iPad during patient interviews, he is frustrated that he must submit his iPad notes to his instructor through a clunky and outdated student submission portal. Nick wishes there was a more streamlined note-taking and submission process.
    - **End Goal**: To be able to take and submit patient notes more conveniently without any other external applications.
* Medical Educators
    - **Name**: Dave Billinger
    - **Age**: 69
    - **User Environment**: Uses a desktop PC running Windows 10 to grade and view student submissions (of patient diagnoses). 
    - **Background**: Dave is a recently tenured professor of medical sciences at Harvard Medical School who is always looking to make his teaching process more streamlined. While he is happy to allow his students to take their notes with any device of their choosing, Dave is frustrated at the lack of a conveniently accessible and clearly organized repository through he which he can view his students' notes for grading. Dave wishes his students' submissions were easier to browse through, regardless of what device they were taken on.
    - **End Goal**: To enhance and improve instructor marking efficiency through enhanced organization and browsability of student note submissions.
* Medical Administrators/Researchers
    - **Name**: Samson Liang
    - **Age**: 30
    - **User Environment**: Uses a desktop PC running Windows 10 to compile and process the notes of medical students. 
    - **Background**: Samson is a post-grad medical researcher conducting research pertaining to pedagogical advancements in the medical sciences. Currently, he is frustrated with the limited amount of empirical data involving diagnosis decision-making during the patient interview process. Samson wishes there was a concrete way to gain insight on how medical students come to their final diagnoses as they take notes and interview patients.
    - **End Goal**: To gain concrete empirical data regarding how medical students make diagnoses decisions.
    
    To advance pedagogical medical sciences through researching trends in student diagnoses over several years of medical schooling.

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

We plan to test our application mainly through manual QA, Jest JavaScript Testing, and React Testing Library because these were the most recommended and oft-used testing libraries for the technologies we are using.

Our application will require an OCR solution to recognize user handwriting. We plan to use Google’s Cloud Vision API, as we have personally tested it as a team and deemed it accurate enough in handling our inputs. Amazon S3 Object Storage will be used for image storage.

Our application will also integrate with the Isabel Health Care API, which will give clients information about potential diagnoses, disease predictions, and suggestions to further patient interviews.

## 5. What are the user stories that make up the MVP?
1. As an educator, Lee would like to enter the final diagnoses for the patient on student diagnoses as a way of marking and providing feedback on student notes.
2. As a student, Tony would like to extend canvas on each page of the patient diagnoses template so that he does not run out of space for notes in a certain field.
3. As a student, Stephen would like to return to the main menu on any page in the patient template in order to save time.
4. As a medical student, Damian would like to organize his patient interview notes into patient profiles that clearly outline the characteristics of each patient in an easily accessible way so that he could efficiently access the required patient information.
5. As a medical student, Kyle would like to be able to choose between different templates for patient profiles layout to fit his personal organizational standards.
6. As a medical student, Anna would like to use different color schemes for the stylus in order to better visualise her notes.
7. As a medical student, Jamali would like to have intelligent forms so that she can focus on her patient without having to worry about contradictory inputs.
8. As a medical student, James would like to save his notes on his device and on the cloud so that he can have convenient access to them whenever he needs them.
9. As a medical student, Peter would like to have the notes he writes with a stylus be automatically parsed into English so that he could organize his notes into text documents.
10. As a researcher, Alexander would need to create class information in order to manage different offerings of classes.
11. As a researcher, Alexander would need to add students to classes in order to track students who enroll in different classes.
12. As a student, Kenneth would like to swipe left and right to view different pages to more easily switch between notes.
13. As a researcher, Timothy would like to log the note diffs (student note taking progress) at short regular intervals in order to track student progress over time, a valuable research metric.
14. As a student, Tahani would like to parse templates which show different fields for different studies in order to more easily organize different types of patient diagnoses.
15. As a researcher, Lilith would like to parse student notes and match it with the Isabel API in order to better identify trends in student note-taking abilities and provide a metric for their growth.
16. As an educator, Yiping would like to annotate and comment on student notes in order to provide more extensive feedback on the students’ work directly.
17. As a student, Charlie would like to be able to get hints and tips on the fly from the Harvard medical database in order to aid his diagnoses based on symptoms
18. As an educator, Robere wants to be able to restrict access to the helps and tips feature from certain students so that newer students can practice their diagnosis without any external assistance.
19. As an educator, Henry wants to have convenient access to students’ emails so that he could easily give feedback to his students.

 
# Process Details
## Q6: What are the roles & responsibilities on the team?
### Roles and Assignments
| Role Title                           | Description                                                                                                                                                                                                                                                                                                                                                   | Members Assigned                                    |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Database Architect                   | Responsible for designing the tables and their columns to store the persisting data in a meaningful and efficient way.                                                                                                                                                                                                                                        | Qingyuan Qie                                        |
| React Frontend Developer             | Responsible for creating the Components the clients will see and interact with on the front-end. Components must be styled to support an intuitive experience in both portrait and landscape modes.                                                                                                                                                           | Christopher Marcok, Chris Koehler, Lance Oribello   |
| Backend Developer                    | Responsible for API development, Handwriting OCR, Isabel API calls, interacting with public libraries/APIs, handling requests from the frontend, and management of the backend infrastructure for the web application. In particular, the backend developers must write maintainable and testable code built using Node.js & Express.js.                      | Sanggon Choi, Steven Kang, Robert Tan, Qingyuan Qie |
| UI/UX Design                         | Responsible for determining the graphical layout of the application; this encompasses the display layout, interface animation, view transitions, and other visual interactions. Also ensures the user's experience of the app feels like it proceeds in an intuitive and logical manner. This role will work in close partnership with front-end development. | Lance Oribello                                      |
| QA Tester/Software Developer in Test | Responsible for ensuring that the product is working as intended; tests possible user interactions with the feature in order to confirm the function and/or discover issues that must be resolved.                                                                                                                                                            | Steven Kang                                         |
| Product Manager                      | Responsible for facilitating the organization of the group, dealing with team logistics, feature specification, timeline management, and partner communication.                                                                                                                                                                                               | Lance Oribello                                      |

### Individual Strengths and Weaknesses

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

1. Team Meetings
    - When and where? Recurring or ad hoc? In-person or online?
        - Team-only meetings are generally organized ad hoc and as needed, and team members will actively check the Slack channel to communicate with each other on a consistent basis to set up such meetings
        - The location of such meetings will normally be at Bahen, which is easily accessible to everyone on the team
        - More minor discussions can be made over voice chat
    - What's the purpose of each meeting?
        - Future team meetings will be held to collectively discuss features or implementations that are better communicated vocally rather than through our Slack chat
        - Our first few team meetings were to finish Deliverable 1 as a group, splitting up on the various parts of the document, then going over our answers collectively
    - What did you discuss during the meetings?
        - What will be discussed for future team meetings is yet to be determined
        - For our first few team meetings, we split up the work on Deliverable 1 so we can work on it concurrently, then read over the entire Deliverable collectively as a group
    - What were the outcomes of each meeting?
        - The outcomes for future team meetings are yet to be determined
        - Ultimately, our first few meetings ended with finished Deliverable 1
2. Partner Meetings
    - When and where? Recurring or ad hoc? In-person or online?
        - We plan to meet with the partner least once a week in person, aiming for everyone to attend physically but those who cannot will connect remotely online
        - Meeting days will vary per each week based on project partner availability
    - What's the purpose of each meeting?
        - To update the project partner with our progress
        - Ask questions about any unclear instructions or major decisions which involve our partner
        - Discuss any roadblocks we have encountered, however we will try to resolve them as they come up rather than wait until the meeting to discuss them
    - You must have at least 2 meetings with your project partner (if you have one). Describe them here:
        - Please see the minutes of our two meetings linked below
    - What did you discuss during the meetings?
        - Specified the partner's expectations for this product
        - Clarified the specifications of the product's features
        - Outlined the various interfaces/views of the product
        - Discussed what tech stack/technologies that we plan to use
    - What were the outcomes of each meeting?
        - Confirmed that the partner was satisfied with our proposed technologies/communication methods
        - Established the procedures and expectations of future meetings
        - Determined a good starting area to begin actual development of the application
    - You must provide meeting minutes.
        - [Link to meeting minutes](https://docs.google.com/document/d/1tmxcsp7aGkf7UtewsgJIl2fs81tNbaZXUXOSjGiX2xI/edit?usp=sharing)

## Q8: What artifacts will you use to self-organize?
1. Trello

We are using Trello to maintain a checklist of tasks, which is updated continuously as we progress through the project.  Trello is further enhanced by the plug-in we are using that integrates Trello into Slack, which allows us to readily receive notifications whenever any change is made on the Trello board.

Tasks get assigned to team members depending on the roles that we have already assigned to each person: we will first figure out what skills are needed to complete the task, and hand it off to a teammate with the appropriate skills. However, if one person is getting too much work, then we distribute the work among the others depending on the nature of the work (basically the next suitable person).

We determine the status of work of completion by having 3 other members on the team check over the work. For example, the workflow for a task may go like this:

1. Someone creates a task on the Trello board
2. A member of the team (possibly the one who created the task) gets to work, and eventually the finishes writing putting in on the ‘ready for check’ section
3. Once another member has checked the work, they will mark down that the work is confirmed by them.
4. When 3 people have confirmed the task, then it is moved into the ‘completed’ section.

Below is a link to a screenshot of our current Trello board.
[Trello Screenshot](pics/trello.png)

We picked Trello because:

1. Many of our members are already familiar with Trello, and we also thought those inexperienced with it would have no trouble in learning it.
2. We don’t have to meet in person to discuss minute changes (it’s inconvenient to have to gather for meetings every time we have some progress on the project
3. Trello integrates well with Slack, which is our primary form of communication. This integration allows us to be informed on development updates in real time, as we are notified on any device that has Slack installed.
4.Trello allows for greater flexibility in planning out features, which is helpful as many members of our team have rigid schedules that make it hard to strictly set out when a feature should be implmented.
5. Trello allows us to easily see a general overview of the progress of development, as well as see which member of the team is working on a given feature without having to directly ask each other about what work we are doing.

## Q9: What are the rules regarding how your team works?
### Communications:
We will be communicating over the internet via Slack. We believe that Slack’s abilities to pin items, create private chats, facilitate calls and its integration with other apps (Trello) will be able to fulfill our communication needs. Should we need to break off into teams, it will be useful to utilize Slack’s multiple text channels to organize communications between individual teams. We will also use Slack’s multiple text channels to break off into a backend and frontend division to better organize our communication for specific features.

We will expect to communicate on a day-by-day basis to organize the team’s needs and objectives. Team members should check Slack on a daily basis to keep up to date about issues and current events. We do not expect to be using phone calls or SMS messaging to communicate amongst each other.

We will also be communicating to our partner through Slack. Additionally, we are scheduled for weekly partner meetings where we will share progress, and ask questions regarding the project.

### Meetings:
We will be meeting at least once a week with our partner, likely in Bahen. We expect that everyone should be able to attend these meetings, but we understand that among 7 team members (and 2 partners) it may not be feasible to have everyone in the same room at the same time. In this case, those who are not physically present should join in via voice call which can be done over Slack. We aim to have at least 5 team members present at any given meeting. 

We have no expectations for meeting amongst team members outside of partner meetings, as most development questions should be resolvable via Slack voice chat or Slack text chat. Should we feel that a large design decision should be made that would benefit a full team being physically present, we can schedule physical meetings as needed.

We do not believe that we will require a meeting moderator, but should we require one in the future, we have appointed Lance Oribello. We will conduct meetings by giving all team members the chance to bring up issues of importance and resolve each through group discussion and brainstorming. During this time we can begin discussion by reviewing what was done in the prior week. Afterwards we will discuss the next steps for development and how to achieve them. We will attempt to prioritize different tasks and create a roadmap for the coming week. Finally we will review what happened in the meeting to make sure everyone is on the same page. 

Should a team member consistently not make an effort to attend meetings or complete action items, then we will firstly confront them about their unacceptable behaviour, or ask if they need assistance with their tasks. If the issue persists, then we will have to discuss with a TA about what action needs to be taken.

### Conflict Resolution:
| Conflict                                                                                                                                                                                                                                            | Resolution                                                                                                                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Disagreement on implementation of features                                                                                                                                                                                                          | We will try to reach unanimous decisions when possible, otherwise we will default to a majority vote. On especially important features, we would have the the pros and cons of each argument be presented before of the team before calling the majority vote. If there is a split decision, we will ask our partner to break the tie.                                       |
| A team member is not responding to communications                                                                                                                                                                                                   | If a team member stops attending lectures and does not respond to communications via Slack then we will discuss further action with a TA. Otherwise we should just remind the unresponsive team member during lecture/tutorial about the issue. |
| A team member acts too abrasively or unprofessionally in group environments. This could include name-calling, talking over others, refusing to consider the perspective others, or immediately shutting down suggestions. | We will approach the team member as a group and directly point out his unruly behaviour. We will remind him that we take this work seriously, and expect him to be collaborative and professional in his conduct. If his behaviour continues, we will resort to contacting the TA.                                                                                                        |

# Highlights
### Express > Django
We decided to use Express over Django based on our team’s familiarity and confidence with Express. We believe that with such a large project, we would like to spend as little time as possible setting up our project so that we would have as much time as possible developing. 
### Typescript > Javascript
We decided to use Typescript instead of Javascript to increase code readability and clarity due to its superior linter and ability to catch issues during transpilation. Using Typescript should also allow users unfamiliar with code another team member wrote to get a quick understanding of how to use their code, by being able to view meaningful function headers and return types.
### Google Handwriting API
We need to use a third party service to help us parse student handwriting. We decided to use Google’s Handwriting Api due to the brand’s reliability, the API’s intuitive design and because we have free Google Service credits. Other solutions we considered were Tesseract.js, which we found unsuitable as it expected typed text rather than handwriting. We also considered ocrad.js but discovered during the demo that it failed to recognize basic handwriting inputs.
### Slack > Discord
We decided to use Slack instead of discord as our main pipeline of communication due to its increased connotation of professionalism. Many of us use discord for recreational activities, so we thought Slack would be more appropriate to induce a working environment.  
### Trello > Github Projects
After trying both Trello and Github Projects, we decided to choose Trello as it seemed more intuitive and supported a wide variety of plugins to enhance and customize our experience. While Github Projects does have native Github integration, our team was unfamiliar with it and did not feel that there was substantial value in learning the new platform. 
### React > Angular
We decided to use React due to the fact that it is quick to pick up for people who already know Javascript and many of our group members were already familiar with the framework. By choosing a framework we are comfortable with, we will be able to spend more time implementing features for the MVP.
