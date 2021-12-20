# Vank API challenge

###### Developed by Francisco De La Cruz
###### Last update: 20/12/2021

## Install

Run command _npm install_ to install dependencies

## Execution

Run command _node server/server_ to execute

## Endpoints

#### GET /
Returns welcome message

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

The request body have validations:
- **companyName** is a string: cannot be null or empty, the string lenght must be between 2 and 50 characters
- **internalCode** is a string: cannot be null or empty, the string lenght must be between 2 and 10 characters
- **taxId** is a string: cannot be null or empty, the string lenght must be between 2 and 10 characters
- **currency** is a string: cannot be null or empty, the string lenght must be 3 characters and only USD, EUR or CLP are valid values
- **apiQuota** is a numeric: cannot be null or empty, the value must be between 1 and 100 requests
- **banks** is a array of numeric values: cannot be null or empty, the value of the each element of the array must be unsigned and greather than zero


#### GET /api/v1/client/
Get all the clients registered on the API

#### GET /api/v1/client/{id}
Get one the clients registered on the API searching by his ID

#### PUT /api/v1/client/{id}
Update one of the client registered on the API searching by his ID. You must send in the request body this fields:
```sh
{
    "taxId": "456",
    "currency": "USD"
}
```

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

The request body have validations:
- **vendorId** is a numeric or string value: cannot be null or empty, the value must be greater than zero
- **minInvoiceDate** is a string with date format: cannot be null or empty, the string lenght must be 10 characters and have the format YYYY-MM-DD
- **maxInvoiceDate** is a string with date format: cannot be null or empty, the string lenght must be 10 characters and have the format YYYY-MM-DD

## Env variables
You must set the values of the environment variables, in the root of the project you can find a file called **.env.example** for setting up your own .env file

## Postman collection
https://go.postman.co/workspace/My-Workspace~e62cc64f-30bc-4453-8b5b-a1087ea67283/collection/13375672-e15090e7-ae97-4196-a188-48bab31d4cb2

## Live demo
https://fdelacruz-vank-api.herokuapp.com/

## To-do
- Currency convertion
- Documentation in OpenAPI