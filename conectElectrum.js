// electrum.js
const ElectrumClient = require('electrum-client');

class ElectrumInterface {
  constructor(host = 'electrumx-server.tld', port = 50001, protocol = 'tcp') {
    this.client = new ElectrumClient(port, host, protocol);
  }

  async connect() {
    await this.client.connect();
    return this.client.server_version('1.4', '1.4.2');
  }

  async getBalance(address) {
    const script = bitcoin.address.toOutputScript(address);
    const hash = bitcoin.crypto.sha256(script);
    const reversedHash = Buffer.from(hash.reverse());
    const result = await this.client.blockchainScripthash_getBalance(reversedHash.toString('hex'));
    return result;
  }

  async disconnect() {
    return this.client.close();
  }
}

module.exports = ElectrumInterface;
