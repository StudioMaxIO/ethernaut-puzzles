const TelephoneCall = artifacts.require("TelephoneCall");
const Telephone = artifacts.require("Telephone");

module.exports = async (callback) => {
  try {
    const call = await TelephoneCall.deployed();
    await call.changeOwner("0x9039D388Dff1dDf1fd48490611dc1f269C16A63b");
    console.log("Changing Owner...");
    const telephone = await Telephone.at(
      "0xf8CB93CcE124C0fCe48b823B77a48E50d859ef90"
    );
    const owner = await telephone.owner();
    console.log("Owner", owner);
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
