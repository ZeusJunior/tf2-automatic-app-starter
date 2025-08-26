import { Module } from '@nestjs/common';
import { TradesRabbitService } from './trades-rabbit.service';
import { TradesService } from './trades.service';
import { RabbitMQWrapperModule } from 'src/rabbitmq-wrapper/rabbitmq-wrapper.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RabbitMQWrapperModule, HttpModule],
  providers: [TradesRabbitService, TradesService],
})
export class TradesModule {}
