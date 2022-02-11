const DocumentsCertifiedContract = artifacts.require("DocumentsCertifiedContract")

contract("DocumentsCertifiedContract", () => {

    before(async () => {
        this.documentsCertifiedContract = await DocumentsCertifiedContract.deployed()
    });


    it('Migrate deployed successfully', async () => {
        const address = this.documentsCertifiedContract.address
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('get Docoments list', async () => {
        const documentCounter = await this.documentsCertifiedContract.documentCounter()
        const document = await this.documentsCertifiedContract.documents(documentCounter - 1)
        assert.equal(document.id.toNumber(), documentCounter - 1);
        assert.equal(document.hashDocument, "HashDocument");
    });

    it('Task created successfully', async () => {
        const result = await this.documentsCertifiedContract.createDocument("HashTest");
        const documentEvent = result.logs[0].args;
        const documentCounter = await this.documentsCertifiedContract.documentCounter();

        assert.equal(documentCounter - 1, 1);
        assert.equal(documentEvent.id.toNumber(), 1);
        assert.equal(documentEvent.hashDocument, "HashTest");
    });
});