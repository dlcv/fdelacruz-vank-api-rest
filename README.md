# Vank API challenge

###### Developed by Francisco De La Cruz
###### Last update: 20/12/2021

## Install

Run command _npm install_ to install dependencies

## Execution

Run command _node server/server_ to execute

## Endpoints

#### GET /
Returns welcome message and a valid token for operate with the other endpoints.
You must send in the request header the key **x-api-key** with the value **123456**, if you don't send it you can't get the token.

The token is in the response header, you must get it and send it in the header of the others request's endpoints.

#### POST /api/v1/client/
Create a new client on the API. You must send in the request body this fields:
```sh
{
    "companyName": "name",
    "internalCode": "123",
    "taxId": "456",
    "currency": "USD",
    "apiQuota": 100,
    "banks": [
        1,
        2,
        3
    ]
}
```

And the header must contain a valid token value.

The request body have validations:
- **companyName** is a string: cannot be null or empty, the string lenght must be between 2 and 50 characters
- **internalCode** is a string: cannot be null or empty, the string lenght must be between 2 and 10 characters
- **taxId** is a string: cannot be null or empty, the string lenght must be between 2 and 10 characters
- **currency** is a string: cannot be null or empty, the string lenght must be 3 characters and only USD, EUR or CLP are valid values
- **apiQuota** is a numeric: cannot be null or empty, the value must be between 1 and 100 requests
- **banks** is a array of numeric values: cannot be null or empty, the value of the each element of the array must be unsigned and greather than zero


#### GET /api/v1/client/
Get all the clients registered on the API.

The header must contain a valid token value.

#### GET /api/v1/client/{id}
Get one the clients registered on the API searching by his ID.

The header must contain a valid token value.

#### PUT /api/v1/client/{id}
Update one of the client registered on the API searching by his ID. You must send in the request body this fields:
```sh
{
    "taxId": "456",
    "currency": "USD"
}
```

The header must contain a valid token value.

The request body have validations:
- **taxId** is a string: cannot be null or empty, the string lenght must be between 2 and 10 characters
- **currency** is a string: cannot be null or empty, the string lenght must be 3 characters and only USD, EUR or CLP are valid values

#### GET /api/v1/invoice/
Get all the invoices registered on the API. You must send (optionally) in the request body this fields for filter:
```sh
{
    "vendorId": "34",
    "minInvoiceDate": "2021-12-19",
    "maxInvoiceDate": "2021-12-20",
}
```

The header must contain a valid token value.

The request body have validations:
- **vendorId** is a numeric or string value: cannot be null or empty, the value must be greater than zero
- **minInvoiceDate** is a string with date format: cannot be null or empty, the string lenght must be 10 characters and have the format YYYY-MM-DD
- **maxInvoiceDate** is a string with date format: cannot be null or empty, the string lenght must be 10 characters and have the format YYYY-MM-DD

## Env variables
You must set the values of the environment variables, in the root of the project you can find a file called **.env.example** for setting up your own .env file locally

## Postman collection
https://www.getpostman.com/collections/3a85bdb288b40eb2e367

## Live demo
https://fdelacruz-vank-api.herokuapp.com/

## To-do
- Currency convertion
- Documentation in OpenAPI
- TDD