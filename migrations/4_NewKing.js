const NewKing = artifacts.require("NewKing");

module.exports = function (deployer) {
  deployer.deploy(NewKing, { value: "1000000000000000" });
};
