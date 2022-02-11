// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract DocumentsCertifiedContract {
    
    uint public documentCounter = 0;
    string documentHash;

    constructor() {
        createDocument("HashDocument");
    }

     event DocumentCreated(
         string hashDocument
     );

  
    function createDocument(string memory _hashDocument) public{
        documentHash = _hashDocument;
        emit DocumentCreated(_hashDocument);
         
    }
}