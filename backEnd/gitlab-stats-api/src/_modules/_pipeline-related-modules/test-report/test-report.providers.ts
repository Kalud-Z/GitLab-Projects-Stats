import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {TestReportEntity} from './model/test-report.entity';

export const TestReportRepositoryToken = 'TestReportRepositoryToken';
export const TestReportProviders = [
  {
    provide: TestReportRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(TestReportEntity),
    inject: [DbConnectionToken],
  },
];

