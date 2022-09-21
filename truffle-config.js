const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [process.env.PK_RINKEBY],
          providerOrUrl: process.env.RPC_URL_RINKEBY
        });
      },
      network_id: "4",
      skipDryRun: true
    },
    dashboard: {}
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  },
  db: {
    enabled: false,
    host: "127.0.0.1"
  }
};
