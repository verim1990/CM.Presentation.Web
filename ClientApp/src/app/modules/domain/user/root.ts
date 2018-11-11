// Main module
import { AuthGuard, AuthService, AppStore, State } from '../../../app-main';

// Feature modules
import { BusService, NotificationsService } from '../../feature/shared';

export interface RootState extends State {
}

export {
  AuthGuard,
  AuthService,
  AppStore,
  BusService,
  NotificationsService
};
