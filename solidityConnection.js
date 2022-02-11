const Web3 = require('web3');
const MyContract = require('./build/contracts/DocumentsCertifiedContract.json');
const config = require('config');
const address = config.get('wallet.address');
const privateKey = config.get('wallet.privateKey');
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(MyContract.abi);

/**
 * 
 * @param {string} hashDocument Hash of document stored in IFPS 
 * @returns {object} Retuns the transaction hash after upload in blockchain
 */
const uploadDocument = async (hashDocument) => {
    const web3 = new Web3('http://127.0.0.1:7545');
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );
    const tx = myContract.methods.createDocument(hashDocument);
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: myContract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        },
        privateKey
    );
    
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return {
        hash: receipt.transactionHash
    }
}

/**
 * 
 * @param {integer} id transactionHash 
 * @returns {object} hash docuemnt of IPFS
 */

const getDocument = async (id) => {
    const web3 = new Web3('http://127.0.0.1:7545');
    let res;
    await web3.eth.getTransaction(id, function (error, result){
        res = decoder.decodeData(result.input);
    });
        
    return {
        documentHash: res.inputs[0]
    }
}

module.exports = {uploadDocument, getDocument}