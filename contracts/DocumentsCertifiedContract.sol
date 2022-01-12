// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract DocumentsCertifiedContract {
    
    uint public documentCounter = 0;

    constructor() {
        createDocument("HashDocument");
    }

     event DocumentCreated(
         uint id,
         string hashDocument
     );

    struct  Document {
        uint id;
        string hashDocument;
    }

    mapping (uint => Document) public documents;

    function createDocument(string memory _hashDocument) public{
        documents[documentCounter] = Document(documentCounter, _hashDocument);
        emit DocumentCreated(documentCounter, _hashDocument);
        documentCounter++;
         
    }
}