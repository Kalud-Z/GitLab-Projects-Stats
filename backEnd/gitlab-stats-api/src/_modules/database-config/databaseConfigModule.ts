import {Global, Module} from '@nestjs/common';
import {databseConfigProviders} from './databseConfigProviders';


@Global()
@Module({
    providers: [ ...databseConfigProviders ],
    exports:   [ ...databseConfigProviders ]
})

export class DatabaseConfigModule {

  constructor() {
  }

}
