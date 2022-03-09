// import packages
const express = require('express');


// import routes
const clothingRouter = require('./routes/clothing.router.js')
const gamepassRouter = require('./routes/gamepasses.router.js')
const usersRouter = require('./routes/users.router.js')


// constants
const PORT = process.env.PORT || 3000;


// create express app
const app = express();

app.use(express.json());
app.use('/clothing/', clothingRouter);
app.use('/gamepasses/', gamepassRouter);
app.use('/users/', usersRouter);


// start listening to requests
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});