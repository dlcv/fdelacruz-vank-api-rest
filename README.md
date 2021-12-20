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

#### GET /api/v1/invoice/{currency}
Get all the invoices registered on the API. You must send (optionally) in the request body this fields for filter:
```sh
{
    "vendorId": "34",
    "minInvoiceDate": "2021-12-19",
    "minInvoiceDate": "2021-12-20",
}
```
and optionally the value of currency in the URL (only USD, EUR or CLP)