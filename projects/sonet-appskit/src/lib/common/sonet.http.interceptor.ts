import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoNetHttpInterceptorService } from './sonet.http.interceptor.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
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
        if (!this.interceptorService.requestInterceptors.length)
            return;
        for (var i = 0; i < this.interceptorService.requestInterceptors.length; i++) {
            this.interceptorService.requestInterceptors[i].beforeRequest(request);
        }
    }

    private _invokeResponseInterceptors(request: HttpRequest<any>) {
        if (!this.interceptorService.responseInterceptors.length)
            return;
        for (var i = 0; i < this.interceptorService.responseInterceptors.length; i++) {
            this._invokeResponseInterceptors(request);
        }
    }
}