//0x3EbFBB071283CfdD760A827316d627BeABBAcefc

const King = artifacts.require("King");
const NewKing = artifacts.require("NewKing");

module.exports = async (callback) => {
  //console.log(Delegation.web3.eth.sendTransaction);
  const web3 = King.web3;
  try {
    const kingAddress = "0xa14f59d9a2927a2cF96157CBD19759298eA6821f";
    const king = await King.at(kingAddress);
    const newKing = await NewKing.deployed();
    let currentKing = await king._king();
    console.log("Current king:", currentKing);
    let prize = await king.prize();
    console.log("Current Prize:", Number(prize));
    // console.log("Claiming the throne...");
    // await newKing.claimThrone(kingAddress);
    // currentKing = await king._king();
    // console.log("New king:", currentKing);
    console.log("done.");
  } catch (err) {
    console.log("Oops: ", err.message);
  }

  callback();
};
