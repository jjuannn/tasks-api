# Tasks API

Rest API to create, read, update and delete tasks

## Stack used:

This application was made with:

- 🐯Nest JS - a progressive NodeJS framework.
- 💥 TypeORM - a powerful ORM.
- 🐘 MySQL for the database where the data is stored.
- 🟦 TypeScript for the static type definitions.
- 🃏 Jest for API Modules unit testing

## Deployments:

- https://tasks-api-nnmu.onrender.com/

## Endpoints:

- 🟩GET `/tasks/all` - returns a list with all the tasks.
- 🟩GET `/tasks/view/:id` - return the task with the id specified.
- 🟩GET `/tasks/view/title/:title` - returns an array with the tasks containing the parameter in the title.
- 🟫POST `/tasks/new` - creates a new task. `title`, `description` and `priority` must be sent in the request body.
- 🟫POST `/tasks/edit` - edit an existing task. `id`, and the new values of `title`, `description` or `priority` must be sent in the request body.
- 🟥DELETE `/tasks/delete/:id` - deletes a task with the id specified.

## Instalation

- Run `npm install` to install the project dependencies.
- Create a `.env` file, copying the `.env.dist` keys.
- Run `npm run build` to create an application build .
- Run `npm run start` to start the application in production mode .
- The app will be listening at `http://localhost:8080/`!
