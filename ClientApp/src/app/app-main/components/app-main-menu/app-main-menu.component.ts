import { Component } from '@angular/core';

// Store
import { AppStore } from '../../store';

@Component({
  selector: 'app-main-menu',
  templateUrl: './app-main-menu.component.html',
  styleUrls: ['./app-main-menu.component.scss'],
})
export class AppMainMenuComponent {
  public isLoggedIn = false;

  constructor(
    private readonly appStore: AppStore,
  ) {
    this.appStore.isAuthorized
      .subscribe(isAuthorized => {
        this.isLoggedIn = isAuthorized;
      });
  }
}
