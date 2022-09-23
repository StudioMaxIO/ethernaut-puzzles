const Elevator = artifacts.require("Elevator");
const ElevatorBuilding = artifacts.require("ElevatorBuilding");

module.exports = async (callback) => {
  try {
    const elevator = await Elevator.at(
      "0x65FcCD811775B1fa9EA0D6CBC78df2d003CD9Ccb"
    );
    const elevatorBuilding = await ElevatorBuilding.deployed();
    const topFloor = await elevatorBuilding.TOP_FLOOR();
    console.log("Top floor:", Number(topFloor));

    let currentFloor = await elevator.floor();
    let isAtTop = await elevator.top();
    console.log("Current Floor:", Number(currentFloor));
    console.log("Elevator is at top:", isAtTop);

    for (let i = Number(currentFloor); i < Number(topFloor); i++) {
      const nextFloor = i + 1;
      await elevatorBuilding.goToFloor(nextFloor);
      currentFloor = await elevator.floor();
      isAtTop = await elevator.top();
      console.log("Current Floor:", Number(currentFloor));
      console.log("Elevator is at top:", isAtTop);
    }
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
