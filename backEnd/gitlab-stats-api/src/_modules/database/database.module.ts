import {Global, Module} from '@nestjs/common';
import {databaseProviders} from './database.provider';
import {DatabaseConfigModule} from '../database-config/databaseConfigModule';



@Global()
@Module({
    providers: [...databaseProviders],
    imports: [DatabaseConfigModule],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
