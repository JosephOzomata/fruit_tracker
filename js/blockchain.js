class Block {
  constructor(index, timestamp, batchId, actor, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.batchId = batchId;
    this.actor = actor;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(
      this.index +
      this.timestamp +
      this.batchId +
      this.actor +
      JSON.stringify(this.data) +
      this.previousHash
    );
  }
}

class Blockchain {
  constructor(chain = null) {
    this.chain = chain || [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date().toISOString(), "0", "SYSTEM", {}, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(batchId, actor, data) {
    const newBlock = new Block(
      this.chain.length,
      new Date().toISOString(),
      batchId,
      actor,
      data,
      this.getLatestBlock().hash
    );
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}
