import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../shared/models/User";
import {IUserLogin} from "../shared/interfaces/IUserLogin";
import {HttpClient} from "@angular/common/http";
import {USER_LOGIN_URL} from "../shared/constants/url";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User())
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();  // ReadOnly version of userSubject
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(
      USER_LOGIN_URL,
      userLogin
    ).pipe(
      tap({
        next: (user: User) => {
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Chai ${user.name}!`,
            `Your login was successful, well done!`
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            `Your login wasn't successful, boo :(`
          );
        }
      })
    );
  }  // I means interface, so can't create new object
}
