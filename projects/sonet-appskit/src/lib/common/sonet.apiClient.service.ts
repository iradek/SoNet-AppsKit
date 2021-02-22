import { Injectable } from "@angular/core";
import { SoNetConfigService } from "./sonet.config.service";
import { OAuthGrant } from "./sonet.enums";
import { SoNetProxy } from "./sonet.proxy.service";

@Injectable({
    providedIn: 'root',
})
export class SoNetApiClient {
    constructor(protected sonetProxy: SoNetProxy, private configService: SoNetConfigService ) {
    }

    async getSettingsAsync(): Promise<any> {
        this.configService.config.oAuthGrant = OAuthGrant.ClientCredentials;
        return await this.sonetProxy.get$("/api/Settings/GetAll").toPromise();
    }

    async getAllClassifiedsForSite(): Promise<any> {
        this.configService.config.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Classifieds?$filter=SiteName eq '${this.configService.config.siteName}'`;
        return await this.sonetProxy.get$(url).toPromise();
    }

    async getSiteAsync(): Promise<any> {
        this.configService.config.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Sites('${this.configService.config.siteName}')`;
        var site = await this.sonetProxy.get$(url).toPromise();
        if (!site)
            throw new Error(`Site '${this.configService.config.siteName}' does not exist.`);
        return site;
    }


}