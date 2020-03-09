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

* **Creation and deletion of patient profiles**
    - Each new patient profile is initialized with the patient's first and last name.
    - Created patient profiles are displayed on the Patient List page
        - You can search for a specific patient profile by patient name.
        - The Patient List is able to be sorted alphabetically, by creation date, and by most recent modification date.

* **Polished views and (mostly) completed functionality for 8/10 pages of a patient profile**
    - Every patient profile consists of (at the moment) 10 distinct pages, each with their own set of different form input fields.
    - Every form input field generally consists of a canvas input box and a text input box, each of which can be optionally hidden by toggle buttons.
        - Recall that the default display of these form input fields can be changed within the user settings page.
    - A page may also have radio button input fields. Certain input configurations to these radio buttons may prompt previously hidden form input fields to appear, or cause other radio buttons to grey out.
        - For example, selecting Female within the Demographics page reveals a form input field asking if the patient is pregnant. This form input field is hidden when Male is selected instead.
    - The form input fields for most of the pages are quite similar, except for the Physical Examination and Lab Results pages, which require their own specialized methods of input.
        - As such, these two pages are still incomplete at the moment.
    - Note that at the moment, only information entered into **text form inputs** and **radio button inputs** is saved in our database and accessible at later times.
        - Currently, canvas form inputs cannot be saved or accessed from our database.
    - The views of the 8 standard pages of the patient profile are also presentable on a tablet devices, but functionality on tablet devices has not been extensively tested yet.
    
* **Functional canvas input fields on the client-side**
    - Canvas input fields allow for users to handwrite their notes directly in our application.
    - Functionalities include an eraser tool, the ability to change pen color, and the option to erase an entire canvas at once.
    - Canvases are also expandable in size, should a user run out of room.
    - Note that because canvas form inputs currently cannot be saved or accessed from our database, navigating away from the page or reloading the page resets all canvases.

* **The creation and editing of patient profile templates**
    - Users are able to create and edit patient profile templates that are intended to allow the user to rearrange or hide patient profile pages and/or certain form input fields within a patient profile.
        - For example, a user may find it unnecessary to have a Lab Results page in a patient's profile.
    - In creating a template, the user is presented a superset of all possible pages and form input fields within each page.
        - Pages and form input fields can then be dragged around to rearrange them, or checked off to indicate that they should be hidden.
    - Note that created templates cannot actually be applied to patient profiles at the moment, but created and edited templates are saved and accessible from our database.

## Instructions

1. **Login/Registration Page**

 - https://csc301-scribe.herokuapp.com/ brings you to our website's login page. You may enter the credentials for the following pre-created user:
     - Username: user, Password: user
 
 - Alternatively, you may register for your own user account by clicking the register button and inputting a username and password.

 - As mentioned in Key Features, we currently only support the student-facing side of the application, so all users are assumed to be medical students at the moment.
 
2. **User Settings Page**

 - Logging in successfully brings you to a page displaying a list of all of your patients, but we shall explore that page later on.

 - For now, click the three horizontal lines icon at the top right of the screen. This menu icon appears on every page on the website other than the login screen.

 - Clicking it pops up a small display menu showing your name, your year of study, a button that leads you to your User  Settings page, and a Logout button.

 - Click the Settings button. This brings you to your user profile settings page. 

 - Here you can change your Default Input Mode as well as determine whether you want to show the navigation sidebar by default, as outlined in the Key Features section.

 - Clicking the pencil icon at the bottom right of the screen allows you to edit your name, your year of study, and your profile picture. Note that at the moment you cannot update your hospital.

 - If you decide to change your name, year, or profile picture, click the checkmark icon at the bottom right of the screen to confirm your changes.

 - Now let us return to our patients list page. Click the Scribe logo at the top right of the screen. This logo is also present on every page of the website, and clicking it will always bring you to the patient list page.
 
2. **Patient List Page**

    - This page displays a list of all of a student's patients. You may search through your patients with the search bar at the top of the screen. Note that the search bar only searches for patient names.

    - You may reorder the rows of the patients list by clicking the column headings at the top of the list.

    - Clicking the red 'i' at the right side of each row of the patient list reveals the patient's key demographics, as well as the options to export the patient profile to PDF and delete the patient profile entirely.
        - Note that the export to PDF button is not functional at the moment, but patient profile deletion is.
        
    - On this page is the Add/Customize Template button on the bottom right of the screen. We will explore this button later on.
    - For now, let us try creating a new patient profile. Click the Add Patient button on the bottom right of the screen.
    
3. **Patient Profile Creation**
    - complete this

4. **Exploring the pages of a Patient Profile**
    - Within the patient profile is where users take their notes during patient interviews.
    - On the left side of every page is a navigation sidebar which displays a list of all the pages of the patient profile.
    - Clicking on an element of this list brings you to the corresponding page.
    - Recall that you can change whether the sidebar is shown by default in the User Settings page.
    - Also recall that the **Physical Examination** and **Lab Results** pages are still incomplete.
    - At the bottom right side of the page are two arrow buttons that also let you navigate to other pages in the patient profile.
    - The question mark button is for a currently unimplemented 'Helps and Tips' feature; at the moment, it does nothing.
    - The main bulk of the page is where students take their notes through various form input fields.
    - Notice that above most form input fields are two buttons that enable you to toggle whether a text input box or a canvas input box is displayed to you. 
        - Recall that the default input mode can be set within the User Settings page.
    - Interacting with a canvas input box is quite intuitive:
        - The colored circles on the left change the color of your pen.
        - The trash can icon on the right erases the entire canvas.
        - The eraser icon toggles the eraser tool.
        - The expansion icon extends the canvas size.
    - Recall that canvas form inputs currently cannot be saved or accessed from our database, so navigating away from the page or reloading the page resets all canvases.
    - You can test how text form inputs and radio button form inputs are saved and accessed from the database by using the save button at the top right of the page.
        - For example, if you were to change a patient's First Name through a text box, press the save button, and log out, then the patient's first name will have been changed when you log back in.
    
5. **Patient profile templates**

 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 ## Licenses 

We applied an MIT license to our codebase. 

This license is a permissive software license in that it allows other programmers to commercially and privately use, modify, distribute, and sublicense our codebase on the stipulation that the original copyright and permission notice of the license are also included. We are not held liable for anything that other programmers do with our code.

Our partners asked us specifically to use this license, as they are familiar with it, and it allows the sharing of our codebase without forcing other programmers to expose their own closed-source code (namely the developers of the Isabel API, whom our partners have a working relationship with and plan to present our application to upon its completion).
