import { Notification } from './notification.model';

interface AddAction {
  type: 'ADD';
  payload: {
    notification: Notification
  };
}

interface RemoveAction {
  type: 'REMOVE';
  payload: {
    id?: string
  };
}

interface CleanAction {
  type: 'CLEAN';
  payload: { };
}

export declare type NotificationAction = AddAction | CleanAction | RemoveAction;
