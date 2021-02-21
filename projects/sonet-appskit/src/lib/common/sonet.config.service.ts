import { Injectable, InjectionToken } from "@angular/core";
import { SoNetAppsConfig } from "./sonet.apps.config";
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/**
@Injectable({
    providedIn: 'root',
})

 * Loads a configuration from the file.
 */
// export class SoNetConfigService {
//     private _config: SoNetAppsConfig;

//     constructor(private http: HttpClient) { }

//     async loadAsync(url: string): Promise<SoNetAppsConfig> {
//         return this.http.get<SoNetAppsConfig>(url).pipe(tap(config => { this._config = config; console.log('config loaded', config); })).toPromise();
//     }

//     getConfiguration(): SoNetAppsConfig {
//         return this._config;
//     }
// }