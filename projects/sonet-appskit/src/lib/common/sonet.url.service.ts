import { Injectable, Inject } from '@angular/core';
import { ISoNetAppsConfig } from './sonet.apps.config';
import { SoNetConfigService } from './sonet.config.service';

@Injectable({
    providedIn: 'root',
})
export class SoNetUrlService {

    constructor(
        private configService: SoNetConfigService
    ) {
        console.log("SoNetUrlService constructor");       
    }

    /**
     *  Resolves given url to a final absolute url with a hostname.
     *  When appsConfig.api_baseUrl is not defined - current host name acts as a baseUrl.
     */
    resolveFinalUrl(url: string): string {
        if (!url)
            throw new Error("Invalid url to resolve.");
        console.log("config in url service static",  this.configService.config);
        console.log("config in url service instance", this.configService.config);
        if (this.configService.config && this.configService.config.logging)
          console.log("Resolving url", url);
        if (url.startsWith("http")) {
            if (this.configService.config && this.configService.config.logging)
                console.log("Resolved url", url);
            return url; //allow to override
        }
        url = url.replace("~/", "/");
        let currentLocation = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        let resolvedUrl = ( this.configService.config.api_baseUrl || currentLocation) + (url.startsWith("/") ? url : "/" + url)
        if ( this.configService.config &&  this.configService.config.logging)
            console.log("Resolved url", resolvedUrl);
        return resolvedUrl;        
    }

}