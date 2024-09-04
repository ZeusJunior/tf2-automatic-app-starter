import { Module } from '@nestjs/common';
import { TradesRabbitService } from './trades-rabbit.service';
import { TradesService } from './trades.service';
import { RabbitMQWrapperModule } from 'src/rabbitmq-wrapper/rabbitmq-wrapper.module';

@Module({
  imports: [RabbitMQWrapperModule],
  providers: [TradesRabbitService, TradesService],
})
export class TradesModule {}
