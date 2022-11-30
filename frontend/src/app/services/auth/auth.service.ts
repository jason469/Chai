import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IAuthResponseData} from "../../shared/interfaces/IAuthResponseData";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TOKEN_VALID_URL, USER_LOGIN_URL} from "../../shared/constants/url";
import {ToastrService} from "ngx-toastr";
import {IUserLogin} from "../../shared/interfaces/IUserLogin";
import {User} from "../../shared/models/models";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {
  }

  login(userLogin: IUserLogin): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(
      USER_LOGIN_URL,
      userLogin
    ).pipe(
      tap({
        next: (responseData: IAuthResponseData) => {
          const user = new User()
          user.name = responseData.name;
          user.id = responseData._id;
          user.username = responseData.username;
          user.token = responseData.token;

          this.user.next(user)
          this.toastrService.success(
            `Welcome to Chai ${user.name}!`,
            `Your login was successful, well done!`
          );
          this.loggedIn = true;
          localStorage.setItem('userData', JSON.stringify(user))  // Save user data in local storage
        },
        error: (errorResponse: HttpErrorResponse) => {
          let errorMessage = this.handleError(errorResponse)
          this.toastrService.error(
            errorMessage,
            `Your login wasn't successful, boo :(`
          );
          this.loggedIn = false;
        }
      })
    )
  };

  autoLogin() {
    const userData: {
      id: string;
      name: string;
      username: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      console.log('no data')
      return;
    } else {
      const loadedUser = new User()
      loadedUser.name = userData.name;
      loadedUser.id = userData.id;
      loadedUser.username = userData.username;
      loadedUser.token = userData.token;

      if (loadedUser.token) {
        return this.http.post<Boolean>(
          TOKEN_VALID_URL,
          {token: loadedUser.token}
        ).pipe(
          tap(
            (isValid: Boolean) => {
              if (isValid) {
                this.user.next(loadedUser)
                this.loggedIn = true;
                this.router.navigate(['/'])
              } else {
                localStorage.removeItem('userData');
                this.user.next(null)
                this.loggedIn = false;
              }
            }
          )
        )
      } else {
        console.log('no token')
        this.user.next(null)
        return;
      }
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = `An unknown error has occurred, please let Jason know :)`
    if (!errorRes.error) {
      return errorMessage
    }
    switch (errorRes.error.msg) {
      case `Incorrect password`:
        errorMessage = 'Your password was invalid, please try again :)'
        break
      case `User with this username doesnt exist`:
        errorMessage = 'Your username was invalid, please try again :)'
        break
      default:
        errorMessage = errorRes.error.message
    }
    return errorMessage
  }


  logOut() {
    this.user.next(null);
    this.loggedIn = false;
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])
  }

  getLoginStatus() {
    return this.loggedIn
  }
}
