const Force = artifacts.require("Force");

module.exports = function (deployer) {
  const receiver = "0xD9C61eA2c6Ca94C8dD1dD85Ed364B0C05Ba811C0";
  deployer.deploy(Force, receiver);
};
