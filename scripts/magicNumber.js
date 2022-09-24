/*
Runtime Opcodes
// mstore(offset,value)
PUSH1 0x2a // 6042 // push value
PUSH1 0 // 6000 // push offset
MSTORE // 52 // store p,v
// return(offset, size)
PUSH1 0x20 // 6020 // 32 bytes size
PUSH1 0 // 6000 // offset
RETURN // f3
602a60005260206000f3

Initialization Opcodes
// codecopy(dataOffset, offset, size)
PUSH1 0x0a // 600a // 10 bytes
PUSH1 ?? // 60?? // current position of current runtime opcodes
PUSH1 0x00 // 6000 // memory index 0
CODECOPY // 39

// return(offset, size)
PUSH1 0x0a // 600a // runtime opcode length
PUSH1 0x00 // 6000 // memory index 0
RETURN // f3

600a60??600039600a6000f3 = 12 bytes == 0x0c
replace ?? with this value
600a600c600039600a6000f3

Runtime + Initialization bytecode:
600a600c600039600a6000f3602a60005260206000f3
*/
// Playground for testing: https://www.evm.codes/playground
// evm code reference: https://www.evm.codes/?fork=grayGlacier

const MagicNumber = artifacts.require("MagicNum");
const MagicNumberSolver = artifacts.require("MagicNumberSolver");
const web3 = MagicNumber.web3;

module.exports = async (callback) => {
  const accounts = await web3.eth.getAccounts();
  try {
    const magicNumber = await MagicNumber.at(
      "0xbA067488984b7F3959E463a0f1a311e8f5BbC1CE"
    );
    let bytecode = "600a600c600039600a6000f3602a60005260206000f3";
    let tx = await web3.eth.sendTransaction({
      data: bytecode,
      from: accounts[0]
    });
    //console.log(tx);
    const solverAddress = tx.contractAddress;
    const magicNumberSolver = await MagicNumberSolver.at(solverAddress);
    await magicNumber.setSolver(solverAddress);
    const meaningOfLife = await magicNumberSolver.whatIsTheMeaningOfLife();
    console.log("The meaning of life is:", Number(meaningOfLife));
    console.log("All set");
  } catch (err) {
    console.log("Oops: ", err.message);
  }
  callback();
};
