# iscsc.fr
This is the iScsc website source code.
**This website is still in development and should not be deployed at the moment**

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

### Create
You should be able to create your post in the /createArticle route. Two options are available:
- Writing the post directly inside the form inputs
- Submit a markdown file
  
For the first option, no editor is available at the moment on the website, so writing a post directly from the Textarea field might be harsh. That is why the second way is recommended. A template is available for the markdown file submission.

When creating a post, a preview is available on the right side of your browser.

> Note: each created article will be assigned to the author 'alex', as I did not implemented the author functionality yet.

### Read
All articles submitted by other users are readable through the /blog route.

### Delete
You should be able to delete any articles from the database. **Please, avoid deleting other people's articles, as the functionality that checks the author is not implemented yet.**

## Setup
You need to set up the frontend and backend applications to test the server. Here is a quick guide after cloning the repository:

### Backend
From the root directory of the repository, do the following:
```bash
cd backend
npm install
cp .env_example .env
```

After copying the example config of `.env`, you must fill in the missing information in this file:
- The port to deploy the backend
- The database name
- The credential for the database

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

## Bugs and recommendations
Because this website is still in development, do not hesitate to open an issue if you experience any troubles when using it.
Also, feel free to share your recommendations regarding the color scheme, routes, design, UX, etc...

## Incoming works
Here is a none exhaustive list of incoming functionalities for the website:
- User authentication
- Likes and commentaries
- Main page
- Calendar
- News and events
- Pictures, avatars for users
- Search bar
- Gallery with previous works, events
- ...