import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req)
        }
        console.log('adding auth token')
        const modifiedReq = req.clone({
          headers: req.headers.append('x-auth-token', user.token)
        })
        console.log(modifiedReq)
        return next.handle(modifiedReq);
      })
    );
  }
}