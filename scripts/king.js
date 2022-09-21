//0x3EbFBB071283CfdD760A827316d627BeABBAcefc

const King = artifacts.require("King");

module.exports = async (callback) => {
  const web3 = King.web3;
  try {
    const kingAddress = "0xa14f59d9a2927a2cF96157CBD19759298eA6821f";
    const king = await King.at(kingAddress);
    let currentKing = await king._king();
    console.log("Current king:", currentKing);
    let prize = await king.prize();
    console.log("Current Prize:", Number(prize));
    console.log("done.");
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
