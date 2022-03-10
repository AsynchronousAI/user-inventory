# REST API

## Users

### GET /v1/users/{USER_ID}/

Returns information about a user and their inventory. Will return lists containing all presently on sale clothing/gamepasses (id and price) creaeted by the user.

#### Request:

```
localhost:3000/v1/users/18982229/
```

#### Response:

```json
{
	"Username": "Scarious",
	"CanViewInventory": true,
	"Clothing": [
		{
			"ID": 1087041986,
			"Price": 200
		},
		{
			"ID": 2210096025,
			"Price": 5
		}
	],
	"Gamepasses": [
		{
			"ID": 33215803,
			"Price": 1
		}
	]
}
```

### GET /v1/users/{USER_ID}/can-view-inventory/

Returns a boolean showing whether or not the users inventory is publicly viewable.

#### Request:

```
localhost:3000/v1/users/18982229/can-view-inventory/
```

#### Response:

```json
{
	"CanViewInventory": true
}
```


### GET /v1/users/{USER_ID}/clothing/

Returns a list containing all presently on sale clothing (id and price) creaeted by the user. Might be preferential to use `/clothing/{USER_NAME}/`

#### Request:

```
localhost:3000/v1/users/18982229/clothing
```

#### Response:

```json
[
	{
		"ID": 1087041986,
		"Price": 200
	},
	{
		"ID": 2210096025,
		"Price": 5
	}
]
```


### GET /v1/users/{USER_ID}/gamepasses/

Returns a list containing all presently on sale gamepasses (id and price) creaeted by the user.

#### Request:

```
localhost:3000/v1/users/18982229/gamepasses
```

#### Response:

```json
[
	{
		"ID": 33215803,
		"Price": 1
	}
]
```


## Clothing

### GET /v1/clothing/{USER_NAME}/

Returns a list containing all presently on sale clothing (id and price) creaeted by the user.

Same as `/users/{USER_ID}/clothing`, but uses one less API call since you don't have to turn `USER_ID` into `USER_NAME`.

#### Request:

```
localhost:3000/v1/clothing/Scarious/
```

#### Response:

```json
[
	{
		"ID": 1087041986,
		"Price": 200
	},
	{
		"ID": 2210096025,
		"Price": 5
	}
]
```

## Gamepasses

### GET /v1/gamepasses/{USER_ID}/

Returns a list containing all presently on sale gamepasses (id and price) creaeted by the user.

Same as `/v1/users/{USER_ID}/gamepasses/`.

#### Request:

```
localhost:3000/v1/gamepasses/18982229/
```

#### Response:

```json
[
	{
		"ID": 33215803,
		"Price": 1
	}
]
```