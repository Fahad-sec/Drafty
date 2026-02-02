
# Drafty
A simple note-taking web-application using cloud-storage for data persistence. While having User-Authentication and a Complete CRUD LifeCycle and using Jamsine for testing.

## Project Evolution
### v1: Local Foundation 
- Started a simple project using DOM manipulation and Browser's storage.
### v2: Cloud Integration 
- Switched to a full-stack architecture using Supabase for PostgreSQL storage and User Authentication.
### v3:
- Architecture and Testing - Refactored the codebase using Dependency Injection for implementation of testing using the Jasmine Framework.

## Key Technical Achievements
### Unit testing: 
- Integrated the jasmine testing framework to verify 18+ critical specifications across auth logic, UI design and storage.
## Dependency Injection
- Refactored core business logic to use DI, allowing for isolated testing of functions by injecting mock dependencies.
### Secured Environment Variables
- Added secure management of environment variables to protect sensitive API key and database credentials.
### Cloud persistence 
- Full CRUD lifeCycle synced via Supabase, with smart logic to distinguish between new entries and existing note edits.

## Features
### Secure Auth:
- Login/Signup interface with persistent session management.
### Complete CRUD:
- Create, Read, Update and Delete notes seamlessly.
### Edit Mode:
- Editor toggle prevents accidental edits while browsing notes.
### UI-UX
- Automatic titling for untitled notes.
- Responsive, collapsible sidebar for focused writing experience.
- Automatic Editor mode turned on for new notes and off for existing ones.

## Tech Stack
### Frontend:
HTML5, CSS3, Vanilla JavaScript (ES6+)
### Testing:
Jasmine Framework
### Deployement:
Automated CI/CD pipeline via git and Vercel.

### Challenges
### Cloud Storage:
 At first I only intended to make a CRUD web-application using localStorage using to DOM manipulation to better my javascript skills however after it's completion. I researched how i can integrate Cloud Storage which led me to using a baas such as Supabase to handle not just the storage but also use User Authentication which turned it into much more than a simple project.

### Refactoring:
Before starting the testing with jasmine the whole codebase was written in spaghetti code and needed a complete refactoring to be able to run tests with Jasmine. which is why I used dependency injection to eliminate the need of imports inbetween files and resorted to a seperate file dedicated to calling functions (main.js), where all variable and functions are imported to be called.
