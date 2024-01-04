require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/E2MUYzIfYIF7pRQQ2PaEj8KhcjXMXviK',
      accounts: ['76fd9b7d811f9129002261864466066ede95b3ea43cbb0e0b2d5d07b545e0af2'],
    },
  },
};