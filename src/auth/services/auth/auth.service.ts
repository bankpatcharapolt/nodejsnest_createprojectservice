import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { classToPlain, plainToClass } from 'class-transformer';
import * as jwt from 'jsonwebtoken';



import { LoginDto } from './../../dto';
import { LoginResultModel } from './../../models';

@Injectable()
export class AuthService {
  sysID = process.env.OPENACC_ADMIN_SYS_ID;
  channel = process.env.OPENACCT_CHANNEL;

  constructor(private httpService: HttpService) {}


  checkToken(token: string): boolean {
    const tokenPayload: any = jwt.decode(token);
    if (!tokenPayload || !tokenPayload.exp) {
      return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > tokenPayload.exp) {
      return false;
    }

    return true;
  }
}
