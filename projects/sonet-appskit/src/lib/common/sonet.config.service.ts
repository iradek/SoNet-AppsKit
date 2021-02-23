import { Injectable } from "@angular/core";
import { ISoNetAppsConfig } from "./sonet.apps.config";
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root',
})
export class SoNetConfigService {

    static ConfigFilePath = 'assets/sonet.config.json';

    static Config: ISoNetAppsConfig = null;

    private _internalConfig: ISoNetAppsConfig;

    constructor(private http: HttpClient) {     
         
         //this.loadAsync(configFilePath).then(c=>console.log(c));
        //this.http.get<ISoNetAppsConfig>(configFilePath).subscribe(c=>console.log("setting instantiated in constructor", c));
        //this.loadAsync(SoNetConfigService.ConfigFilePath);
    }   

    get config(): ISoNetAppsConfig {
        return this._internalConfig;
    }

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
}