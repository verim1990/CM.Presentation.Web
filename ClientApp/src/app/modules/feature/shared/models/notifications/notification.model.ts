import { EventEmitter } from '@angular/core';

export type NotificationType = 'alert' | 'error' | 'info' | 'warn' | 'success';

export interface NotificationBody {
  title: string;
  content: string;
  contentMaxLength?: number;
  icon?: string;
}

export interface NotificationEvents {
  click: EventEmitter<{}>;
  enter: EventEmitter<{}>;
  leave: EventEmitter<{}>;
  display: EventEmitter<{}>;
  destroy: EventEmitter<{}>;
}

export interface NotificationOptions {
  animate?: 'fromRight' | 'fromLeft' | 'rotate' | 'scale';
  classes?: string[];
  clickToClose?: boolean;
  timeOut?: number;
  showProgressBar?: boolean;
  pauseOnHover?: boolean;
}

export class Notification {
  readonly id: string;
  readonly events: NotificationEvents;

  constructor(
    public readonly type: NotificationType,
    public readonly body: NotificationBody,
    public readonly options?: NotificationOptions
  ) {
    this.id = Math.random().toString(36).substring(3);

    this.events = {
      click: new EventEmitter<{}>(),
      enter: new EventEmitter<{}>(),
      leave: new EventEmitter<{}>(),
      display: new EventEmitter<{}>(),
      destroy: new EventEmitter<{}>()
    };

    this.options = {
      animate: 'fromRight',
      clickToClose: true,
      timeOut: 5000,
      showProgressBar: true,
      classes: [],
      ... this.options
    };
  }

  onClick() {
    this.events.click.next({});
  }

  onEnter() {
    this.events.enter.next({});
  }

  onLeave() {
    this.events.leave.next({});
  }

  onDisplay() {
    this.events.display.next({});
  }

  onDestroy() {
    this.events.destroy.next({});
  }

  isEqual(notification: Notification) {
    if (this.type !== notification.type) {
      return false;
    }

    return this.body.title === notification.body.title && this.body.content === notification.body.content;
  }
}
