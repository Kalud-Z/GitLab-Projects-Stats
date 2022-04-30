import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {PipelineStatsEntity} from './model/pipeline-stats.entity';

export const PipelineStatsRepositoryToken = 'PipelineStatsRepositoryToken';
export const PipelineStatsProviders = [
  {
    provide: PipelineStatsRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(PipelineStatsEntity),
    inject: [DbConnectionToken],
  },
];

