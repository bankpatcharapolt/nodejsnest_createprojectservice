import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptService {
  private joinCryptIVString = '-';
  private algorithm = 'aes-256-cbc';

  encrypt(key: string, text: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        this.algorithm,
        Buffer.from(key),
        iv,
      );
      // let encrypted = cipher.update(text);
      let encrypted = cipher.update(text, 'utf8');
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return (
        iv.toString('hex') + this.joinCryptIVString + encrypted.toString('hex')
      );
    } catch (err) {
      return null;
    }
  }

  decrypt(key: string, text: string): string {
    try {
      const splitText = text.split(this.joinCryptIVString);
      const iv = Buffer.from(splitText[0], 'hex');
      const encryptedText = Buffer.from(splitText[1], 'hex');
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        Buffer.from(key),
        iv,
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (err) {
      return null;
    }
  }

  encryptURLParam(key: string, text: string): string {
    try {
      if (!text || text.length === 0) {
        return null;
      }

      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        this.algorithm,
        Buffer.from(key),
        iv,
      );

      const encrypted = cipher.update(text, 'utf8');
      const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
      const result =
        iv.toString('hex') +
        this.joinCryptIVString +
        finalBuffer.toString('hex');

      return encodeURIComponent(result);
    } catch (err) {
      return null;
    }
  }

  decryptURLParam(key: string, text: string): string {
    try {
      if (!text || text.length === 0) {
        return null;
      }

      const [dataIv, dataText] = text.split(this.joinCryptIVString);
      const iv = Buffer.from(dataIv, 'hex');
      const encrypted = Buffer.from(dataText, 'hex');
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        Buffer.from(key),
        iv,
      );
      const decrypted = decipher.update(encrypted);
      return Buffer.concat([decrypted, decipher.final()]).toString();
    } catch (err) {
      return null;
    }
  }
}
