import { Notification } from './notification.model';
import { NotificationAction } from './notification.action';

export class NotificationEvent {
  constructor(
    public readonly action: NotificationAction
  ) { }
}

export const NotificationEventFactory = {
  add: (notification: Notification) => new NotificationEvent({
    type: 'ADD',
    payload: {
      notification
    }
  }),

  remove: (id: string) => new NotificationEvent({
    type: 'REMOVE',
    payload: {
      id
    }
  }),

  clean: () => new NotificationEvent({
    type: 'CLEAN',
    payload: {}
  })
};
