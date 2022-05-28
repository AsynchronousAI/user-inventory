// imports
const express = require('express');
const gamepassesController = require('../controllers/gamepasses.controller');


// create express router
const gamepassesRouter = express.Router();

gamepassesRouter.get('/:UserID', gamepassesController.getGamepasses);


// export the router
module.exports = gamepassesRouter;