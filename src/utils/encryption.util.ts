import { pbkdf2Sync, randomBytes } from 'crypto';

export default class EncryptionUtil {
  private static ITERATIONS = 1000;
  private static KEY_LENGTH_SALT = 16;
  private static KEY_LENGTH_HASH = 64;
  private static DIGEST = 'sha512';

  static getSalt(): string {
    return randomBytes(this.KEY_LENGTH_SALT).toString('hex');
  }

  static getHash(textToHash: string, salt: string): string {
    return pbkdf2Sync(
      textToHash,
      salt,
      this.ITERATIONS,
      this.KEY_LENGTH_HASH,
      this.DIGEST,
    ).toString('hex');
  }
}
