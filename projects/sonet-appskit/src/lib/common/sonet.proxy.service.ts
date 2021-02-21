import { FactoryProvider, inject, Inject, Injectable, InjectionToken, ValueProvider } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoNetUrlService } from './sonet.url.service';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: object | string | number | boolean;
}

/**
 * Proxy to SoNet API. Resolves base Url based on configuration. 
 */
@Injectable({
    providedIn: 'root',
})
export class SoNetProxy extends HttpClient {

    constructor(private httpHandler: HttpHandler, private urlService: SoNetUrlService) {
        super(httpHandler);
    }

    /**
     * GET request with resolving relative Url of an endpoint.
     * @param endPoint relative location of a method endpoint to call.
     * @param options options of the request like headers, body, etc.
     * @param api use if there is needed to send request to different back-end than the default one.
     */
    public get$<T>(endPoint: string, options?: IRequestOptions, api?: string): Observable<T> {
        return super.get<T>(api || this.urlService.resolveFinalUrl(endPoint), options);
    }

    /**
     * POST request with resolving relative Url of an endpoint.
     * @param endPoint relative location of method to call
     * @param params body of the request.
     * @param options options of the request like headers, body, etc.
     * @param api use if there is needed to send request to different back-end than the default one.
     */
    public post$<T>(endPoint: string, params: object | string, options?: IRequestOptions, api?: string): Observable<T> {
        return super.post<T>(api || this.urlService.resolveFinalUrl(endPoint), params, options);
    }

    /**
     * PUT request with resolving relative Url of an endpoint.
     * @param endPoint relative location of method to call
     * @param params body of the request.
     * @param options options of the request like headers, body, etc.
     * @param api use if there is needed to send request to different back-end than the default one.
     */
    public put$<T>(endPoint: string, params: object | string, options?: IRequestOptions, api?: string): Observable<T> {
        return super.put<T>(api || this.urlService.resolveFinalUrl(endPoint), params, options);
    }

    /**
     * DELETE request with resolving relative Url of an endpoint.
     * @param endPoint relative location of method to call
     * @param options options of the request like headers, body, etc.
     * @param api use if there is needed to send request to different back-end than the default one.
     */
    public delete$<T>(endPoint: string, options?: IRequestOptions, api?: string): Observable<T> {
        return super.delete<T>(api || this.urlService.resolveFinalUrl(endPoint), options);
    }
}
