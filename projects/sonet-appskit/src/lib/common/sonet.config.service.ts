import { Injectable } from "@angular/core";
import { ISoNetAppsConfig } from "./sonet.apps.config";
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";


@Injectable()
export class SoNetConfigService {

    static Config: ISoNetAppsConfig = null;

    private _internalConfig: ISoNetAppsConfig;

    constructor(private http: HttpClient) {
        console.log("SoNetConfigService constructor");
    }

    // async loadAsync(url: string): Promise<ISoNetAppsConfig> {        
    //     return new Promise<ISoNetAppsConfig>((resolve) => {
    //         console.log("loading confirm from", url);
    //         this.http.get<ISoNetAppsConfig>(url).subscribe(
    //             config => {
    //                 console.log("loadAsync got the config: ", config);
    //                 SoNetConfigService.Config = config;
    //                 this._internalConfig = config;
    //                 resolve(config);
    //             },
    //             error => resolve(error))
    //     });
    // }

    get config(): ISoNetAppsConfig {
        return this._internalConfig;
    }

    // load(url: string) {
    //     return new Promise<void>((resolve, reject) => {
    //         console.log("loading config from", url);
    //         this.http.get(url).toPromise().then((response: ISoNetAppsConfig) => {                
    //             SoNetConfigService.Config = <ISoNetAppsConfig>response;
    //             this._internalConfig = <ISoNetAppsConfig>response;
    //             resolve();
    //         }).catch((response: any) => {
    //             console.error("error loading", response);
    //             reject(`Could not load file '${url}': ${JSON.stringify(response)}`);
    //         });
    //     });
    // }

    async loadAsync(url: string): Promise<ISoNetAppsConfig> {
        console.log("sonet.config.service load async with pipe");
        return this.http.get<ISoNetAppsConfig>(url).pipe(tap(
            config => {
                console.log("loadAsync - loaded config", config);
                SoNetConfigService.Config = config;
                this._internalConfig = config;
                return config;
            })).toPromise();
    }

    // async loadAsync(url: string) {
    //     console.log("config service: loadAsync");
    //     return this.http.get<ISoNetAppsConfig>(url)
    //         .toPromise()
    //         .then(result => {
    //             console.log("config service: resolved promise");
    //             SoNetConfigService.Config = <ISoNetAppsConfig>(result);
    //             this._internalConfig = <ISoNetAppsConfig>(result);
    //         }, error => console.error(error));
    // }

}