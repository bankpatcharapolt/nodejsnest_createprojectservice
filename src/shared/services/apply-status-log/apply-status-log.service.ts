import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import to from 'await-to-js';
import * as moment from 'moment';

import { CreateLogDto } from './../../dto';
import {
  ApplyStatusLogSchemaName,
  ApplyStatusLogDocument,
  ApplyStatusLogItemSchemaName,
  ApplyStatusLogItemDocument,
} from './../../schemas';

import { TimeService } from './../time/time.service';

@Injectable()
export class ApplyStatusLogService {
  logger = new Logger(ApplyStatusLogService.name);

  constructor(
    @InjectModel(ApplyStatusLogSchemaName)
    private applyStatusLogModel: Model<ApplyStatusLogDocument>,
    @InjectModel(ApplyStatusLogItemSchemaName)
    private applyStatusLogItemModel: Model<ApplyStatusLogItemDocument>,
    private timeService: TimeService,
  ) {}

  async add(createLogDto: CreateLogDto): Promise<boolean> {
    const {
      refType,
      refID,
      createdBy,
      action,
      remark,
      ipAddress,
    } = createLogDto;

    const [errorFindData, resultFindData] = (await to(
      this.applyStatusLogModel
        .findOne({
          ref_type: refType,
          ref_id: refID,
        })
        .exec(),
    )) as [any, any];
    if (errorFindData) {
      this.logger.error(
        'Add Apply Status Log Error - Find log Error',
        errorFindData.message,
      );
      return false;
    }

    const createdTime = this.timeService.getCurrentFullDateTime();
    let errDetailMessage = '';
    let errorSaveData: any;

    const newItem = new this.applyStatusLogItemModel({
      created_at: createdTime,
      created_by: createdBy,
      action,
      remark,
      ip_address: ipAddress,
    });

    if (resultFindData) {
      resultFindData.last_created_at = createdTime;
      resultFindData.last_created_by = createdBy;
      resultFindData.items.push(newItem);
      [errorSaveData] = await to(resultFindData.save());
      if (errorSaveData) {
        errDetailMessage = 'Update Log Error';
      }
    } else {
      const newData = new this.applyStatusLogModel({
        ref_type: refType,
        ref_id: refID,
        last_created_at: createdTime,
        last_created_by: createdBy,
        items: [newItem],
      });

      [errorSaveData] = await to(newData.save());
      if (errorSaveData) {
        errDetailMessage = 'Add New Log Error';
      }
    }
    if (errorSaveData) {
      this.logger.error(
        `Add Apply Status Log Error - ${errDetailMessage}`,
        errorSaveData.message,
      );
      return false;
    }

    return true;
  }
}
