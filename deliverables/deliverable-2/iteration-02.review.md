# Scribe / Team 53

## Iteration 02 - Review & Retrospect

 * When: March 6, 2020
 * Where: Lance Oribello’s apartment

## Process - Reflection

We will analyze the success/lack of success of our decisions using the “5 Whys” assessment framework. With this framework, we can directly determine the root causes of our success/lack thereof for each decision.

#### Q1. Decisions that turned out well


1. **Using Slack as our main method of communication**

We decided to create a Slack server to communicate with ourselves as well as our partner. 

Within our Slack server, we have multiple text channels, including a general communication channel (mainly used for scheduling our weekly partner meetings and asking questions to our partners), a private team channel (for team discussion regarding the project that our partner does not need to see), and frontend and backend channels (where discussion pertaining to each respective aspect of the project is held).

We think our decision to use Slack as our main method of communication has been very successful.
*  *Why?* 
    - Internal communication between team members as well as communication with our partners has been very responsive.
* *Why?*
    - Slack is convenient for everyone to use and is easily-accessible.
*  *Why?* 
    - Slack notifies us of new messages across all of our devices in real-time, allowing for people to immediately answer questions, acknowledge any updates on development, and schedule times to meet as a team.
    - As such, we are always on the same page on how the project is going, and any ambiguities can be addressed very quickly.

2. **Weekly scheduled in-person meetings with our partners**

We decided to schedule (through Slack) an in-person meeting with our partners every week, during which we can update them on our progress, ask questions on anything we are unsure of, and discuss any roadblocks that we have encountered.

We think our decision to have weekly in-person meetings has been very successful.
*  *Why?* 
    - Scheduled weekly meetings allow for more consistent progress on the project.
*  *Why?* 
    - The team is motivated to work on the project more regularly.
*  *Why?* 
    - There is an expectation for new features to be presented to our partners at each meeting.
*  *Why?* 
    - We want our partners to be satisfied with our rate of progress, and we also want the chance to regularly receive direct feedback on features as we implement them.
    - As such, we can confidently design our application with our partner regularly being in the loop on our progress.
    
3. **Enforcing a defined git branch naming scheme**

We decided to have every git branch of our project be named in the follow format: 
```
<utorid-feature_name>
```
We think our decision to name our git branches in this way has been successful.
*  *Why?* 
    - It helps us organize how every team member contributes to the project.
*  *Why?* 
    - It allows us to specify exactly what feature(s) each person is working on at a given moment, which facilitates our workflow.
*  *Why?* 
    - Viewing all of our project's branches provides a concise general overview of our progress on the project, which gives better direction of how one can contribute.
*  *Why?* 
    - One can easily determine how to contribute to a given feature either by involving themself with the person maintaining the feature's branch, or by starting a new branch on their own (with the confidence that it will not conflict with the implementation of other features on different branches).
    
#### Q2. Decisions that did not turn out as well as we hoped

1. **Ad hoc team meetings**

We think our decision to have ad hoc in-person team meetings (without our partners) without any prior planning of what we would do during the meetings was unsuccessful.
*  *Why?* 
    - Team members were often unfocused or non-participatory during these meetings, with only a couple of people working on the project and other team members watching or being unengaged.
*  *Why?* 
    - It was usually unclear what everyone was supposed to be doing.
*  *Why?* 
    - Meetings were generally organized without a clear direction or set goals of what we hoped to accomplish during a meeting.
*  *Why?* 
    - We thought we could set goals for ourselves more effectively and efficiently as a group without any prior preparation.
*  *Why?* 
    - Most of us were unfamiliar with working with such a large group before and were not used to having so many disparate voices, so we thought it would be easy to corral ourselves to  work productively together without any pre-planning.
    - As such, group discussions were generally unfruitful.

2. **Our usage of Trello**

Trello allows users to maintain a continuously updated checklist of tasks that our team would update as we progressed through the project.

