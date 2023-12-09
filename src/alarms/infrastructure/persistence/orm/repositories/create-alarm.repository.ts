import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlarmRepository } from '../../../../application/ports/create-alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { Logger } from '@nestjs/common';

@Injectable()
export class OrmCreateAlarmRepository implements CreateAlarmRepository {
  private readonly logger = new Logger(OrmCreateAlarmRepository.name);
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    this.logger.log(`New alarm created with id: ${newEntity.id}`);

    return AlarmMapper.toDomain(newEntity);
  }
}
