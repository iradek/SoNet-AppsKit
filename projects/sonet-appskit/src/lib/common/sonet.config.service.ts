import { Injectable } from "@angular/core";
import { ISoNetAppsConfig } from "./sonet.apps.config";
import { HttpBackend, HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";


/**
 * Provides configuration for SoNET.
 */
@Injectable({
    providedIn: 'root',
})
export class SoNetConfigService {

    /**
     * Default path of SoNET configuration file.
     */
    static ConfigFilePath = 'assets/sonet.config.json';

    /**
     * Static instance of SoNET configuration.
     */
    static Config: ISoNetAppsConfig = null;

    private internalConfig: ISoNetAppsConfig;
    private httpClient: HttpClient;

    constructor(handler: HttpBackend) {            
        this.httpClient = new HttpClient(handler); //https://stackoverflow.com/questions/53066883/angular-http-interceptor-and-configuration-loaded-on-app-initialize
    }   

    /**
     * Instance of SoNET configuration.
     */
    get config(): ISoNetAppsConfig {
        return this.internalConfig;
    }

    /**
     * Loads SoNET configuration from a file.
     * @param url Url to *.json file with configuration. Must adhere to ISoNetAppsConfig interface.
     */
    async loadAsync(url: string): Promise<ISoNetAppsConfig> {
        return this.httpClient.get<ISoNetAppsConfig>(url).pipe(tap(
            config => {
                console.log("loadAsync - loaded config", config);
                SoNetConfigService.Config = config;
                this.internalConfig = config;
                return config;
            })).toPromise();
    }    
}