We thought Trello allowed for a lot of flexibility in planning out features, as well as provided a convenient interface to track the progress of development.  Additionally, every task created in Trello could be labelled with the team member(s) working on it, allowing other members of the team to see exactly what feature each team member is working on. 

We agreed that we would add tasks to the Trell for every substantial part of a feature at a low-level.

We think our decision to use Trello in this manner was unsuccessful.
*  *Why?* 
    - Team members stopped checking and updating the Trello regularly.
*  *Why?* 
    - Team members found Trello to be too inconvenient and out of the way.
*  *Why?* 
    - It was easier to assign a task to yourself without updating the Trello, and sending a message on Slack about what feature or functionality you planned to work on.
*  *Why?* 
    - Creating new tasks on Trello seemed unnecessary when everyone could be updated on what others are working on by simply checking Slack, viewing what the git branches of our project, or asking someone directly to ensure you wouldn’t be working on the same feature.
    - As such, Trello seemed to become more of an unnecessary hassle than a convenient organization artifact.

#### Q3. Planned changes

1. **Being more prepared for team meetings**

We intend to collectively be more prepared for team meetings, such that we have clearer direction and set goals of what we plan to do during these meetings. As illustrated in the previous section, past team meetings would generally have a lot of wasted time and unengagement, with many team members not having a clear idea of what they are supposed to be doing. 

Prior to future team meetings, we intend to determine a list of goals or talking points that should be completed or discussed during the meeting. Such a list does not need to be incredibly detailed or rigidly adhered to; we just need a good starting point from which we can productively work on the project together.

For example, a meeting can be solely focused on how we intend to integrate the Isabel API which we were given access to by our partners. Potential goals we could have during the meeting could be determining which members would be involved in implementing the features involved in integration, collectively testing out the given Isabel interface provided to us, determining how we intend to format our API calls, and sketching out a loose design of how we intend to visually display the information we send or receive from Isabel. 

2. **Having a more high-level Trello board**

We stopped using Trello as we deemed it inconvenient to maintain for every feature/functionality we worked on during the development of our project, but we still see its merit in tracking high-level progress and pre-planning future developments.

We intend to be more high-level in creating our tasks, so that our usage of Trello would be less frequent and less meticulous. Rather than granular low-level tasks like "Set up POST requests for patient profile pages upon save button press", we would have tasks more akin to "Connect patient profile frontend to backend".

The more specific low-level breakdowns of such high-level tasks would be specified on the Slack channel whenever the implementation of a new feature/functionality is begun, and by the names of git branches.

This way, we can still use Trello to assist us in organizing our general progress without being bogged down by having to constantly update and maintain it.

## Product - Review

#### Q4. How was your product demo?

In preparation for our product demo, the team met together the night before the day we were to present to our partners. At that point we had already finished developing most of the functionalities of the features that we wanted to complete for Deliverable 2.

During this meeting we collectively went over all of our implemented views as a team to ensure the UX and UI design fits all of our standards, as well as made minor changes to make the application more presentable and visually pleasing. 

We also prepared a loose outline of the order in which we were going to present the views of our application to our partners.

On the day of the demo, we successfully presented what we had planned to present the night before. Christopher Marcok did the majority of the talking, as we used his laptop to show our application to our partners, and he was comfortable with speaking about our progress. As he navigated through the application, he would describe the functionality of each feature that was implemented on the page he was on.

Our partners accepted all of our features and were pleased with our current progress. There were no change requests.

From a product perspective, we learned that close communication and transparency with our partners helped significantly in designing an application that they would be satisfied with. 

During the development of our application, team members often posed questions to our partners through Slack and during our weekly meetings regarding any ambiguities or design decisions that they were unsure of. Our partners were very responsive and cummunicative in answering our questions.

Thanks to this, we were able to receive frequent and detailed feedback on our progress, so by the time of the demo, we already knew that the design of our application would be agreeable to our partners.
