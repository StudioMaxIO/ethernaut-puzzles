const Force = artifacts.require("Force");

module.exports = async (callback) => {
  //const addressToPay = "0xD9C61eA2c6Ca94C8dD1dD85Ed364B0C05Ba811C0";
  const web3 = Force.web3;
  const accounts = await web3.eth.getAccounts();
  try {
    const force = await Force.deployed();
    console.log("Attempting value transfer of 0.01 ETH...");
    console.log("Force address:", force.address);
    console.log("Adding value to contract");
    await force.addValue({ value: web3.utils.toWei("0.01", "ether") });
    console.log("Self destructing");
    await force.selfDestruct();
    console.log("Done");
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
