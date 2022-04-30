import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {PipelineEntity} from './model/pipeline.entity';

export const PipelineRepositoryToken = 'PipelineRepositoryToken';
export const PipelineProviders = [
  {
    provide: PipelineRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(PipelineEntity),
    inject: [DbConnectionToken],
  },
];

