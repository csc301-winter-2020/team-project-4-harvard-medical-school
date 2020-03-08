# Scribe/Team 53

## Description 

Scribe is a web application that allows medical students to draft their notes as they interview and diagnose patients in clinical settings; these notes will be actively processed and searched against a list of medical symptoms and key terms every given time interval.

Scribe has three main interfaces for each kind of our target users: medical students, medical educators, and medical school administrators.

The student-facing side of the application is where students draft their notes, with notes being created within patient profiles that are created and saved for each patient that the student interviews. Within each patient profile are various pages with text fields and/or stylus canvasses where students input information about their patients. 

The educator-facing side of the application allows educators to view the patient profiles of their students, as well as enter the correct diagnosis for a given patient’s recorded symptoms.

The administrator-facing side of the application is able to access the generated list of medical terms and predicted diseases derived from parsing a student’s notes.

The problem our application aims to solve deals with the inefficiency of how medical students currently draft their notes: they either must write their notes on paper or on their own individual text editors while interviewing patients, and would later need to transcribe their notes into a separate web form for submission.

Our application saves time by speeding up this process, as students can take notes directly within the application (accepting both typed and stylus inputs), providing a standardized way of organizing a student’s notes in one place, as well as providing a convenient method for submission. This also makes it easier for educators to view and provide input on their student’s submissions.

Scribe also helps researchers gain better understanding in how medical students learn and approach diagnosis decisions. As of now, not much research has been done on how students approach diagnosis decisions; with our application, we can gain empirical data that helps indicate how students organically come to final patient diagnoses.

From this information, we can curate and collect statistics about how medical students approach clinical problems in the context of the broader medical curriculum, as well as gain a better understanding of how their understanding of clinical concepts evolves throughout their medical education.

## Key Features

* **Login and registration of student users**
    - Users can register for an account within our application, inputting a username and a password.
    - Created users are able to login and access the rest of our website.
    - Without logging in, attempting to access any other page of our website other than the login/registration page is forbidden.
    - Note that at the current iteration of our project, we only support the student-facing side of the application. As such, all users are currently assumed to be medical students. 

* **Custom configuration of a student’s user profile and settings**
    - Users can access a settings page where they can change their name and profile picture, as well as set the following preferences for their account:
        - Set the Default Input Mode to Writing, Typing, or Both.
            - This setting determines the default input fields that are presented to the user when he/she is taking notes within a patient's profile. *Writing* presents canvas input boxes and *Typing* presents text input boxes.
        - Set whether the navigation sidebar within patient profiles is shown by default.
            - The navigation sidebar displays a list of every page of the patient profile; clicking on an element within this list brings you to the corresponding page.

* ???? Creation and deletion of patient profiles ?????

* **Polished views and (mostly) completed functionality for 8/10 pages of a patient profile**
    - Every patient profile consists of 10 distinct pages, each with their own set of different form input fields.
    - Each form input field generally consists of a canvas input box and a text input box, each of which can be optionally hidden by toggle buttons.
        - Recall that the default display of these form input fields can be changed within the user settings page.
    - A page may also have radio button input fields. Certain input configurations to these radio buttons may prompt previously hidden form input fields to appear, or cause other radio buttons to grey out.
        - For example, selecting Female within the Demographics page reveals a form input field asking if the patient is pregnant. This form input field is hidden when Male is selected instead.
    - The form input fields for most of the pages are quite similar, except for the Physical Examination and Lab Results pages, which require their own specialized methods of input.
        - As such, these two pages are still incomplete at the moment.
    - Information entered into all text form inputs and radio button inputs is persistent, in that it is saved in our database and accessible at later times.
        - At the moment, canvas form inputs cannot be saved or accessed from our database.
    
* **Functional canvas input fields on the client-side**
    - Canvas input fields allow for users to handwrite their notes directly in our application
    - Functionalities include an eraser tool, the ability to change pen color, and the option to erase an entire canvas at once.
    - Canvases are also expandable in size, should a user run out of room.
    - Note that because canvas form inputs currently cannot be saved or accessed from our database, navigating away from the page or reloading the page resets all canvasses.

* The creation and editing of patient profile templates (but not applying them to patient profiles)

## Instructions

1. **Login/Registration Page**

 - __site URL__ brings you to our website's login page. You may enter the credentials for the following pre-created user:
     - Username: will, Password: will
 
 - Alternatively, you may register for your own user account by clicking the register button and inputting a username and password.

 - As mentioned in Key Features, we only support the student-facing side of the application, so all users are assumed to be medical students.
 
2. **User Settings Page**

 - Logging in successfully brings you to a page displaying a list of all of your patients, but we shall explore that page later on.

 - For now, click the three horizontal lines icon at the top right of the screen. This menu icon appears on every page on the website other than the login screen.

 - Clicking it pops up a small display menu showing your name, your year of study, a button that leads you to your User  Settings page, and a logout button.

 - Click the Settings button. This brings you to your user profile settings page. 

 - Here you can change your Default Input Mode and determine whether you want to show the navigation sidebar by default, as outlined in the Key Features section.

 - Clicking the pencil icon at the bottom right of the screen allows you to edit your name and your profile picture. Note that at the moment you cannot change your year of study or your hospital. We will implement this by the next deliverable.

 - If you decide to change your name or profile picture, click the checkmark icon at the bottom right of the screen to confirm your changes.

 - Now let us return to our patients list page. Click the Scribe logo at the top right of the screen. This logo is also present on every page of the website, and clicking it will always bring you to the patient list page.

 
2. Patient List Page

    - This page displays a list of all of a student's patients. You may search through your patients with the search bar at the top of the screen. Note that the search bar only searches for patient names.

    - You may reorder the patients list by clicking the column headings at the top of the list.

    - Clicking the red 'i' at the right side of each row of the patient list reveals the patient's key demographics, as well as the options to export the patient profile to PDF and delete the patient profile entirely.
        - Note that the export to PDF button is not functional at the moment, but patient profile deletion is.
        
    - Clicking
    
    
    







 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 ## Licenses 

We applied an MIT license to our codebase. 

This license is a permissive software license in that it allows other programmers to commercially and privately use, modify, distribute, and sublicense our codebase on the stipulation that the original copyright and permission notice of the license are also included. We are not held liable for anything that other programmers do with our code.

Our partners asked us specifically to use this license, as they are familiar with it, and it allows the sharing of our codebase without forcing other programmers to expose their own closed-source code (namely the developers of the Isabel API, whom our partners have a working relationship with and plan to present our application to upon its completion).
