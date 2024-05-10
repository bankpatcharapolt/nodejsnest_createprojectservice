import { Expose } from 'class-transformer';

export class LoginResultActionModel {
  @Expose({ name: 'actionid' })
  id: string;

  @Expose({ name: 'actionname' })
  name: string;
}
