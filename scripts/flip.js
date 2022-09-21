const CoinFlipper = artifacts.require("CoinFlipper");
const CoinFlip = artifacts.require("CoinFlip");

module.exports = async (callback) => {
  try {
    const coinFlipper = await CoinFlipper.deployed();
    await coinFlipper.flip();
    console.log("Flipping coin");
    const coinFlip = await CoinFlip.at(
      "0xf67278389ec701e5c84a6b2ce6b5d78e0d7e27c6"
    );
    const streak = await coinFlip.consecutiveWins();
    console.log("Winning Streak");
    console.log(streak);
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
