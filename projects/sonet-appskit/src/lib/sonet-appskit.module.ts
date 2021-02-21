import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ValidationMessageComponent } from './components/sonet-validation-message.component';
import { BusyIndicatorComponent } from './components/sonet-busy-indicator.component';
import { SoNetApiClient } from './common/sonet.apiClient.service';
import { SoNetAppsConfig } from './common/sonet.apps.config';
import { SoNetIntegrationService } from './common/sonet.intergration.service';
import { SoNetProxy } from './common/sonet.proxy.service';
import { SoNetUrlService } from './common/sonet.url.service';
import { SoNetValidationService } from './common/sonet.validation.service';
import { OAuthInterceptor } from './common/sonet.oauth.interceptor';
import { SoNetHttpInterceptor } from './common/sonet.http.interceptor';
import { SoNetHttpInterceptorService } from './common/sonet.http.interceptor.service';

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
        SoNetAppsConfig,
        SoNetApiClient,
        //SoNetConfigService,
        SoNetIntegrationService,
        SoNetProxy,
        SoNetUrlService,
        SoNetValidationService,
        SoNetHttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OAuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SoNetHttpInterceptor,
            multi: true
        }
    ]
})
export class SoNetAppsKitModule { }
