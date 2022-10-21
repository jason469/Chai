import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GET_ALL_CWIMPIES_URL} from "../../shared/constants/url";
import {Router} from "@angular/router";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewCwimpiesService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  getAllCwimpiesData() {
    return this.http.get(GET_ALL_CWIMPIES_URL)
      .pipe(
        map(responseData => {
            console.log(responseData)
          }
        )
      )
  }

}
