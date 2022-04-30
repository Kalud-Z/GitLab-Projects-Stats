// import {Connection} from 'typeorm';
// import {DbConnectionToken} from '../../database/database.provider';
// import {GroupInfoEntity} from './model/group-info.entity';
//
// export const GroupInfoRepositoryToken = 'GroupInfoRepositoryToken';
// export const LastUpdatedDateProviders = [
//   {
//     provide: GroupInfoRepositoryToken,
//     useFactory: (connection: Connection) => connection.getRepository(GroupInfoEntity),
//     inject: [DbConnectionToken],
//   },
// ];
//
