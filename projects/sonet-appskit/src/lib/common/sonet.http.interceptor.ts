import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoNetHttpInterceptorService } from './sonet.http.interceptor.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class SoNetHttpInterceptor implements HttpInterceptor {

    constructor(private interceptorService: SoNetHttpInterceptorService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._invokeRequestInterceptors(req);
        return next.handle(req).pipe(
            finalize(() => {
                this._invokeResponseInterceptors(req);
            })
        );
    }

    private _invokeRequestInterceptors(request: HttpRequest<any>) {
        for (const requestInterceptor of this.interceptorService.requestInterceptors) {
            requestInterceptor.beforeRequest(request);
        }
    }

    private _invokeResponseInterceptors(request: HttpRequest<any>) {
        for (const requestInterceptor of this.interceptorService.responseInterceptors) {
            requestInterceptor.afterResponse(request);
        }
    }
}