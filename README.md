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

You should be able to create your post in the /create-article route. **Creating a post requires authentication.**

Two writing options are available:

- Writing the post directly inside the form inputs
- Submit a markdown file

For the first option, no editor is available at the moment on the website, so writing a post directly from the Textarea field might be harsh. That is why the second way is recommended. A template is available for the markdown file submission.

When creating a post, a preview is available on the right side of your browser. The author assigned to the article will be the name of the authenticated user.

### Read

Any article submitted by other users can be read through the /blog route.

### Delete

You should be able to delete any article **you created** from the database.

> Note: if you try to delete an article you did not write, it won't work but you won't recieve any error message.

## Deployment

You need to set up the frontend and backend applications to test the server.
For deployment, `development` and `production` modes are available

> ##### Notes for the iScsc members:
>
> Send me a message and I'll send you back a crypted version of the official `.env.production` and `.env.development` files.

Here is a quick guide after cloning the repository:

### Development mode

#### .env file

Before deploying the application, you need to set the environment variables
From the root directory of the repository, do the following:

```
cp .env.example .env.development
```

After copying the example config of `.env`, you must fill in the missing information in this file. Check the example for more information.

> If you don't know how to deploy your database, consider using [Atlas](https://www.mongodb.com/atlas/database).

#### Backend

From the root directory of the repository, do the following:

```bash
cd backend
npm install
npm run dev
```

> You will need `nodemon` to run the backend. Use `npm install -g nodemon` to install it.

#### Frontend

From the root directory of the repository, do the following:

```bash
cd frontend
npm install
npm run start
```

### Production mode

The production mode allows to deploy the application on the server. To use it, you will need:

- `docker`
- `docker-compose`

#### .env file

Before deploying the application, you need to set the environment variables, as for `developement` mode.

```bash
cp .env.example .env.production
```

#### SSL certification

To setup HTTPS, you will need valid SSL certificates. If you deploy the app for the first time, follow these instructions:
- Comment or delete the whole server section about 443 in the `nginx/nginx.conf.template` file.
```diff
- server {
- listen 443 default_server ssl http2;
- ...
- }
```
> This step is required because the certificates don't exist yet, so they cannot be loaded in the nginx configuration.
- (Re)Start the `nginx` container:
```bash
sudo docker-compose --env-file .env.production up -d --build
```
- Create the certificates with the `certbot` container:
```bash
sudo docker-compose --env-file .env.production run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d yourdomainname.com
```
- Restore the original `nginx/nginx.conf.template` (with `git restore nginx/nginx.conf.template` for example)
- Stop the `nginx` container:
```bash
sudo docker-compose --env-file .env.production down
```

The certificates should have been generated in `certbot/conf/live/yourdomainname.com/`

If you just want to renew already existing certificates, use:
```bash
sudo docker-compose --env-file .env.production run --rm certbot renew
```

#### Docker

Once everything is ready, run

```bash
sudo docker-compose --env-file .env.production up -d --build
```

> Make sure the `docker` daemon is running, or start it with `sudo dockerd`

You application can now be started on `$CLIENT_URL` (specified in the `.env.production` file)

To see the running application, and check the logs use

```bash
sudo docker ps
sudo docker logs <CONTAINER_ID>
```

Finally, you can stop the production mode with

```bash
sudo docker-compose --env-file .env.production down
```

## Repository structure

Here is a list of the main folders/files of the repository.

```
iscsc.fr
│
├── .env.development    *stores database credentials and required information for developement mode deployment. Must be created*
├── .env.production     *Same thing for production mode. Must be created*
├── .env.example        *template for .env files*
│
├── backend             *contains the server-side code and API*
│   ├── Dockerfile          *Dockerfile to build the backend container*
│   ├── controllers/        *usefull js functions for each model*
│   ├── middleware/         *js functions that run between the frontend and backend*
│   ├── models/             *contains the database models*
│   ├── routes/             *routes and functions to executes for each model*
│   └── app.js              *main application for the backend*
│
├── frontend
│   ├── public              *automatically generated files and images that are publically available for the user*
│   ├── Dockerfile          *Dockerfile to build the frontend container*
│   └── src                 *source code of the website*
│       ├── components/         *source code of main components of the website*
│       ├── context/            *defines the context function to keep track data with useReducer*
│       ├── hooks/              *defines the hooks that trigger the context functions*
│       ├── pages/              *source code of the pages of the website*
│       ├── App.js              *defines the routes of the application*
│       ├── index.js            *main js application of the website*
│       └── index.css           *css styling file of the website*
├── scripts
│   └── gpg-share.sh        *share a secret files to others with pgp keys*
│
├── nginx               *reverse proxy server for the production mode*
│   ├── Dockerfile          *Dockerfile to build the nginx container*
│   ├── run_nginx.sh        *script to generate the nginx conf from the template*
│   └── nginx.conf.template *template for the nginx conf, needs to be filled with env variables*
│
├── bump.sh             *script used to bump version of frontend, backend and whole website*
├── docker-compose.yml  *docker compose config file to deploy the website in production mode*
├── package.json        *contains the current version and informations about the website*
└── README.md           *this file*
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
