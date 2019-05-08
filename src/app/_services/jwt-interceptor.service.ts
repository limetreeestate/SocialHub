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
    //let s = _auth.hasToken("token")
    //console.log(s)
    if (request.url.includes("api.twitter")) {
      //If request to twitter API
      //tokenize the request with twitter bearer token
      console.log("Tokeninzing twitter request")
      let requestWithToken = request.clone({
        setHeaders: {
          Authorization: `Bearer ${_auth.getToken("twitter")}`
        }
      })  
      //pass tokenized requset to next request handler
      return next.handle(requestWithToken)

    } else if (request.url.includes("googleapis")){
      return next.handle(request)
    }

    //Request to backend server
    //tokenize the request
    let requestWithToken = request.clone({
      setHeaders: {
        Authorization: `Bearer ${_auth.getToken("token")}`
      }
    })

    //pass tokenized requset to next request handler (back-end)
    return next.handle(requestWithToken)
  }
}
