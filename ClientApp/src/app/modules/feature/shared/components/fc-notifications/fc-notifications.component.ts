import { Component, OnInit, OnDestroy, Input, Output, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

// Models
import { Notification } from '../../models/notifications/notification.model';

// Services
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'fc-notifications',
  templateUrl: './fc-notifications.component.html',
  styleUrls: ['./fc-notifications.component.scss']
})
export class FcNotificationsComponent {
  @Input() maxStack = 8;
  @Input() lastOnBottom = true;
  @Input() preventDuplicates = false;
  @Input() preventLastDuplicates = false;
  @Input() position: ['top' | 'bottom', 'right' | 'left'] = ['bottom', 'right'];

  @HostBinding('class') get classes(): string {
    return [... this.position].join(' ');
  }

  private subscription: Subscription;

  notifications: Notification[] = [];

  constructor(
    private readonly notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.subscription = this.notificationService
      .subscribe(action => {
        switch (action.type) {
          case 'ADD':
            this.add(action.payload.notification);
            break;

          case 'REMOVE':
            this.remove(action.payload.id);
            break;

          case 'CLEAN':
            this.clean();
            break;

          default:
            break;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private clean() {
    this.notifications.length = 0;
  }

  private remove(id: string) {
    const index = this.notifications
      .findIndex(notification => notification.id === id);

    if (index >= 0) {
      this.notifications.splice(index, 1);
    }
  }

  private add(item: Notification): void {
    if (this.shouldBeBlocked(item)) {
      return;
    }

    if (this.lastOnBottom) {
      if (this.notifications.length >= this.maxStack) {
        this.notifications.splice(0, 1);
      }
      this.notifications.push(item);
    } else {
      if (this.notifications.length >= this.maxStack) {
        this.notifications.splice(this.notifications.length - 1, 1);
      }
      this.notifications.splice(0, 0, item);
    }
  }

  private shouldBeBlocked(item: Notification): boolean {
    if (!this.preventLastDuplicates && !this.preventDuplicates) {
      return false;
    }

    if (this.preventDuplicates && this.notifications.length > 0) {
      return this.notifications.some((notification) => item.isEqual(notification));
    }

    if (this.preventLastDuplicates && this.notifications.length > 0) {
      const lastNotification = this.notifications[this.lastOnBottom ? this.notifications.length - 1 : 0];

      return item.isEqual(lastNotification);
    }

    return false;
  }
}
