import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BOT_EXCHANGE_NAME } from '@tf2-automatic/bot-data';
import { BOT_MANAGER_EXCHANGE_NAME } from '@tf2-automatic/bot-manager-data';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('RABBITMQ_USERNAME');
        const password = configService.get<string>('RABBITMQ_PASSWORD');
        const host = configService.get<string>('RABBITMQ_HOST');
        const port = configService.get<number>('RABBITMQ_PORT');
        const vhost = configService.get<string>('RABBITMQ_VHOST');

        return {
          exchanges: [
            {
              createExchangeIfNotExists: false,
              name: BOT_EXCHANGE_NAME,
            },
            {
              name: BOT_MANAGER_EXCHANGE_NAME,
              type: 'topic',
            },
          ],
          uri: `amqp://${username}:${password}@${host}:${port}/${vhost}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQWrapperModule {}
