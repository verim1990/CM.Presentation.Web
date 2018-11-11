import { Component } from '@angular/core';

// Store
import { AppStore } from './store';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent {
  constructor(
    private readonly appStore: AppStore,
  ) {
    this.appStore.startupBegin();
  }
}
