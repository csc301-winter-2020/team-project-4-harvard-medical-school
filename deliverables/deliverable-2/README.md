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

* Updating the text information of a patient profile and saving it in our database

* Polished views for every page in the patient profile

* Functional canvas inputs (but no saving or accessing them from the database)

* The creation and editing of patient profile templates (but not actually using them)

## Instructions

1. **Login/Registration page**

 - __site URL__ brings you to our website's login page. You may enter the credentials for the following pre-created user:
     - Username: user, Password: user
 
 - Alternatively, you may register for your own user profile by clicking the register button and inputting the prompted fields.

 - As mentioned in Key Features, we only support the student-facing side of the application, so all users are to be medical students.
 
2. **User Settings Page**

 - Logging in successfully brings you to a list of all of your patients, but we shall explore that page later on.

 - For now, click the three horizontal lines icon at the top right of the screen. This icon appears on every page on the website other than the login screen.

 - Clicking it pops up a small display showing your name, your year of study, a button that leads you to your User  Settings page, and a logout button.

 - Click the Settings button. This brings you to your user profile settings page. 

 - Here you can change your Default Input Mode and determien whether you want to show the navigation sidebar by default, as illustrated in the Key Features section.

 - Clicking the pencil icon at the bottom right of the screen allows you to edit your name and your profile picture. Note that at the moment you cannot change your year of study or your hospital. We will implement this by the next deliverable.

 - If you decide to change your name or profile picture, click the checkmark icon at the bottom right of the screen to confirm your changes.

 - Now let us return to our patients list page. Click the Scribe logo at the top right of the screen. This logo is also present on every page of the website, and clicking it will always bring you to your list of patients.

 
2. Patient List

This page displays a list of all of a student's patients.

You may search through your patients with the search bar at the top of the screen. Note that the search bar only searches for patient names.

You may reorder the patients list by clicking the categories at the top of each column of the list.

Clicking the red 'i' at the right side of each row of the patient list reveals the patient's key demographics, as well as the options to export the patient profile to PDF and delete the patient profile entirely.

Note that the export to PDF button is not functional at the moment, but patient profile deletion is.







 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 ## Licenses 

We applied an MIT license to our codebase. 

This license is a permissive software license in that it allows other programmers to commercially and privately use, modify, distribute, and sublicense our codebase on the stipulation that the original copyright and permission notice of the license are also included. We are not held liable for anything that other programmers do with our code.

Our partners asked us specifically to use this license, as they are familiar with it, and it allows the sharing of our codebase without forcing other programmers to expose their own closed-source code (namely the developers of the Isabel API, whom our partners have a working relationship with and plan to present our application to upon its completion).
