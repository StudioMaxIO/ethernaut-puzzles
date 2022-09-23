const NaughtCoin = artifacts.require("NaughtCoin");
const web3 = NaughtCoin.web3;
module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const account2 = await web3.eth.accounts.create();
  try {
    const naughtCoin = await NaughtCoin.at(
      "0xc2335DaacDc42F6808683137B3A2f6D61809207F"
    );
    let balance = await naughtCoin.balanceOf(account);
    console.log("Balance:", web3.utils.fromWei(balance, "ether"));
    console.log("Approving account to spend balance");
    await naughtCoin.approve(account, balance);
    console.log("Transferring from account to another account");
    await naughtCoin.transferFrom(account, account2.address, balance);
    balance = await naughtCoin.balanceOf(account);
    console.log("New balance:", web3.utils.fromWei(balance, "ether"));
    balance = await naughtCoin.balanceOf(account2.address);
    console.log("Account 2 balance:", web3.utils.fromWei(balance, "ether"));
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
