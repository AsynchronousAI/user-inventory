// imports
const axios = require('axios');


// create requests
function getClothing(req, res) {
	// get request data
	const username = req.params.Username;

	// proxy request to Roblox, and return data
	axios
		.get(`https://catalog.roblox.com/v1/search/items/details?Category=3&Sort=3&Limit=30&CreatorName=${username}`) // point of checking if owned
		.then(robloxRes => {
			const clothing = [];
			const items = robloxRes.data.data;

			items.forEach(item => {
				clothing.push({
					"ID": item.id,
					"Price": item.price, 
					"Created": true
				});
			});

			res.status(200).send(JSON.stringify(clothing));
		})
		.catch(err => {
			res.status(400).send(err.message);
		})
}


// export the requests
module.exports = {
	getClothing,
}
