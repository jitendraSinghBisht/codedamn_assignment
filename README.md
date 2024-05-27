# Online Playground (codedamn_assignment)

> [!IMPORTANT]
> This is just a **Prototype Project** which has a lot of scope for improvements in UI and in management.

## Table of Content

+ **Introduction**
+ **Work Flow**
+ **Steps to Set up**
+ **Backend API**
+ **What I Learned**

## Introduction

It is an **Online Coding Playground** project which sets the base for developing the more advance and more user friendly web based code editors. It has the capability to scale and is maintainable. Its safe and secure as it uses a docker container to execute the user code.

### Overview

1. **Front-end**
   + **Monaco Editor**: Used @monaco-editor/react for easy integration with react.
   + **Xterm**: Used xtermjs and its addons for attaching it to the real terminal.
   + **Redux**: Used to manage states and props passing between components.
   + **Shadcn**: Used the ui library for learning and faster development.
   + **TailwindCss**: Used for styling (No plain css).
2. **Backend**
   + **Express**: Used for request response handling (currently familiar with this).
   + **MongoDB**: Used mongoose as it works well with node.
   + **Dockerode**: a wrapper around docker api which provides smooth working.
   + **WebSockets**: used to connect xterm to docker container's terminal.
3. **Production**
   + **Vercel**: Used for hosting the front-end of the web-app.
   + **AWS ec2**: Used for hosting the server api for the web-app.
   + **Nginx**: Used for secure https connection.

## Work Flow

This project folows a simple and most common work flow i.e. signup/signin select options and start working. Let's see the each step one by one below.

1. **Authentication**
   + Login has been made mandatory for all the users.
   + The state of the user is being taken care by the cookies.
   + This depicts how the authentication works but it do not focus much on it.
![login](./assets/Screenshot%20from%202024-05-28%2002-10-22.png)
![login](./assets/Screenshot%20from%202024-05-28%2002-10-36.png)
2. **Optons**
   + There are 2 optons provided to the user for the deployment of the project.
     + Start with the fresh new project.
     + Start with the older projects which were created ealier.
   + The user can select the name of the project and also have the section to choose the framework.
   + In this project the project name should be unique whenever the project is being created.(Can be improved for actual company production)\
![login](./assets/Screenshot%20from%202024-05-28%2002-10-22.png)
3. **Playground**
   + This project do not focuses much on the ui part of the playground. Has a simple layout for demontration.
   + It has the 3 resizable areas -> Editor, Terminal and Preview.
   + It contains a folder section to display files and folders. The add delete options can be acessed by right click.
   + It do have a settings button but the setting are not provided as of now.
![login](./assets/Screenshot%20from%202024-05-28%2002-39-12.png)

## Steps to Set up

Here are the steps to setup this project in your localhost.\
**Note:** No need of nginx for local deployment.\

### **Prerequisites**

+ Node should be installed.
+ Docker should be installed.
+ Ubuntu image should be pull.
+ MongoDB should be accessible.

### Steps

Clone the repository in a folder. And open that folder in a terminal. Now runn the following command to install the dependencies.

```sh
cd backend
npm install
cd ../frontend
npm install
```

Once you have installed the dependencies now create an ***.env*** file inside the backend folder which should have the following keys.

```env
PORT= <http port>
WSPORT= <Websocket port>
WSURL= <websocket entrypoint>

MONGODB_URI= <Uri of the mongodb server>
CORS_ORIGIN= <Cors: address>

VOLUME_LOC= <where the volumes will be saved>
```

Now create another ***.env*** file inside the front-end folder which should have the following key.

```env
VITE_URL= <Url where the server is hosted>
```

Start front-end by following commands.

```sh
cd frontend
npm run dev
```

Start backend by following commands.

```sh
cd backend
npm run dev
```

You are now ready to go and test this out......

## Backend API

This Project has the 4 major routes for the webapp user, container, file and websocket.\
It too have a health check route which is
> /api/hello

### User routes

These routes are used for all the authentication related tasks.\
There are 4 user routes.
> /api/user/sign-up\
> /api/user/sign-in\
> /api/user/log-out\
> /api/user/authenticate

### Container routes

This takes the responsibility of the docker.\
There are 3 container routes.
> /api/container/create\
> /api/container/get-old-volumes\
> /api/container/get-root-structure/:volumename

### Files routes

This is mainly responsible for the handling of the folder of the user.\
There are 6 files routes.
> /api/file/read-file/:fileId\
> /api/file/delete-file/:fileId\
> /api/file/update-file/:fileId\
> /api/file/create-file/:folderId\
> /api/file/create-folder/:folderId\
> /api/file/delete-folder/:folderId

### WebSocket route

This route is responsible for the full duplex connection between the terminal and the docker container
> ws://\<host>:\<port>/container/:containerId

## What I Learned

This Project proved to be a very challenging and learning project for me. I completed this project in 35 to 40 days, in this period I gained the knowledge about `TypeScript`, `Docker`, `AWS ec2`, `Nginx`, etc.\
This project pushed me forward to cross my boundries of the current knowledge. This also allowed me to experience how the things wokrs in the production like how to handle cookies, cors errors, ssl for https, configuration between the 2 different server and much more...

[Email](jitendrasinghbisht1404m@gmail.com)