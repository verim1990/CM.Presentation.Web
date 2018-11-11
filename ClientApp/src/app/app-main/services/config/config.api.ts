import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Imports
import { Api } from '../../imports';

// Models
import { Environment } from './../../models/config/environment.model';

@Injectable()
export class ConfigApi extends Api {
  constructor(
    private readonly http: Http
  ) {
    super();
  }

  getEnvironment(): Observable<Environment> {
    return this.http
      .get('/settings')
      .pipe(
        map(response => response.json() as Environment)
      );
  }
}
