const TelephoneCall = artifacts.require("TelephoneCall");

module.exports = function (deployer) {
  deployer.deploy(TelephoneCall);
};
