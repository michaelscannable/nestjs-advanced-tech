import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

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
              password: 'scannableDB123',
              username: 'scannableDB',
              autoLoadEntities: true,
              synchronize: true,
              database: 'nest',
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
