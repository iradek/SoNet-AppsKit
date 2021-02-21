import { Injectable } from '@angular/core';
import { IRequestInterceptor } from './request-interceptor.interface';
import { IResponseInterceptor } from './response-interceptor.interface';

@Injectable({ providedIn: 'root' })
export class SoNetHttpInterceptorService {

    requestInterceptors: IRequestInterceptor[] = [];
    responseInterceptors: IResponseInterceptor[] = [];

    constructor() { }

    registerRequestInterceptor(requestInterceptor: IRequestInterceptor): void {
        this.requestInterceptors.push(requestInterceptor);
    }

    deregisterRequestInterceptor(requestInterceptor: IRequestInterceptor): boolean {
        let indexOfItem = this.requestInterceptors.indexOf(requestInterceptor);
        if (indexOfItem === -1)
            return false;
        this.requestInterceptors.splice(indexOfItem, 1);
        return true;
    }

    registerResponseInterceptor(responseInterceptor: IResponseInterceptor): void {
        this.responseInterceptors.push(responseInterceptor);
    }

    deregisterResponseInterceptor(responseInterceptor: IResponseInterceptor): boolean {
        let indexOfItem = this.responseInterceptors.indexOf(responseInterceptor);
        if (indexOfItem === -1)
            return false;
        this.responseInterceptors.splice(indexOfItem, 1);
        return true;
    }

}