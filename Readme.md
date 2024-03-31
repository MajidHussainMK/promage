# ProMage
## A project management application

A simple robust management application for managing multiple projects
[Check out the Live Demo Here](https://promage-production.up.railway.app/projects)

## Features
- Create and manage projects
- Add/Update tasks to a particular project
- Assign a project to a manager
- Notification service to send notifications
- Logger for logging requests

## Technologies

- NodeJS
- ExpressJs
- Typescript
- Jest
- Prettier
- Lint

## Database
- MongoDB

## Project Setup

Promage requires [Node.js](https://nodejs.org/) v16+ to run.

Copy .env.example to .env and provide correct env values
```
cp .env.example .env
```

Install the dependencies and start the server.

```sh
cd promage
npm i
npm run dev
```

For production environments..

```sh
npm run build
npm run start
```

## Docker

Promage is very easy to install and deploy in a Docker container.

To run docker build
```
docker-compose up --build
```

To build your own image
```sh
cd promage
docker build -t promage:v1.0.0 .
```

This will create the promage image and pull in the necessary dependencies.
Once done, run the Docker image and map the port to whatever you wish on
your host.

```sh
sudo docker run -d -p 3000:3001 --network="host" promage:v1.0.0
```

## License

MIT

**Free Software Management System, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Google]: <https://google.com>
