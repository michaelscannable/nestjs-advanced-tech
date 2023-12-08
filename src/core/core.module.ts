import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from './core.constants';
@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              password: 'pass123',
              username: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),

            MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
            MongooseModule.forRoot('mongodb://localhost:27018/vf-event-store', {
              // 👈 from docker-compose
              connectionName: EVENT_STORE_CONNECTION, // 👈 our new namespace for this mongodb
              directConnection: true, // 👈 needed needed to connect to local replica sets
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
