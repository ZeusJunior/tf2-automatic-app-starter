import { Injectable, Logger } from '@nestjs/common';
import {
  FRIENDS_BASE_URL,
  FRIEND_MESSAGE_PATH,
  SendFriendMessageResponse,
} from '@tf2-automatic/bot-data';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FriendsService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(FriendsService.name);

  public async sendMessage(fromBot: string, to: string, message: string) {
    const url =
      `http://bot-${fromBot}:3000${FRIENDS_BASE_URL}${FRIEND_MESSAGE_PATH}/`.replace(
        ':steamid',
        to,
      );

    const { data } = await firstValueFrom(
      this.httpService.post<SendFriendMessageResponse>(url, {
        message,
      }),
    );

    this.logger.log(
      `Sent message to ${to} from ${fromBot}: ${data.modified_message}`,
    );
  }
}
