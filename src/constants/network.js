export const networks = {
  BTC: {
    coinSymbol: "BTC",
    coinName: "Bitcoin",
    derivePath: "m/44'/0'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    },
    electrumx: {
      networkName: "BitcoinSegwit",
      peers: [
        {
          host: "E-X.not.fyi",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "tardis.bauerj.eu	",
          port: 50001,
          protocol: "ssl"
        },
        {
          host: "electrumx.soon.it",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "ndnd.selfhost.eu",
          port: 50002,
          protocol: "ssl"
        }
      ]
    }
  },
  BTCTESTNET: {
    coinSymbol: "BTCTESTNET",
    coinName: "Bitcoin Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "tb",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "BitcoinSegwitTestnet",
      peers: [
        {
          host: "testnet.qtornado.com",
          port: 51001,
          protocol: "tcp"
        },
        {
          host: "testnet.qtornado.com",
          port: 51002,
          protocol: "ssl"
        },
        {
          host: "testnet.hsmiths.com",
          port: 53012,
          protocol: "ssl"
        },
        {
          host: "testnet.hsmiths.com",
          port: 53011,
          protocol: "tcp"
        }
      ]
    }
  },
  LTC: {
    coinSymbol: "LTC",
    coinName: "Litecoin",
    derivePath: "m/44'/2'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19Litecoin Signed Message:\n",
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0
    },
    electrumx: {
      networkName: "Litecoin",
      peers: [
        {
          host: "electrum-ltc.bysh.me",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "electrum.ltc.xurious.com",
          port: 50002,
          protocol: "ssl"
        }
      ]
    }
  },
  LTCTESTNET: {
    coinSymbol: "LTCTESTNET",
    coinName: "Litecoin Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Litecoin Signed Message:\n",
      bip32: {
        public: 0x0436ef7d,
        private: 0x0436f6e1
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "LitecoinTestnet",
      peers: [
        {
          host: "electrum-ltc.bysh.me",
          port: 51002,
          protocol: "ssl"
        }
      ]
    }
  },
  DASH: {
    coinSymbol: "DASH",
    coinName: "Dash",
    derivePath: "m/44'/5'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19DarkCoin Signed Message:\n",
      bip32: {
        public: 0x02fe52f8,
        private: 0x02fe52cc
      },
      pubKeyHash: 0x4c,
      scriptHash: 0x10,
      wif: 0xcc,
      dustThreshold: 5460
    },
    electrumx: {
      networkName: "Dash",
      peers: [
        {
          host: "electrum.dash.siampm.com",
          port: 50002,
          protocol: "ssl"
        }
      ]
    }
  },
  DASHTESTNET: {
    coinSymbol: "DASHTESTNET",
    coinName: "Dash Testenet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19DarkCoin Signed Message:\n",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x8c,
      scriptHash: 0x13,
      wif: 0xef
    },
    electrumx: {
      networkName: "DashTestnet",
      peers: undefined
    }
  },
  BCH: {
    coinSymbol: "BCH",
    coinName: "Bitcoin Cash",
    derivePath: "m/44'/145'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    },
    electrumx: {
      networkName: "BitcoinSegwit",
      peers: [
        {
          host: "bch0.kister.net",
          port: 50002
        },
        {
          host: "abc1.hsmiths.com",
          port: 60002
        },
        {
          host: "electrumx-bch.cryptonermal.net",
          port: 50002
        },
        {
          host: "electrum.imaginary.cash",
          port: 50002
        }
      ]
    }
  },
  BCHTESTNET: {
    coinSymbol: "BCH",
    coinName: "Bitcoin Cash Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "tb",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "BitcoinCashTestnet",
      peers: [
        {
          host: "bch0.kister.net",
          port: 51002
        }
      ]
    }
  },
  BCHSV: {
    coinSymbol: "BCHSV",
    coinName: "Bitcoin Cash SV",
    derivePath: "m/44'/145'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    },
    electrumx: {
      networkName: "BitcoinCash",
      peers: [
        {
          host: "satoshi.vision.cash",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "sv.electrumx.cash",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "electron.bitcoinsv.io",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "electroncash.cascharia.com",
          port: 50002,
          protocol: "ssl"
        }
      ]
    }
  },
  BCHSVTESTNET: {
    coinSymbol: "BCHSV",
    coinName: "Bitcoin Cash SV Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "tb",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "BitcoinCashTestnet",
      peers: [
        {
          host: "electrontest.cascharia.com",
          port: 51002,
          protocol: "ssl"
        }
      ]
    }
  },
  MONA: {
    coinSymbol: "MONA",
    coinName: "MonaCoin",
    derivePath: "m/44'/22'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19MonaCoin Signed Message:\n",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x32,
      scriptHash: 0x37,
      wif: 0xb0
    },
    electrumx: {
      networkName: "Monacoin",
      peers: [
        {
          host: "electrumx1.monacoin.ninja",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "electrumx2.monacoin.nl",
          port: 50002,
          protocol: "ssl"
        },
        {
          host: "electrumx2.tamami-foundation.org",
          port: 50001,
          protocol: "tcp"
        }
      ]
    }
  },
  MONATESTNET: {
    coinSymbol: "MONA",
    coinName: "MonaCoin Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19MonaCoin Signed Message:\n",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0x75,
      wif: 0xef
    },
    electrumx: {
      networkName: "Monacoin",
      peers: [
        {
          host: "electrumx1.testnet.monacoin.ninja",
          port: 51001,
          protocol: "tcp"
        },
        {
          host: "electrumx1.testnet.monacoin.nl",
          port: 51002,
          protocol: "ssl"
        },
        {
          host: "electrumx1.testnet.monacoin.ninja",
          port: 51002,
          protocol: "ssl"
        },
        {
          host: "electrumx1.testnet.monacoin.nl",
          port: 51001,
          protocol: "tcp"
        }
      ]
    }
  },
  NMC: {
    coinSymbol: "NMC",
    coinName: "Namecoin",
    derivePath: "m/44'/7'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19Namecoin Signed Message:\n",
      bip32: {
        public: 0x34,
        private: 0xb4
      },
      pubKeyHash: 0x34,
      scriptHash: 0x05,
      wif: 0xb4
    },
    electrumx: {
      networkName: "Namecoin",
      peers: [
        {
          host: "elec.luggs.co",
          port: 446,
          protocol: "ssl"
        },
        {
          host: "ulrichard.ch",
          port: 50006,
          protocol: "ssl"
        }
      ]
    }
  },
  NMCTESTNET: {
    coinSymbol: "NMC",
    coinName: "Namecoin",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19Namecoin Signed Message:\n",
      bip32: {
        public: 0x34,
        private: 0xb4
      },
      pubKeyHash: 0x34,
      scriptHash: 0x05,
      wif: 0xb4
    },
    electrumx: {
      networkName: "NamecoinTestnet",
      peers: undefined
    }
  },
  VTC: {
    coinSymbol: "VTC",
    coinName: "Vertcoin",
    derivePath: "m/44'/28'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19Vertcoin Signed Message:\n",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x47,
      scriptHash: 0x05,
      wif: 0x80
    },
    electrumx: {
      networkName: "Vertcoin",
      peers: [
        {
          host: "electrum-vtc.petrkr.net",
          port: 55002,
          protocol: "ssl"
        }
      ]
    }
  },
  VTCTESTNET: {
    coinSymbol: "VTC",
    coinName: "Vertcoin Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x19Vertcoin Signed Message:\n",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x4a,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "VertcoinTestnet",
      peers: undefined
    }
  },
  LUNES: {
    coinSymbol: "LUNES",
    coinName: "Lunes",
    apiUrl: "https://lunesnode.lunes.io",
    APICONFIG: {
      minimumSeedLength: 25,
      requestOffset: 0,
      requestLimit: 100,
      logLevel: "warning",
      timeDiff: 0,
      networkByte: "1".charCodeAt(0),
      nodeAddress: "https://lunesnode.lunes.io/",
      matcherAddress: "https://lunesnode.lunes.io/matcher"
    }
  },
  LUNESTESTNET: {
    coinSymbol: "LUNES",
    coinName: "Lunes",
    apiUrl: "https://lunesnode-testnet.lunes.io",
    APICONFIG: {
      minimumSeedLength: 25,
      requestOffset: 0,
      requestLimit: 100,
      logLevel: "warning",
      timeDiff: 0,
      networkByte: "0".charCodeAt(0),
      nodeAddress: "https://lunesnode-testnet.lunes.io",
      matcherAddress: "https://lunesnode-testnet.lunes.io/matcher"
    }
  },
  ETH: {
    coinSymbol: "ETH",
    coinName: "Ethereum",
    derivePath: "m/44'/60'/0'/0/0",
    gasPrice: 10000000000,
    gasLimit: 21000,
    chainID: 1,
    apiUrl: "https://api.myetherwallet.com/eth"
  },
  ROPSTEN: {
    coinSymbol: "ETH",
    coinName: "Ethereum Testnet",
    derivePath: "m/44'/60'/0'/0/0",
    gasPrice: 10000000000,
    gasLimit: 21000,
    chainID: 3,
    apiUrl: "https://api.myetherwallet.com/rop"
  },
  USDT: {
    coinSymbol: "USDT",
    coinName: "Tether MainNet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Tether Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    }
  },
  USDTTESTNET: {
    coinSymbol: "USDTTESTNET",
    coinName: "Tether Testnet",
    derivePath: "m/44'/1'/0'/0",
    bitcoinjsNetwork: {
      messagePrefix: "\x18Tether Signed Message:\n",
      bech32: "tb",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    }
  }
};
