import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MaterializedAlarmView {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  severity: string;

  @Prop()
  triggeredAt: Date;

  @Prop()
  isAcknowledged: boolean;

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  })
  items: {
    id: string;
    name: string;
    type: string;
  }[];
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
  MaterializedAlarmView,
);
