const express = require('express');
const upload = require('express-fileupload');
const ipfsClient = require('ipfs-http-client');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const solidityConnection = require("./solidityConnection")
const app = express();
const PORT = 8080;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Ethereum certified Documents API - ECD API',
      description: "The ECD API is an application that stores the document in the IPFS service of infura, it cretates hash that is stored in a public Ethereum Blockchain.",
      contact: {
        name: "Diego Acuña Cerdas"
      },
      servers: ["http://localhost:8080"]
    }
  },
  apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

app.use('/appi-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())
app.use(upload())

/**
 * @swagger
 * /uploadDocument:
 *  post:
 *    description: API endpoint for upload and certify documents
 *    parameters:
 *    - in: "formData"
 *      name: "file"
 *      type: "file"
 *      description: "Upload and certify document"
 *      required: true
 * 
 *    responses:
 *      '200':
 *        description: Return a json response with document id and the transaction hash
 */
app.post('/uploadDocument', (req, res) => {
  
  ipfs.add(req.files.file.data, (error, result) => {
    const documentHash = result[0].hash
    if (error) {
      console.error(error)
      return
    }
    
    solidityConnection.uploadDocument(documentHash)
    .then(result =>{
      console.log("POST   Upload Document SUCCESSFULLY")
      res.status(200).send({
          id: result.id,
          hash: result.hash
      })
    })
    

  })
});

/**
 * @swagger
 * /getDocument:
 *  get:
 *    description: API endpoint to Get the certify document
 *    parameters:
 *    - in: "body"
 *      name: "id"
 *      type: "object"
 *      description: " Gets the certify document"
 *      required: true
 * 
 *    responses:
 *      '200':
 *        description: Return a json response with document id and the transaction hash
 */

app.get('/getDocument', (req, res) => {
  solidityConnection.getDocument(req.query.id)
  .then(result =>{
    console.log("GET   Getting document by id..")
    res.status(200).send({
      document: `http://ipfs.infura.io/ipfs/${result.documentHash.hashDocument}`
    })
  })
  
});



app.listen(
  PORT,
  () => console.log(`it's alive on http://localhost:${PORT}`)
)
