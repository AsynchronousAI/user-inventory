// imports
const axios = require('axios');


// helper functions

// checks whether a users inventory is publicly viewable
async function fetchCanViewInventory(userID) {
	try {
		const robloxRes = await axios.get(`https://inventory.roblox.com/v1/users/${userID}/can-view-inventory`);
		return robloxRes.data.canView;
	} catch {
		return false;
	}
}

// fetches a users created gamepasses from Roblox
async function fetchGamepasses(userID) {
	// gamepass fetch variables
	const gamepasses = [];
	var nextPageCursor = null;
	var pageNumber = 0;

	// proxy request to Roblox for gamepasses
	do
		try {
			// request gamepass page from Roblox
			const robloxRes = await axios.get(`https://www.roblox.com/users/inventory/list-json?assetTypeId=34&cursor=${nextPageCursor}&itemsPerPage=100&pageNumber=${pageNumber}&userId=${userID}`);
			const data = robloxRes.data.Data;

			// parse data 
			if (data.End > data.Start) {
				const items = data.Items

				items.forEach((item) => {
					if (item.Creator.Id == userID && item.Product.IsForSale == true) {
						gamepasses.push({
							"ID": item.Item.AssetId,
							"Price": item.Product.PriceInRobux,
						});
					}
				})
			}

			// go to next page (if available)
			nextPageCursor = data.nextPageCursor;
			pageNumber++;

		} catch {
			nextPageCursor = null;
		}

	while (nextPageCursor != null);

	// return gamepasses
	return gamepasses;
}

// fetches a users username from Roblox given a userid
async function fetchUsername(userID) {
	const robloxRes = await axios.get(`https://users.roblox.com/v1/users/${userID}`);
	return robloxRes.data.name;
}

// fetches a users clothing from Roblox
async function fetchClothing(username) {
	try {
		const robloxRes = await axios.get(`https://catalog.roblox.com/v1/search/items/details?Category=3&Sort=3&Limit=30&CreatorName=${username}`);

		const items = robloxRes.data.data;
		const clothing = [];

		items.forEach(item => {
			clothing.push({
				"ID": item.id,
				"Price": item.price, 
			});
		});

		return clothing;

	} catch {
		return [];
	}
}


// create requests
async function getGamepasses(req, res) {
	// get request data
	const userID = req.params.UserID;

	// proxy request to Roblox for gamepasses
	const gamepasses = await fetchGamepasses(userID);

	// return gamepasses in JSON format
	res.status(200).send(JSON.stringify(gamepasses));
}


async function getClothing(req, res) {
	// get request data
	const userID = req.params.UserID;

	try {
		// get username from Roblox
		const username = await fetchUsername(userID);

		// proxy request to Roblox for clothing
		const clothing = await fetchClothing(username);

		// return clothing in JSON format
		res.status(200).send(JSON.stringify(clothing));
	} catch (err) {
		res.status(400).send(err.message);
	}
}

async function getUser(req, res) {
	// get request data
	const userID = req.params.UserID

	// get username, gamepasses, and clothing
	try {
		const canViewInventory = await fetchCanViewInventory(userID);
		const username = await fetchUsername(userID);
		const clothing = await fetchClothing(username);
		var gamepasses = [];

		if (canViewInventory) {
			gamepasses = await fetchGamepasses(userID);
		}

		res
			.status(200)
			.send(JSON.stringify({
				"Username": username,
				"CanViewInventory": canViewInventory,
				"Clothing": clothing,
				"Gamepasses": gamepasses,
			}))
	} catch (err) {
		res
			.status(400)
			.send(err.message);
	}
}

async function getCanViewInventory(req, res) {
	// get request data
	const userID = req.params.UserID

	// check if we can view their inventory
	const canViewInventory = await fetchCanViewInventory(userID)

	// return whether or not we can view their inventory
	res
		.status(200)
		.send(JSON.stringify({
			"CanViewInventory": canViewInventory,
		}));
}


// export the requests
module.exports = {
	getCanViewInventory,
	getGamepasses,
	getClothing,
	getUser,
}
