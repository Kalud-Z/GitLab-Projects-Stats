import { Connection } from 'typeorm';
import { DbConnectionToken } from '../../database/database.provider';
import { TestCaseEntity } from './model/test-case.entity';

export const TestCaseRepositoryToken = 'TestCaseRepositoryToken';
export const TestCaseProviders = [
  {
    provide: TestCaseRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(TestCaseEntity),
    inject: [DbConnectionToken],
  },
];

