import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import SteamUser from 'steam-user';
import {
  BOT_EXCHANGE_NAME,
  FRIEND_MESSAGE_EVENT,
  FriendMessageEvent,
  FRIEND_RELATIONSHIP_EVENT,
  FriendRelationshipEvent,
  FRIENDS_BASE_URL,
  FRIENDS_PATH,
  FRIEND_PATH,
  AddFriendResponse,
} from '@tf2-automatic/bot-data';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { FriendsService } from './friends.service';

@Injectable()
export class FriendsRabbitService {
  constructor(
    private readonly httpService: HttpService,
    private readonly friendsService: FriendsService,
  ) {}

  private readonly logger = new Logger(FriendsRabbitService.name);

  @RabbitSubscribe({
    exchange: BOT_EXCHANGE_NAME,
    routingKey: FRIEND_RELATIONSHIP_EVENT,
  })
  public async handleFriendRelationshipEvent(event: FriendRelationshipEvent) {
    this.logger.log(`New relationship: ${JSON.stringify(event, null, 2)}`);
    if (
      event.data.relationship === SteamUser.EFriendRelationship.RequestRecipient
    ) {
      const url =
        `http://bot-${event.metadata.steamid64}:3000${FRIENDS_BASE_URL}${FRIEND_PATH}`.replace(
          ':steamid',
          event.data.steamid64,
        );
      const { data: addFriendData } = await firstValueFrom(
        this.httpService.post<AddFriendResponse>(url).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(JSON.stringify(error.response.data, null, 2));
            throw 'An error happened!';
          }),
        ),
      );

      if (!addFriendData.added) {
        this.logger.error(
          `Failed to accept friend request from ${event.data.steamid64}`,
        );
        return;
      }

      this.logger.log(`Added ${event.data.steamid64}`);
    }

    if (event.data.relationship === SteamUser.EFriendRelationship.None) {
      this.logger.log(`Unfriended ${event.data.steamid64}`);
    }

    if (event.data.relationship === SteamUser.EFriendRelationship.Friend) {
      this.logger.log(`Became friends with ${event.data.steamid64}`);
      await this.friendsService.sendMessage(
        event.metadata.steamid64,
        event.data.steamid64,
        `Hello, friend!`,
      );
    }
  }

  @RabbitSubscribe({
    exchange: BOT_EXCHANGE_NAME,
    routingKey: FRIEND_MESSAGE_EVENT,
  })
  public async handleFriendMessageEvent(event: FriendMessageEvent) {
    this.logger.log(
      `New message from ${event.data.steamid64} to ${event.metadata.steamid64}: ${event.data.message}`,
    );
  }
}
