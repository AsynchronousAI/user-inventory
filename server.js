// import packages
const express = require('express');


// constants
const PORT = process.env.PORT || 3000;


// import routes
const v1Router = require('./routes/v1.router.js')


// create express app
const app = express();

app.use(express.json());
app.use('/v1/', v1Router)


// start listening to requests
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});