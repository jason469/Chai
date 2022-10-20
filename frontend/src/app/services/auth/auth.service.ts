import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {AuthResponseData} from "../../shared/interfaces/AuthResponseData";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {TOKEN_VALID_URL, USER_LOGIN_URL} from "../../shared/constants/url";
import {ToastrService} from "ngx-toastr";
import {IUserLogin} from "../../shared/interfaces/IUserLogin";
import {User} from "../../shared/models/User";
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

  login(userLogin: IUserLogin): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      USER_LOGIN_URL,
      userLogin
    ).pipe(
      tap({
        next: (responseData: AuthResponseData) => {
          // const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000)
          const user = new User(
            responseData._id,
            responseData.name,
            responseData.username,
            responseData.token,
            // expirationDate
          )
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
    console.log('autologin')
    const userData: {
      id: string;
      name: string;
      _username: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      console.log('no data')
      return;
    } else {
      const loadedUser = new User(
        userData.id,
        userData.name,
        userData._username,
        userData._token
      )
      if (loadedUser.token) {
        return this.http.post<Boolean>(
          TOKEN_VALID_URL,
          {token: loadedUser.token}
        ).pipe(
          tap(
            (isValid: Boolean) => {
              console.log(isValid)
              if (isValid) {
                this.user.next(loadedUser)
                console.log(this.user)
              } else {
                console.log('need to login')
                localStorage.removeItem('userData');
                this.user.next(null)
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
    console.log(this.user)
  }

  getLoginStatus() {
    return this.loggedIn
  }
}
