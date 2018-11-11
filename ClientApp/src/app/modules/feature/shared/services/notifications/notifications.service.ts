import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// Models
import {
  Notification,
  NotificationType,
  NotificationBody,
  NotificationOptions
} from './../../models/notifications/notification.model';
import {
  NotificationEvent,
  NotificationEventFactory
} from './../../models/notifications/notification.event';
import {
  NotificationAction
} from './../../models/notifications/notification.action';

// Services
import { BusService } from './../bus/bus.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly bus: BusService
  ) {
  }

  add(type: NotificationType, title: string, content: string, icon?: string, options?: NotificationOptions) {
    const notification = new Notification(type, { title, content, icon }, options);
    const event = NotificationEventFactory.add(notification);

    this.bus.publish(event);

    return notification;
  }

  remove(id: string) {
    const event = NotificationEventFactory.remove(id);

    this.bus.publish(event);
  }

  clean() {
    const event = NotificationEventFactory.clean();

    this.bus.publish(event);
  }

  subscribe(handler: (action: NotificationAction) => void) {
    return this.bus
      .of(NotificationEvent)
      .pipe(map((event: NotificationEvent) => event.action))
      .subscribe(handler);
  }
}
