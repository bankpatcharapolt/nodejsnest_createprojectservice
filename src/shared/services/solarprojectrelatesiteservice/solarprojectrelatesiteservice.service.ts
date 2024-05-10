import { Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { AxiosRequestConfig } from 'axios';

import { UserDataDto } from '../../dto/user-data.dto';
import { OpenacctAuthHeaderModel } from '../../models';

@Injectable()
export class SolarProjectRelateSiteService {
  protected getHeaderConfig(
    userData: UserDataDto,
    channel: string = process.env.OPENACCT_CHANNEL,
  ): AxiosRequestConfig {
    const openacctAuthHeader = new OpenacctAuthHeaderModel();
    openacctAuthHeader.ipAddress = userData.ipAddress;
    openacctAuthHeader.userID = userData.userID;
    openacctAuthHeader.branchID = userData.accessBranchID;
    openacctAuthHeader.channel = channel;

    return {
      headers: { ...classToPlain(openacctAuthHeader) },
    };
  }

  getUserData(req: any, setAccessBranch: string = null): UserDataDto {
    const { user, ip } = req;
    const { refID, accessBranchID, ownerBranchID } = user;
    return {
      userID: refID,
      accessBranchID: setAccessBranch ? setAccessBranch : accessBranchID,
      ownerBranchID: ownerBranchID,
      ipAddress: ip,
    };
  }
}
