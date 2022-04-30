import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {GroupStatsEntity} from './model/groupStats.entity';

export const GroupStatsRepositoryToken = 'GroupStatsRepositoryToken';
export const GroupStatsProviders = [
  {
    provide: GroupStatsRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(GroupStatsEntity),
    inject: [DbConnectionToken],
  },
];

