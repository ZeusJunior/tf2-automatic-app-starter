import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import {
  BOT_EXCHANGE_NAME,
  TRADE_RECEIVED_EVENT,
  TradeReceivedEvent,
} from '@tf2-automatic/bot-data';
import { TradesService } from './trades.service';

@Injectable()
export class TradesRabbitService {
  constructor(private readonly tradesService: TradesService) {}

  private readonly logger = new Logger(TradesRabbitService.name);

  @RabbitSubscribe({
    exchange: BOT_EXCHANGE_NAME,
    routingKey: TRADE_RECEIVED_EVENT,
  })
  public async handleTradeReceivedEvent(event: TradeReceivedEvent) {
    this.logger.log(`New trade received: ${JSON.stringify(event, null, 2)}`);
    await this.tradesService.acceptOffer(
      event.metadata.steamid64,
      event.data.offer.id,
    );
  }
}
