const Web3 = require('web3');
const MyContract = require('./build/contracts/DocumentsCertifiedContract.json');
const config = require('config');
const address = config.get('wallet.address');
const privateKey = config.get('wallet.privateKey');

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
        id: await myContract.methods.documentCounter().call() -1,
        hash: receipt.transactionHash
    }
}

const getDocument = async (id) => {
    const web3 = new Web3('http://127.0.0.1:7545');
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );
    return {
        documentHash: await myContract.methods.documents(id).call()
    }
}
module.exports = {uploadDocument, getDocument}