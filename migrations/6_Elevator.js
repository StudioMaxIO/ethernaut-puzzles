const ElevatorBuilding = artifacts.require("ElevatorBuilding");

module.exports = function (deployer) {
  const elevatorAddress = "0x65FcCD811775B1fa9EA0D6CBC78df2d003CD9Ccb";
  deployer.deploy(ElevatorBuilding, elevatorAddress);
};
