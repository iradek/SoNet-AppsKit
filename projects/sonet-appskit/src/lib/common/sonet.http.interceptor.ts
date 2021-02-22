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
        if (!this._invokeRequestInterceptors.length)
            return;
        // for (var i = 0; i < this._invokeResponseInterceptors.length; i++) {
        //     this._invokeResponseInterceptors[i].beforeRequest(request);
        // }

    }

    private _invokeResponseInterceptors(request: HttpRequest<any>) {
        if (!this._invokeResponseInterceptors.length)
            return;
        // for (var i = 0; i < this._invokeResponseInterceptors.length; i++) {
        //     this._invokeResponseInterceptors(request);
        // }
    }
}