// wallet.js
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');

class CryptoWallet {
  constructor() {
    this.mnemonic = bip39.generateMnemonic();
    this.seed = bip39.mnemonicToSeedSync(this.mnemonic);
    this.root = bitcoin.bip32.fromSeed(this.seed);
  }

  generateAddress(index = 0) {
    const path = `m/44'/0'/0'/0/${index}`;
    const child = this.root.derivePath(path);
    const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });
    return address;
  }

  getMnemonic() {
    return this.mnemonic;
  }
}

module.exports = CryptoWallet;
