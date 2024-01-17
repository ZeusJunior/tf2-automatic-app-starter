import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TradesModule } from './trades/trades.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      ignoreEnvFile: true,
    }),
    TradesModule,
    FriendsModule,
  ],
})
export class AppModule {}
