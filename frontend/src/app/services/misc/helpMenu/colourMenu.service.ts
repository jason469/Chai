import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GET_ALL_COLOURS_URL} from "../../../shared/constants/url";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColourMenuService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getAllColours() {
    return this.http.get(GET_ALL_COLOURS_URL)
      .pipe(
        map(responseData => {
            return Object.values(responseData)
          }
        )
      )
  }
}
