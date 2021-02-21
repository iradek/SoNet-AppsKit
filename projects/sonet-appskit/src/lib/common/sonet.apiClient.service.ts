import { Injectable } from "@angular/core";
import { OAuthGrant } from "./sonet.enums";
import { SoNetAppsConfig } from "./sonet.apps.config";
import { SoNetProxy } from "./sonet.proxy.service";

@Injectable({
    providedIn: 'root',
})
export class SoNetApiClient {
    constructor(protected sonetProxy: SoNetProxy, protected appsConfig: SoNetAppsConfig) {

    }

    async getSettingsAsync(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ClientCredentials;
        return await this.sonetProxy.get$("/api/Settings/GetAll").toPromise();
    }

    async getAllClassifiedsForSite(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Classifieds?$filter=SiteName eq '${this.appsConfig.siteName}'`;
        return await this.sonetProxy.get$(url).toPromise();
    }

    async getSiteAsync(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Sites('${this.appsConfig.siteName}')`;
        var site = await this.sonetProxy.get$(url).toPromise();
        if (!site)
            throw new Error(`Site '${this.appsConfig.siteName}' does not exist.`);
        return site;
    }


}