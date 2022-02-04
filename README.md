# Project: ETHCertifiedDoc
# Ethereum certified Documents API - ECD API

The ECD API is an application that stores the document in the IPFS service of infura, it cretates hash that is stored in a public Ethereum Blockchain.

This API contains following request:

*   Certified Document
*   Get Document Certified

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
|file|/C:/Users/dcapr/OneDrive/Documents/INNOVAAP/INNOVAAP_API/Lorem_ipsum.pdf|file|


### Response: 200
```json
{
    "id": 1,
    "hash": "0x20973e7e3471d4f2e6f90dce06a1f07572a713596f71f4f70b886e42114f0088"
}
```


## End-point: Get Document Certified
API endpoint to **Get** the certify document

> A successful registration will result in a **HTTP 200** status code and a json response with the document url to view the file
### Method: GET
>```
>http://localhost:8080/getDocument
>```
### Body (**raw**)

```json
{
    "id": 1
}
```

### Response: 200
```json
{
    "document": "http://ipfs.infura.io/ipfs/Qmdk3gwwrfoWif9zJ3YTahH7fGq3JgqDBR3G2kqvbAqCro"
}
```

#### Author
- [Diego Acuña Cerdas](https://github.com/DAC125)
email: [diegoacuna170@gmail.com](mailto:diegoacuna170@gmail.com)

