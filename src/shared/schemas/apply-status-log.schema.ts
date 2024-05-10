import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  ApplyStatusLogItemSchema,
  ApplyStatusLogItem,
} from './apply-status-log-item.schema';

export type ApplyStatusLogDocument = ApplyStatusLog & Document;

export const ApplyStatusLogSchemaName = 'apply_status_logs';

@Schema()
export class ApplyStatusLog {
  @Prop({ required: true })
  ref_type: string;

  @Prop({ required: true })
  ref_id: string;

  @Prop({ required: true })
  last_created_at: string;

  @Prop({ required: true })
  last_created_by: string;

  @Prop({ type: [ApplyStatusLogItemSchema], default: [] })
  items: ApplyStatusLogItem[];
}

export const ApplyStatusLogSchema = SchemaFactory.createForClass(
  ApplyStatusLog,
);
