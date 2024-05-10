import { Expose } from 'class-transformer';
import * as moment from 'moment';
import * as short from 'short-uuid';

export class OpenacctAuthHeaderModel {
  @Expose({ name: 'request_id' })
  requestID: string = short.generate().trim();

  @Expose({ name: 'request_datetime' })
  requestDatetime: string = moment().format('YYYY-MM-DDTHH:mm:ss.sss');

  @Expose({ name: 'sys_id' })
  sysID: string = process.env.OPENACC_ADMIN_SYS_ID;

  @Expose({ name: 'channel' })
  channel: string = process.env.OPENACCT_CHANNEL;

  @Expose({ name: 'ipaddress' })
  ipAddress: string;

  @Expose({ name: 'userid' })
  userID: string;

  @Expose({ name: 'branchid' })
  branchID: string = '';
}
