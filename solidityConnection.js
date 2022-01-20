const Web3 = require('web3');
const MyContract = require('./build/contracts/DocumentsCertifiedContract.json');
const address = '0x8a7c5bA8035F832B1421aa9D6eC8df4FF2c815Dc';
const privateKey = 'da8125d80786fc7855e7d990701b5c41a8e69cd46c45e4fc7788f90e3889adcf';
const infuraURL = 'https://rinkeby.infura.io/v3/74baca13162c4824bb3cc8e1094049e4';

const init1 = async (hashDocument) => {
    const web3 = new Web3(infuraURL);
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
    /*console.log(`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction Hash: ${receipt.trasactionHash}`);*/
    console.log(`New data value: ${await myContract.methods.documentCounter().call()}`);
}

init1('holaa');