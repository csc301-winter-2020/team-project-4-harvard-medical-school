# Scribe/Team 53

## Description 

Scribe is a web application that allows medical students to draft their notes as they interview and diagnose patients in clinical settings; these notes will be actively processed and searched against a list of medical symptoms and key terms every given time interval.

Scribe has three main interfaces for each kind of our target users: medical students, medical educators, and medical school administrators.

The student-facing side of the application is where students draft their notes, with notes being created within patient profiles that are created and saved for each patient that the student interviews. Within each patient profile are various pages with text fields and/or stylus canvasses where students input information about their patients. 

The educator-facing side of the application allows educators to view the patient profiles of their students, as well as enter the correct diagnosis for a given patient’s recorded symptoms.

The administrator-facing side of the application is able to access the generated list of medical terms and predicted diseases derived from parsing a student’s notes.

The problem our application aims to solve deals with the inefficiency of how medical students currently draft their notes: they either must write their notes on paper or on their own individual text editors while interviewing patients, and would later need to transcribe their notes into a separate web form for submission.

Our application saves time by speeding up this process, as students can take notes directly within the application (accepting both typed and stylus inputs), providing a standardized way of organizing a student’s notes in one place, as well as providing a convenient method for submission. This also makes it easier for educators to view and provide input on their student’s submissions.

Scribe also helps researchers gain better understanding in how medical students learn and approach diagnosis decision making through the generated list of medical terms and diagnoses generated from a student’s notes. 

As of now, not much research has been done on how students approach diagnosis decisions; with our application, we can gain empirical data that helps indicate how students organically come to final patient diagnosis.

From this information, we can curate and collect statistics about how medical students approach clinical problems in the context of the broader medical curriculum, as well as gain a better understanding of how their understanding of clinical concepts evolves throughout their medical education.

## Key Features

* Login and Registration of student user profiles

* Custom configuration of a student’s user profile and settings

* ???? Creation and deletion of patient profiles ?????

* Accessing the text information of a patient profile from our database

* Updating the text information of a patient profile and saving it in our database

* Polished views for every page in the patient profile

* Functional canvas inputs (but no saving or accessing them from the database)

* The creation and editing of patient profile templates (but not actually using them)

## Instructions

1. do something
2. do something
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 ## Licenses 

We applied an MIT license to our codebase. 

This license is a permissive software license in that it allows other programmers to commercially and privately use, modify, distribute, and sublicense our codebase on the stipulation that the original copyright and permission notice of the license are also included. We are not held liable for anything that other programmers do with our code.

Our partners asked us specifically to use this license, as they are familiar with it, and it allows the sharing of our codebase without forcing other programmers to expose their own closed-source code (namely the developers of the Isabel API, whom our partners have a working relationship with and plan to present our application to upon its completion).
