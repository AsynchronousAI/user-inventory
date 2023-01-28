// imports
const axios = require('axios');


// helper functions
async function checkGamepasses(userID, pageNumber, cursor) {
	return await axios.get(`https://www.roblox.com/users/inventory/list-json?assetTypeId=34&cursor=${cursor}&itemsPerPage=100&pageNumber=${pageNumber}&userId=${userID}`)
}


// create requests
async function getGamepasses(req, res) {
	// get request data
	const userID = req.params.UserID;

	// proxy request to Roblox for gamepasses
	const gamepasses = [];
	var nextPageCursor = null;
	var pageNumber = 0;

	do
		try {
			// request gamepass page from Roblox
			const robloxRes = await axios.get(`https://www.roblox.com/users/inventory/list-json?assetTypeId=34&cursor=${nextPageCursor}&itemsPerPage=100&pageNumber=${pageNumber}&userId=${userID}`);
			
			// parse data 
			const data = robloxRes.data.Data;

			if (data.End > data.Start) {
				const items = data.Items

				items.forEach((item) => {
					if (item.Creator.Id == userID && item.Product.IsForSale == true) { // point of checking add
						gamepasses.push({
							"ID": item.Item.AssetId,
							"Price": item.Product.PriceInRobux,
							"Created": true
						});
					}else if (item.Product.IsForSale == true) {
						gamepasses.push({
							"ID": item.Item.AssetId,
							"Price": item.Product.PriceInRobux,
							"Created": false
						});
					}
				})

				nextPageCursor = data.nextPageCursor;
				pageNumber++;
			} else {
				nextPageCursor = null;
			}
		} catch {
			nextPageCursor = null;
		}
	while (nextPageCursor != null);

	// return gamepasses in JSON format
	res.status(200).send(JSON.stringify(gamepasses));
}


// export the requests
module.exports = {
	getGamepasses,
}
