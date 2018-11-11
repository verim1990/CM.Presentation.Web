import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// Models
import { Message } from './../../models/bus/message.model';

@Injectable()
export class BusService {
  private readonly bus = new Subject<Message>();

  publish<T>(event: T): void {
    const channel = (event.constructor as any).name;

    this.bus.next({
      channel,
      event
    });
  }

  of<T>(messageType: { new (...args: any[]): T }): Observable<T> {
    const channel = (messageType as any).name;

    return this.bus
      .pipe(filter((message: Message) => message.channel === channel))
      .pipe(map((message: Message) => message.event));
  }
}
