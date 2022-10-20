import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GET_ALL_CWIMPIES_URL} from "../../shared/constants/url";
import {User} from "../../shared/models/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

}
