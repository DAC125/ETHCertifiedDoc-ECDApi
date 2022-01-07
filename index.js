const express = require('express');
const upload = require('express-fileupload');
const ipfsClient = require('ipfs-http-client');
const app = express();
const PORT = 8080;
var ha = "";

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 

app.use(express.json())
app.use(upload())


app.post('/doc', (req, res) => {
    ipfs.add(req.files.file.data, (error, result) => {
        const documentHash = result[0].hash
        if(error){
          console.error(error)
          return
        }
        res.status(200).send({
            hash: `https://ipfs.infura.io/ipfs/${documentHash}`
        })
  
      })
});


app.listen(
    PORT,
    //() => console.log(`it's alive on http://localhost:${PORT}`)
)
