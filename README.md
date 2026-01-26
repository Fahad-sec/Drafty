# Drafty 
A lightwight, cloud-synced note-taking application built with Vanilla JavaScript and Supabase.

Drafty evolved from a 6-day sprint using DOM manipulation into a full-stack Single-page-application using secure user authentication and real-time persistence.

## Purpose:
I developed Drafty to solidify my understanding of state management, asynchronous JavaScript, and the integration of third-party BaaS providers. It represents a way of building modern and secure software without the weight of heavy frameworks.
## Technicals:
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+).
- BaaS: Supabase's Database and Authentication
- Deployment: Automated CI/CD pipline using Git and Vercel.

## Features :
- Secure Auth: Dedicated Login/Signup interface with session persistence.
- Cloud Storage: Notes are synced to the cloud via Supabase Auth making user's notes available across devices.
- Complete CRUD Lifecycle: Create, Delete, Update and delete effortlessly.
- Smart Save Logic: Intelligent ID matching that distinguishes between new entries and edits to existing notes.
- Edit notes: User can edit a note after enabling the editor mode using the Edit button and clicking the button again saves or updates the note. While not enabling the edit mode inhibits you from accidently editing the note.
- Automatic-Titling: Titles are generated automatically if the note's title is left blank.
- Responsive Sidebar: Collapsible sidebar for a clean interface.
- UUID: Database indexing using unique identifiers for every note.

## Evolution:
Originally built to learn browser's localStorage and DOM manipulation, the latest version represents a complete infrastructure: 

- Cloud Storage: Moved from localStorage to a PostgreSQL database via Supabase.
- User and security: Integrated Supabase Auth, enabling private user accounts and data.

- Session Management: Implemented persistent session management, ensuring users stay logged in across page reloads and browser closing.
