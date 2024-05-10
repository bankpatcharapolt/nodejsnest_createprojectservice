import { Injectable } from '@nestjs/common';

import * as moment from 'moment';

@Injectable()
export class TimeService {
  getCurrentFullDateTime(parseFormat?: string): string {
    return moment().format(parseFormat ?? process.env.DATETIME_FORMAT);
  }

  getCurrentDate(parseFormat?: string): string {
    return moment().format(parseFormat ?? process.env.DATE_FORMAT);
  }

  getCurrentTime(parseFormat?: string): string {
    return moment().format(parseFormat ?? process.env.TIME_FORMAT);
  }

  convertTime(value: string, parseFormat: string, toFormat: string): string {
    return moment(value, parseFormat).format(toFormat);
  }
}
