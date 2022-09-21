const ReentranceAttack = artifacts.require("ReentranceAttack");

module.exports = function (deployer) {
  const reentranceAddress = "0xBfC0FB665d8a9ea0D6ab0123Ae53B1D8B712e77d";
  deployer.deploy(ReentranceAttack, reentranceAddress);
};
