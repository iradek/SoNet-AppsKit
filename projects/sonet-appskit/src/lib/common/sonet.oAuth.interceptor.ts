import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { SoNetOAuthService } from './sonet.oAuth.service';

@Injectable({
    providedIn: 'root',
})
export class OAuthInterceptor implements HttpInterceptor {
    constructor(
        private oauthService: SoNetOAuthService      
    ) {
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addToken(request)).pipe(
            catchError(error => {
                if (!this.is401(error))
                    return throwError(error);
                return this.oauthService.updateToken().pipe(
                    concatMap(success => {
                        if (!success)
                            return throwError(error);
                        return next.handle(this.addToken(request)); //retry
                    })
                );
            })
        );
    }
    private is401(error: any): boolean {
        return error instanceof HttpErrorResponse && error.status === 401;
    }

    private addToken(request: HttpRequest<any>): HttpRequest<any> {
        if (!request)
            return;

        if (this.oauthService.token && this.oauthService.token.length) {
            const headers = request.headers.set(
                'Authorization',
                'Bearer ' + this.oauthService.token
            );
            return request.clone({ headers });
        }
        return request;
    }
}
