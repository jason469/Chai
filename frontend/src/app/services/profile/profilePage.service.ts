import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GET_ALL_CWIMPIES_FROM_USER_URL, GET_CURRENT_USER_URL} from "../../shared/constants/url";
import {map} from "rxjs";

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
    } else {
      return null
    }
  }

  getCwimpiesFromUser(username: string) {
    console.log(GET_ALL_CWIMPIES_FROM_USER_URL + username)
    return this.http.get(GET_ALL_CWIMPIES_FROM_USER_URL + username)
      .pipe(
        map(responseData => {
            return Object.values(responseData)
          }
        )
      )

  }
}
