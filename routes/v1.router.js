// import express
const express = require('express');


// import routers
const clothingRouter = require('../v1/routes/clothing.router.js')
const gamepassRouter = require('../v1/routes/gamepasses.router.js')
const usersRouter = require('../v1/routes/users.router.js')


// create express router
const v1Router = express.Router();

v1Router.use('/clothing/', clothingRouter);
v1Router.use('/gamepasses/', gamepassRouter);
v1Router.use('/users/', usersRouter);


// export the router
module.exports = v1Router;