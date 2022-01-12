const DocumentsCertifiedContract = artifacts.require("DocumentsCertifiedContract");

module.exports = function (deployer) {
  deployer.deploy(DocumentsCertifiedContract);
};
