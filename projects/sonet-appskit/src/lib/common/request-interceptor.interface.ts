import { HttpRequest } from '@angular/common/http';

export interface IRequestInterceptor {
    beforeRequest(request: HttpRequest<any>): any
}