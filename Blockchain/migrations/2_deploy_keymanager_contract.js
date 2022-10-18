const KeyManagerContract = artifacts.require("KeyManagerContract");

module.exports = function (deployer){
    deployer.deploy(KeyManagerContract);
}