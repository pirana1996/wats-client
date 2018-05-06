import { AuthService } from './../../core/services/auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('login') >= 0) {
      console.log('Intercepted request that attempts to login');
      return next.handle(req).map(event => {
        if (event instanceof HttpResponse && this.shouldBeIntercepted(event)) {
            console.log('Intercepted response that contains Authorization header');
            const token = event.headers.get('Authorization').replace('Bearer ', '');
            this.auth.storeToken(token);
        }
        return event;
      });
    } else if (!/public\/locations/i.test(req.url)) {
      console.log('Intercepted request that should be authorized');
      // Clone the request to add the new header
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
      });
      console.log('Sending request with Authorization header set');
      // send the newly created request
      return next.handle(req)
                    .catch((error, caught) => {
                      // intercept the respons error and displace it to the console
                      console.log('Error Occurred');
                      console.log(error);
                      // return the error to the method that called it
                      return Observable.throw(error);
                    }) as any;
    }
    return next.handle(req);
  }

  private shouldBeIntercepted(response: HttpResponse<any>): boolean {
    const authHeader = response.headers.get('Authorization');
    return ((authHeader == null) || (authHeader.indexOf('Bearer ') === -1)) ? false : true;
  }

  private extractAndStoreToken(response: HttpResponse<any>) {
    const token = response.headers.get('Authorization').replace('Bearer ', '');
    this.auth.storeToken(token);
  }

}
