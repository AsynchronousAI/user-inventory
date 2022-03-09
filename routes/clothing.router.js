// imports
const express = require('express');
const clothingController = require('../controllers/clothing.controller');


// create express router
const clothingRouter = express.Router();

clothingRouter.get('/:Username', clothingController.getClothing);


// export the router
module.exports = clothingRouter;