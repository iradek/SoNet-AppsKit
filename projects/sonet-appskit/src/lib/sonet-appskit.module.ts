import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidationMessageComponent } from './components/sonet-validation-message.component';
import { BusyIndicatorComponent } from './components/sonet-busy-indicator.component';
import { SoNetUrlService } from './common/sonet.url.service';
import { OAuthInterceptor } from './common/sonet.oauth.interceptor';
import { SoNetHttpInterceptor } from './common/sonet.http.interceptor';
import { SoNetConfigService } from './common/sonet.config.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [ValidationMessageComponent, BusyIndicatorComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    exports: [
        ValidationMessageComponent,
        BusyIndicatorComponent
    ],
    //When you import an NgModule, Angular adds the module's service providers (the contents of its providers list) to the application root injector.
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [SoNetConfigService, SoNetUrlService],
            multi: true
        },   
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
export class SoNetAppsKitModule {    
    
}

export function initializeApp(configService: SoNetConfigService) {
    var loadMethod = () => configService.loadAsync(SoNetConfigService.ConfigFilePath); //we need to assign to variable, otherwise --prod will complain with "Lambda not supported"
    return loadMethod; 
}
