const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');
const address = '0x053Df46f9738d3579Fd73af47f24D5d116bE4bd4';
const privateKey = '3f019c3c295eeea6e17892b5e7f1412dc64e5966d85b6d8e1801d453ef0e41bd';
const infuraURL = 'https://rinkeby.infura.io/v3/74baca13162c4824bb3cc8e1094049e4';

const init1 = async () => {
    const web3 = new Web3(infuraURL);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );
    const tx = myContract.methods.setData(1);
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
    console.log(`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction Hash: ${receipt.trasactionHash}`);
    console.log(`New data value: ${await myContract.methods.data().call()}`);
}

init1();