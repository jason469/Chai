import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GET_BIRTHDAY_CWIMPIES_URL, GET_RANDOM_VALUES_URL} from "../../shared/constants/url";

@Injectable({
  providedIn: 'root'
})
export class StartPageService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getBirthdayCwimpies() {
    return this.http.get(GET_BIRTHDAY_CWIMPIES_URL)
  }
}
