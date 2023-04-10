const defaultConfig = {
  lighthouseAPI: 'https://back-test.lighthouse.storage',
  lighthouseNode: 'https://node-test.lighthouse.storage',
  lighthouseGateway: 'https://gateway.lighthouse.storage',
  lighthouseBLSNode: 'https://encryption.lighthouse.storage',
  network: 'polygon',
  fantom: {
    symbol: 'FTM',
    rpc: 'https://rpc.ftm.tools/',
    scan: 'https://ftmscan.com/tx/',
    chain_id: '250',
    lighthouse_contract_address: '0xf468602B34C482f34ca498D9a0DE7957539961d3',
    usdt_contract_address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
    usdc_contract_address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    dai_contract_address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
    usd_contract_decimal: 6,
    dai_contract_decimal: 18,
  },
  polygon: {
    symbol: 'MATIC',
    rpc: 'https://polygon-rpc.com',
    scan: 'https://polygonscan.com/tx/',
    chain_id: '137',
    lighthouse_contract_address: '0xaD13C488b01DbcE976B67e552Bd352e824E53E1D',
    usdt_contract_address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    usdc_contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    dai_contract_address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    usd_contract_decimal: 6,
    dai_contract_decimal: 18,
  },
  binance: {
    symbol: 'BNB',
    rpc: 'https://bsc-dataseed.binance.org/',
    scan: 'https://bscscan.com/tx/',
    chain_id: '56',
    lighthouse_contract_address: '0x340ff23c060626644e55fc10298c5e995b1f41c1',
    usdt_contract_address: '0x55d398326f99059fF775485246999027B3197955',
    usdc_contract_address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    dai_contract_address: '0x1dC56F2705Ff2983f31fb5964CC3E19749A7CBA7',
    usd_contract_decimal: 18,
    dai_contract_decimal: 18,
  },
  optimism: {
    symbol: 'ETH',
    rpc: 'https://mainnet.optimism.io',
    scan: 'https://optimistic.etherscan.io/tx/',
    chain_id: '10',
    lighthouse_contract_address: '0x61e296fdc8c498ed183a2d19fd5927736e46e3b6',
    usdt_contract_address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    usdc_contract_address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    dai_contract_address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    usd_contract_decimal: 6,
    dai_contract_decimal: 18,
  },
  'fantom-testnet': {
    symbol: 'FTM',
    rpc: 'https://rpc.testnet.fantom.network/',
    scan: 'https://testnet.ftmscan.com/tx/',
    chain_id: '0xfa2',
    lighthouse_contract_address: '0xa02d3813b7334057dDbDa6Fe559b90280078bAD9',
  },
  'polygon-testnet': {
    symbol: 'MATIC',
    rpc: 'https://rpc-mumbai.maticvigil.com/',
    scan: 'https://mumbai.polygonscan.com/tx/',
    chain_id: '80001',
    lighthouse_contract_address: '0x90c5ab8d2418a3855dBAFd8131bf0274f6Ea431F',
    deposit_contract_address: '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866',
    usdc_contract_address: '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7',
    usd_contract_decimal: 6,
  },
  'binance-testnet': {
    symbol: 'BNB',
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    scan: 'https://testnet.bscscan.com/tx/',
    chain_id: '97',
    lighthouse_contract_address: '0x53f4a7d35AcDc5024587c5fA1E3bEcC6233888E9',
  },
  'optimism-testnet': {
    symbol: 'ETH',
    rpc: 'https://kovan.optimism.io/',
    scan: 'https://kovan-optimistic.etherscan.io/tx/',
    chain_id: '69',
    lighthouse_contract_address: '0x61e296fdc8c498ed183a2d19fd5927736e46e3b6',
  },
  'wallaby-testnet': {
    symbol: 'tFIL',
    rpc: 'https://wallaby.node.glif.io/rpc/v0',
    scan: 'https://explorer.glif.io/',
    chain_id: '31415',
    lighthouse_contract_address: '0x3C89b0a447A30b785CaF97791C9f9F60F7069C05',
  },
}
const typed = defaultConfig as {
  [key: string]: string | number | any
}

export { typed as lighthouseConfig, defaultConfig }
