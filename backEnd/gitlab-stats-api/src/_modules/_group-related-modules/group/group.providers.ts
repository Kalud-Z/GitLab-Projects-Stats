import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {GroupEntity} from './model/group.entity';

export const GroupRepositoryToken = 'GroupRepositoryToken';
export const GroupProviders = [
  {
    provide: GroupRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(GroupEntity),
    inject: [DbConnectionToken],
  },
];

