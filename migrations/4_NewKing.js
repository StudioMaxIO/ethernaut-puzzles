const NewKing = artifacts.require("NewKing");

module.exports = function (deployer) {
  const kingAddress = "0x8f7F792e210CBEcEe783395ac9B0845C85845C4A";
  deployer.deploy(NewKing, kingAddress, { value: "1000000000000000" });
};
