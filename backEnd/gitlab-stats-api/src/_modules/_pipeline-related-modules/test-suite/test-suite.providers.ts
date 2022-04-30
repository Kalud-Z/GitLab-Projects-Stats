import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import { TestSuiteEntity } from './model/test-suite.entity';

export const TestSuiteRepositoryToken = 'TestSuiteRepositoryToken';
export const TestSuiteProviders = [
  {
    provide: TestSuiteRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(TestSuiteEntity),
    inject: [DbConnectionToken],
  },
];

