import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import {
  BOT_EXCHANGE_NAME,
  TRADE_RECEIVED_EVENT,
  TradeReceivedEvent,
} from '@tf2-automatic/bot-data';

@Injectable()
export class TradesService {
  private readonly logger = new Logger(TradesService.name);
  @RabbitSubscribe({
    exchange: BOT_EXCHANGE_NAME,
    routingKey: TRADE_RECEIVED_EVENT,
  })
  public async handleFriendRelationshipEvent(event: TradeReceivedEvent) {
    this.logger.log(`New trade received: ${JSON.stringify(event, null, 2)}`);
  }
}
