import { Expose, Type } from 'class-transformer';
import { LoginResultActionModel } from './login-result-action.model';

export class LoginResultModel {
  @Expose({ name: 'branch' })
  accessBranchID: string;

  @Expose({ name: 'ownerbranch' })
  ownerBranchID: string;

  @Expose()
  isIC: string;

  @Type(() => LoginResultActionModel)
  actions: LoginResultActionModel[] = [];
}
