import { Injectable, Logger } from '@nestjs/common';
import {
  TRADE_JOBS_FULL_PATH,
  QueueTradeCreate,
} from '@tf2-automatic/bot-manager-data';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TradesService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(TradesService.name);

  public async acceptOffer(fromBot: string, id: string) {
    const url = `http://bot-manager:3000${TRADE_JOBS_FULL_PATH}`;

    await firstValueFrom(
      this.httpService.post<QueueTradeCreate>(url, {
        type: 'ACCEPT',
        data: id,
        bot: fromBot,
      }),
    );

    this.logger.log(`Accepted trade ${id}`);
  }
}
