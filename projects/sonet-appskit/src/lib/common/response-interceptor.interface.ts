import { HttpRequest } from '@angular/common/http';

export interface IResponseInterceptor {
    afterResponse(response: HttpRequest<any>): any
}