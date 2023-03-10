import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class MyBlock implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = MyBlock.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = crypto
      .createHash("sha256")
      .update(`${prevHash}${height}${data}`)
      .digest("hex");
    return toHash;
  }
}
