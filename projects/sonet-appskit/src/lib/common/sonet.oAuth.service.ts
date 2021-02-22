import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { SoNetUrlService } from "./sonet.url.service";
import { OAuthGrant } from './sonet.enums';
import { HttpClient } from '@angular/common/http';
import { SoNetConfigService } from './sonet.config.service';

@Injectable({
    providedIn: 'root',
})
export class SoNetOAuthService {

    token: string;
    tokenUrl: string;
    tokenKey: string = "access_token";

    constructor(private http: HttpClient, private urlService: SoNetUrlService, private configService: SoNetConfigService) {
        this.tokenUrl = this.urlService.resolveFinalUrl("/mvc/oauth/token");
    }

    updateToken(): Observable<boolean> {
        //return of(true);
        return this.retrieveAccessToken().pipe(
            map((response: string) => {
                if (response && response.length) {
                    this.token = response;
                    return true;
                }
                return false;
            })
        );
    }

    retrieveAccessToken(): Observable<string> {
        if (this.configService.config.oAuthGrant == OAuthGrant.ResourceOwner) {
            var formUrlEncodedContent = new URLSearchParams();
            formUrlEncodedContent.append("scope", "Api.Access" + (this.configService.config.siteName ? " SiteName:" + this.configService.config.siteName : "") /*required to call any SoNET API method*/ + (this.configService.config.passwordAlreadyEncrypted ? " Password.Encrypted" : ""));
            formUrlEncodedContent.append("grant_type", "password");
            formUrlEncodedContent.append("username", this.configService.config.userName);
            formUrlEncodedContent.append("password", this.configService.config.userPassword);
            return this.requestAccessToken(formUrlEncodedContent);
        }
        if (this.configService.config.oAuthGrant == OAuthGrant.ClientCredentials) {
            var formUrlEncodedContent = new URLSearchParams();
            formUrlEncodedContent.append("scope", "Api.Access" + (this.configService.config.siteName ? " SiteName:" + this.configService.config.siteName : "")); //required to call any SoNET API method )
            formUrlEncodedContent.append("grant_type", "client_credentials")
            return this.requestAccessToken(formUrlEncodedContent);
        }
        // If neither auth type enum matched.
        throw new Error(`{nameof(enums.OAuthGrant)} is not supported.`);
    }

    /** 
     * Requests oAuth access token.
     * @param formContent (key, value) pairs with application/x-www-form-urlencoded data to send along.
     */
    requestAccessToken(formContent: URLSearchParams): Observable<string> {
        if (this.configService.config && this.configService.config.logging)
            console.log("Retrieving access token.", formContent);
        const clientID = this.configService.config.oauth_client_id;
        const clientSecret = this.configService.config.oauth_client_secret;
        const postMethod$ = this.http.post(this.tokenUrl, formContent.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    this.base64EncodeForBasicAuthentication(clientID, clientSecret)
            }
        });
        return postMethod$.pipe(map(result => result['access_token']));
    }

    private base64EncodeForBasicAuthentication(userName: string, password: string): string {
        return btoa(`${userName}:${password}`);
    }


}