import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GET_CURRENT_USER_URL} from "../../shared/constants/url";

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getCurrentUser() {
    let currentUserString = (localStorage.getItem('userData'))
    if (currentUserString) {
      let currentUser = JSON.parse(currentUserString)
      let currentUserUsername = currentUser.username
      return this.http.get(GET_CURRENT_USER_URL + currentUserUsername)
    }
    else
      return null
  }
}
