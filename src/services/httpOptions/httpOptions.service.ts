import { Injectable } from '@nestjs/common';
import { NODE_ENV } from '../../common/constants/https.constants';

@Injectable()
export class HttpOptionsService {
  getHttpsOptions(): { key: string; cert: string } | undefined {
    if (process.env.NODE_ENV === NODE_ENV.development) {
      const keyPath = process.env.KEY_PEM
        ? process.env.KEY_PEM.replace(/\\n/gm, '\n')
        : undefined;
      const cerPath = process.env.SERVER_CRT
        ? process.env.SERVER_CRT.replace(/\\n/gm, '\n')
        : undefined;

      return keyPath && cerPath ? { key: keyPath, cert: cerPath } : undefined;
    }
    return undefined;
  }
}
