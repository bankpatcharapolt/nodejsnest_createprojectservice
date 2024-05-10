import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplyStatusLogItemDocument = ApplyStatusLogItem & Document;

export const ApplyStatusLogItemSchemaName = 'apply_status_log_items';

@Schema()
export class ApplyStatusLogItem {
  @Prop({ required: true })
  action: string;

  @Prop()
  remark: string;

  @Prop({ required: true })
  created_at: string;

  @Prop({ required: true })
  created_by: string;

  @Prop({ required: true })
  ip_address: string;
}

export const ApplyStatusLogItemSchema = SchemaFactory.createForClass(
  ApplyStatusLogItem,
);
