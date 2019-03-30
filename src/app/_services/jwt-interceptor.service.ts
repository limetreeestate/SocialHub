import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
/**
 * 
 * Intercept HTTP requests to embed JWT tokens into the request
 * 
 */
export class JwtInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector
  ) { }

  //intercept request and set local storage token in the header and pass to next handler of the request
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const _auth = this.injector.get(AuthService)
    console.log("Tokeninzing request")

    //tokenize the request
    let requestWithToken = request.clone({
      setHeaders: {
        Authorization: `Bearer ${_auth.getToken()}`
      }
    })

    //pass tokenized requset to next request handler (back-end)
    return next.handle(requestWithToken)
  }
}
