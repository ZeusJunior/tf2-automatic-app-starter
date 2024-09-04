import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import SteamUser from 'steam-user';
import {
  BOT_EXCHANGE_NAME,
  FRIEND_MESSAGE_EVENT,
  FriendMessageEvent,
  FRIEND_RELATIONSHIP_EVENT,
  FriendRelationshipEvent,
} from '@tf2-automatic/bot-data';
import { FriendsService } from './friends.service';

@Injectable()
export class FriendsRabbitService {
  constructor(private readonly friendsService: FriendsService) {}

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
      const added = await this.friendsService.addFriend(
        event.metadata.steamid64,
        event.data.steamid64,
      );

      if (!added) {
        this.logger.error(
          `Failed to accept friend request from ${event.data.steamid64}`,
        );
        return;
      }

      this.logger.log(`Added ${event.data.steamid64}`);
      return;
    }

    if (event.data.relationship === SteamUser.EFriendRelationship.None) {
      this.logger.log(`Unfriended ${event.data.steamid64}`);
      return;
    }

    if (event.data.relationship === SteamUser.EFriendRelationship.Friend) {
      this.logger.log(`Became friends with ${event.data.steamid64}`);
      await this.friendsService.sendMessage(
        event.metadata.steamid64,
        event.data.steamid64,
        `Hello, friend!`,
      );
      return;
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
