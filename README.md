# BetProtocol API
## Version: 0.0.1

### /admins/register

#### POST
##### Summary:

Register User Data

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [AdminRegisterRequest](#adminregisterrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admins/login

#### POST
##### Summary:

Login User

##### Description:

Login Admin Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [UserLoginRequest](#userloginrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/register

#### POST
##### Summary:

Register User Data

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [UserRegisterRequest](#userregisterrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/login

#### POST
##### Summary:

Login User

##### Description:

Login User Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [UserLoginRequest](#userloginrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/summary

#### POST
##### Summary:

Get Summary Data for User

##### Description:

Get Summary Data for User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User Information | Yes | [UserSummaryRequest](#usersummaryrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/create

#### POST
##### Summary:

Create a App

##### Description:

Create a App for the user defined

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCreationRequest](#appcreationrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/summary

#### POST
##### Summary:

Get Summary Data for App

##### Description:

Get Summary Data for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppSummaryRequest](#appsummaryrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/api/createToken

#### POST
##### Summary:

Get Summary Data for App

##### Description:

Get Summary Data for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppTokenAPIRequest](#apptokenapirequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/add

#### POST
##### Summary:

Create a Game in App Name

##### Description:

Create a Game for the App defined

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| game | body | Game Information | Yes | [GameCreationRequest](#gamecreationrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/bet/place

#### POST
##### Summary:

Place a Bet

##### Description:

Place a Bet for User Selected

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Bet Information | Yes | [PlaceBetRequest](#placebetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/get

#### POST
##### Summary:

Get a game

##### Description:

Get a Game Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Game Information | Yes | [GameGetRequest](#gamegetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/bet/resolve

#### POST
##### Summary:

Place a Bet

##### Description:

Place a Bet for User Selected

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Bet Information | Yes | [ResolveBetRequest](#resolvebetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /deposit/generateReference

#### POST
##### Summary:

Create a Deposit Reference

##### Description:

Create a Deposit Reference for given CryptoCurrency

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| deposit | body | Deposit Reference Information | Yes | [GenerateReferenceRequest](#generatereferencerequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /deposit/{id}/confirm

#### POST
##### Summary:

Confirm Deposit Creatione

##### Description:

Confirm Deposit Creation for given Crypto / PayBear

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Deposit Id Paybear Callback | Yes | string |
| deposit | body | Deposit Reference Information | Yes | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /deposit/{id}/info

#### POST
##### Summary:

Get info Deposit

##### Description:

Info Deposit Creation for given Crypto / PayBear

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Deposit Id Paybear Callback | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /swagger

### Models


#### AdminRegisterRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID
 | Yes |
| name | string | User Real Name
 | Yes |
| email | string | User Email
 | Yes |
| hash_password | string | Password Hased
 | No |

#### UserRegisterRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID
 | Yes |
| name | string (name) | User Real Name
 | Yes |
| email | string (email) | User Email
 | Yes |

#### UserLoginRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID
 | Yes |
| password | password | User Password Encrypted
 | Yes |

#### UserSummaryRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| type | string (name) | Type of Summary Data
 | Yes |
| user | string (name) | User ID
 | Yes |

#### AppCreationRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string (name) | App Name
 | Yes |
| description | string (description) | App Description
 | Yes |
| marketType | integer | Market Mapping Number
 | Yes |
| metadataJSON | string | Metadata JSON Object
 | Yes |
| admin_id | string | Admin Id
 | Yes |

#### GameGetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (name) | Game Id
 | Yes |

#### AppSummaryRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| type | string (name) | App Name
 | Yes |
| app | string (name) | App ID
 | Yes |

#### AppTokenAPIRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID
 | Yes |

#### GameCreationRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string | Game Name
 | Yes |
| edge | integer | Edge for Each Bet (Money Put Aside for the App as a Fee)
 | Yes |
| marketType | integer | Market Type - Example "CoinFlip" = 1
 | Yes |

#### ResolveBetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| bet | string (string) | Bet Id
 | Yes |

#### PlaceBetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user | string (string) | User Id
 | Yes |
| app | string (string) | App Id
 | Yes |
| betAmount | integer | Bet Amount for Betting Action
 | Yes |
| game | string (string) | App User Id
 | Yes |
| result | [ integer ] | Win Outcome Amount
 | Yes |

#### GenerateReferenceRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| entityType | string (name) | Type of Entity
 | Yes |
| user_external_id | string (name) | User External _id
 | Yes |
| currency | string (name) | Currency Small Identificator ["btc", "eth", etc..]
 | Yes |
| username | string (name) | Username of Email of the User
 | Yes |
| full_name | string (name) | Full Name of the User
 | Yes |
| name | string (name) | First Name of the User
 | Yes |
| nationality | string (name) | UNICODE for Nationality like PT for Portugal
 | Yes |
| age | number (number) | User Age
 | Yes |
| email | string (name) | User Email
 | Yes |
| app_id | string (name) | Company id for API Use 
 | Yes |

#### GeneralResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object (data) | Unique identifier of the user, besides the ID
 | Yes |
| meta | object (meta) | User Real Name
 | Yes |

#### ErrorResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| message | string |  | Yes |