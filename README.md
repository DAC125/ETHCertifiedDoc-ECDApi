# Ethereum certified Documents API - ECD API

The ECD API is an application that stores the document in the IPFS service of infura, it cretates hash that is stored in a public Ethereum Blockchain.

This API contains following request:

*   Certified Document
*   Get Document Certified

## Run, install and test the API for developer environment
Install [Ganache Truffle Suite](https://trufflesuite.com/ganache/)

Set the address and private key from ganacha un config file in
```
config/default.json
```
Install all needed modules
```
npm install
```
run api 
```
node index.js
```
To test and try api, go to the [documentation](http://localhost:8080/api-docs) api.

## End-point: Certified Document
API endpoint for **upload** and **certify** documents

> A successful registration will result in a **HTTP 200** status code and a json response with document id and the transaction hash
### Method: POST
>```
>http://localhost:8080/uploadDocument
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|file|/Lorem_ipsum.pdf|file|


### Response: 200
```json
{
    "transactionHash": "0x438cc086c7452003b2b9795e57fd4c46ca86cdb7de5499e1d75c21cf2eb52ffb"
}
```


## End-point: Get Document Certified
API endpoint to **Get** the certify document

> A successful registration will result in a **HTTP 200** status code and a json response with the document url to view the file
### Method: GET
>```
>http://localhost:8080/getDocument?id=0x438cc086c7452003b2b9795e57fd4c46ca86cdb7de5499e1d75c21cf2eb52ffb
>```
### Query Params

|Param|value|
|---|---|
|id|0x438cc086c7452003b2b9795e57fd4c46ca86cdb7de5499e1d75c21cf2eb52ffb|


### Response: 200
```json
{
    "document": "http://ipfs.infura.io/ipfs/Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro"
}
```


#### Author
- [Diego Acuña Cerdas](https://github.com/DAC125)

    email: [diegoacuna170@gmail.com](mailto:diegoacuna170@gmail.com)

