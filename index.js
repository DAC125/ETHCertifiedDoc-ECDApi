const express = require('express');
const upload = require('express-fileupload');
const ipfsClient = require('ipfs-http-client');
const solidityConnection = require("./solidityConnection")
const app = express();
const PORT = 8080;
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

app.use(express.json())
app.use(upload())


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


app.listen(
  PORT,
  () => console.log(`it's alive on http://localhost:${PORT}`)
)
