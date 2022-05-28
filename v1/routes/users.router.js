// imports
const express = require('express');
const usersController = require('../controllers/users.controller');


// create express router
const usersRouter = express.Router();

usersRouter.get('/:UserID/can-view-inventory', usersController.getCanViewInventory);
usersRouter.get('/:UserID/gamepasses', usersController.getGamepasses);
usersRouter.get('/:UserID/clothing', usersController.getClothing);
usersRouter.get('/:UserID/', usersController.getUser);


// export the router
module.exports = usersRouter;