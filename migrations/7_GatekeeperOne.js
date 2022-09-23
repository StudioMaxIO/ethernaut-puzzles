const GatekeeperOneCaller = artifacts.require("GatekeeperOneCaller");

module.exports = function (deployer) {
  const gatekeeperOneAddress = "0x79562730A6eD0d175DBf54F229908d92Cf57d5eF";
  deployer.deploy(GatekeeperOneCaller, gatekeeperOneAddress);
};
