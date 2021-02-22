import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ValidationMessageComponent } from './components/sonet-validation-message.component';
import { BusyIndicatorComponent } from './components/sonet-busy-indicator.component';
import { SoNetApiClient } from './common/sonet.apiClient.service';
import { SoNetIntegrationService } from './common/sonet.intergration.service';
import { SoNetProxy } from './common/sonet.proxy.service';
import { SoNetUrlService } from './common/sonet.url.service';
import { SoNetValidationService } from './common/sonet.validation.service';
import { OAuthInterceptor } from './common/sonet.oauth.interceptor';
import { SoNetHttpInterceptor } from './common/sonet.http.interceptor';
import { SoNetHttpInterceptorService } from './common/sonet.http.interceptor.service';
import { SoNetConfigService } from './common/sonet.config.service';
import { SoNetOAuthService } from './common/sonet.oAuth.service';
import { ISoNetAppsConfig } from './common/sonet.apps.config';

@NgModule({
    declarations: [ValidationMessageComponent, BusyIndicatorComponent],
    imports: [
        HttpClientModule
    ],
    exports: [
        ValidationMessageComponent,
        BusyIndicatorComponent
    ],
    //When you import an NgModule, Angular adds the module's service providers (the contents of its providers list) to the application root injector.
    providers: [
        SoNetApiClient,        
        SoNetIntegrationService,        
        SoNetProxy,
        SoNetOAuthService,
        SoNetUrlService,
        SoNetValidationService,
        SoNetHttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OAuthInterceptor,
            deps: [SoNetConfigService], //important for the app setting to load prior to services depedending on it
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SoNetHttpInterceptor,
            deps: [SoNetConfigService], //important for the app setting to load prior to services depedending on it
            multi: true
        },
        SoNetConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [SoNetConfigService],
            multi: true
        }      
    ]
})
export class SoNetAppsKitModule { }

const configFilePath = 'assets/sonet.config.json';
export function initializeApp(configService: SoNetConfigService) {
    return () => configService.loadAsync(configFilePath);
}
