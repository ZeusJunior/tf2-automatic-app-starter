import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsRabbitService } from './friends-rabbit.service';
import { RabbitMQWrapperModule } from 'src/rabbitmq-wrapper/rabbitmq-wrapper.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RabbitMQWrapperModule, HttpModule],
  providers: [FriendsService, FriendsRabbitService],
  exports: [FriendsService],
})
export class FriendsModule {}
