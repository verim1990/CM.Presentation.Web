import { Component, OnInit, OnDestroy, Input, ViewEncapsulation, NgZone, HostBinding, HostListener, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Models
import { Notification } from '../../models/notifications/notification.model';

// Services
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'fc-notification',
  templateUrl: './fc-notification.component.html',
  styleUrls: ['./fc-notification.component.scss'],
  animations: [
    trigger('enterLeave', [

      // Enter from right
      state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => fromRight', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('400ms ease-in-out')
      ]),
      state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
      transition('fromRight => fromRightOut', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('300ms ease-in-out')
      ]),

      // Enter from left
      state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => fromLeft', [
        style({ opacity: 0, transform: 'translateX(-5%)' }),
        animate('400ms ease-in-out')
      ]),
      state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
      transition('fromLeft => fromLeftOut', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('300ms ease-in-out')
      ]),

      // Rotate
      state('scale', style({ opacity: 1, transform: 'scale(1)' })),
      transition('* => scale', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('400ms ease-in-out')
      ]),
      state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
      transition('scale => scaleOut', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('400ms ease-in-out')
      ]),

      // Scale
      state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
      transition('* => rotate', [
        style({ opacity: 0, transform: 'rotate(5deg)' }),
        animate('400ms ease-in-out')
      ]),
      state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
      transition('rotate => rotateOut', [
        style({ opacity: 1, transform: 'rotate(0deg)' }),
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class FcNotificationComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public notification: Notification;

  @HostBinding('class') get theClass() {
    return [... this.notification.options.classes, this.notification.type].join(' ');
  }

  @HostBinding('@enterLeave') get enterLeave() {
    return this.animationState;
  }

  @HostListener('mouseenter') mouseEnter() {
    this.onEnter();
  }

  @HostListener('mouseleave') mouseLeave() {
    this.onLeave();
  }

  @HostListener('click') click() {
    this.onClick();
  }

  // Others
  private animationState: string;

  // Progress bar variables
  private progressWidth = 0;
  private stopTime = false;
  private timer: any;
  private steps: number;
  private speed: number;
  private count = 0;
  private start: any;
  private diff: any;

  constructor(
    private notificationService: NotificationsService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    if (this.notification.options.animate) {
      this.animationState = this.notification.options.animate;
    }

    if (this.notification.options.timeOut !== 0) {
      this.startTimeOut();
    }
  }

  ngAfterViewInit() {
    this.notification.onDisplay();
  }

  ngOnDestroy(): void {
    this.notification.onDestroy();

    clearTimeout(this.timer);
  }

  onEnter(): void {
    this.notification.onEnter();

    if (this.notification.options.pauseOnHover) {
      this.stopTime = true;
    }
  }

  onLeave(): void {
    this.notification.onLeave();

    if (this.notification.options.pauseOnHover) {
      this.stopTime = false;
      setTimeout(this.instance, (this.speed - this.diff));
    }
  }

  onClick(): void {
    this.notification.onClick();

    if (this.notification.options.clickToClose) {
      this.remove();
    }
  }


  startTimeOut(): void {
    this.steps = this.notification.options.timeOut / 10;
    this.speed = this.notification.options.timeOut / this.steps;
    this.start = new Date().getTime();
    this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
  }

  private instance = () => {
    this.zone.runOutsideAngular(() => {
      this.zone.run(() => this.diff = (new Date().getTime() - this.start) - (this.count * this.speed));

      if (this.count++ === this.steps) { this.zone.run(() => this.remove()); } else if (!this.stopTime) {
        if (this.notification.options.showProgressBar) { this.zone.run(() => this.progressWidth += 100 / this.steps); }

        this.timer = setTimeout(this.instance, (this.speed - this.diff));
      }
    });
  }

  private remove() {
    if (this.notification.options.animate) {
      this.animationState = this.notification.options.animate + 'Out';
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => this.notificationService.remove(this.notification.id));
        }, 310);
      });
    } else {
      this.notificationService.remove(this.notification.id);
    }
  }
}
