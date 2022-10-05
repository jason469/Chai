import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from "rxjs";
import {AuthResponseData} from "../shared/interfaces/AuthResponseData";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {USER_LOGIN_URL} from "../shared/constants/url";
import {ToastrService} from "ngx-toastr";
import {IUserLogin} from "../shared/interfaces/IUserLogin";
import {User} from "../shared/models/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  user = new BehaviorSubject<User>({} as User)

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  login(userLogin: IUserLogin): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      USER_LOGIN_URL,
      userLogin
    ).pipe(
      tap({
        next: (responseData: AuthResponseData) => {
          console.log(responseData)
          // const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000)
          const user = new User(
            responseData._id,
            responseData.name,
            responseData.username,
            responseData.token,
            // expirationDate
          )
          console.log(user)
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
      _username: string;
      _token: string;

    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    console.log(userData)

    const loadedUser = new User(
      userData.id,
      userData.name,
      userData._username,
      userData._token
    )

    if (loadedUser.token) {
      this.user.next(loadedUser)
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
    this.user.next({} as User);
    this.loggedIn = false;
    this.router.navigate(['/login'])
  }

  getLoginStatus() {
    return this.loggedIn
  }
}
