# Drafty 
A lightwight, efficient note-taking web-application built with a focus on core JavaScript 
perfomance and responsive design.

## Purpose:
I developed Drafty as a 6 day sprint to solidify my understanding of the Document Object Model and state management. My goal was to build a fully functional Single-Page-Application using only vanilla JavaScript.

## Technicals:
- Frontend: HTML, CSS3, Vanilla JavaScript.
- Persistence: localStorage API  for Client-side data storage.
- Deployment: Automated C1/CD pipline using Git and Vercel for real-time updates

## Features v1.0.0:
- Complete CRUD Lifecycle: Create, Delete, Update and delete instantly.
- Smart Save Logic: Save button distinguises between creating new entries and updating existing one via unique id matching.
- Persistent Storage: Notes remain in the browser's Storage, surving reloads and closing of the browser.
- Automatic-Titling: Titles are generated automatically if the note title is left blank.
- UI: Single-Page-Interface: updates the sidebar and editor using DOM manipulation without page reloads;
- Responsive Sidebar: Collapsible sidebar for a clean interface.
