# iscsc.fr
This is the iScsc website source code.
**This website is still under development**

## MERN
The tech stack I chose for this web application is MERN with:
- MongoDB for the database 
- Express for the API
- React for the frontend 
- Node.js for the backend 

For more information, check [this article](https://www.mongodb.com/mern-stack).

## Functionalities
The main functionalities of the website at the moment are creating, reading and deleting posts on the blog section of the website.
Posts are rendered in Markdown, with the [Github Flavored Markdown, GMF](https://github.com/remarkjs/remark-gfm).
The authentication is now available. A user can sign up, and log in with an email and a password. Some actions in the blog, like creating and deleting articles need authentication.
JWT and cookies allow the user to stay logged in.

### Create
You should be able to create your post in the /createArticle route. **Creating a post requires authentication.** 

Two writing options are available:
- Writing the post directly inside the form inputs
- Submit a markdown file
  
For the first option, no editor is available at the moment on the website, so writing a post directly from the Textarea field might be harsh. That is why the second way is recommended. A template is available for the markdown file submission.

When creating a post, a preview is available on the right side of your browser. The author assigned to the article will be the name of the authenticated user.

### Read
Any article submitted by other users can be read through the /blog route.

### Delete
You should be able to delete any article **you created** from the database.

>Note: if you try to delete an article you did not write, it won't work but you won't recieve any error message.

## Setup
You need to set up the frontend and backend applications to test the server. Here is a quick guide after cloning the repository:

### Backend
From the root directory of the repository, do the following:
```bash
cd backend
npm install
cp .env.example .env
```

After copying the example config of `.env`, you must fill in the missing information in this file:
- The port to deploy the backend
- The database name
- The credential for the database
- The secret key used to sign JWT

If you don't know how to deploy your database, consider using [Atlas](https://www.mongodb.com/atlas/database).

> #### Notes for the iScsc members:
> To access the official iScsc database, send me a message and I'll send you back a crypted version of the official `.env`.

 To deploy the server once your `.env` is ready, run 
```bash
node .
```

If everything is good, the application should output:
```
Server listening: http://localhost:<PORT>
```

### Frontend
From the root directory of the repository, do the following:
```
cd frontend
npm install
npm start
```
It will start the application on a localhost port that you will be able to access in your browser.
Make sure the backend application is running before launching the frontend.

## Repository structure

Here is a list of the main folders/files of the repository.

```
iscsc.fr
├── backend                 *contains the server-side code and API* 
│   ├── controllers/         *usefull js functions for each model*
│   ├── middleware/          *js functions that run between the frontend and backend*
│   ├── models/              *contains the database models*
│   ├── routes/              *routes and functions to executes for each model*
│   ├── app.js              *main application for the backend*
│   ├── .env                *stores database credentials and required information for the backend deployment. Must be created*
│   └── .env.example         *template for .env*
│
├── frontend  
│   ├── public              *automatically generated files and images that are publically available for the user*
│   └── src                 *source code of the website*
│       ├── components/      *source code of main components of the website*
│       ├── context/         *defines the context function to keep track data with useReducer*
│       ├── hooks/           *defines the hooks that trigger the context functions*
│       ├── pages/           *source code of the pages of the website*
│       ├── App.js          *defines the routes of the application*
│       ├── index.js        *main js application of the website*
│       └── index.css       *css styling file of the website*
│
└── README.md               *this file*
```

## Bugs and recommendations
Because this website is still in development, do not hesitate to open an issue if you experience any troubles when using it.
Also, feel free to share your recommendations regarding the color scheme, routes, design, UX, etc...

## Incoming works
Here is a none exhaustive list of incoming functionalities for the website:
- User profile, with article management
- Likes and comments
- Main page
- Calendar
- News and events
- Pictures, avatars for users
- Search bar
- Gallery with previous works, events
- ...
