import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}
  findAll(): Promise<AlarmReadModel[]> {
    return this.alarmRepository.find();
  }
}
