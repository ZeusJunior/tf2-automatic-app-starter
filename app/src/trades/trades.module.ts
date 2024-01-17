import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { RabbitMQWrapperModule } from 'src/rabbitmq-wrapper/rabbitmq-wrapper.module';

@Module({
  imports: [RabbitMQWrapperModule],
  providers: [TradesService],
})
export class TradesModule {}
