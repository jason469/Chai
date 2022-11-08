import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DELETE_CWIMPIE_URL, GET_ALL_CWIMPIES_URL, GET_CWIMPIE_URL} from "../../shared/constants/url";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {Cwimpie} from "../../shared/models/Cwimpie";

@Injectable({
  providedIn: 'root'
})
export class ViewCwimpiesService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getAllCwimpiesData() {
    return this.http.get(GET_ALL_CWIMPIES_URL)
      .pipe(
        map(responseData => {
            return Object.values(responseData)
          }
        )
      )
  }

  getCwimpie(name:string) {
    return this.http.get(`${GET_CWIMPIE_URL}${name}`)
      .pipe(
        map((responseData:Cwimpie) => {
            return Object.values(responseData)
          }
        )
      )
  }

  deleteCwimpie(name: string) {
    let url = DELETE_CWIMPIE_URL + name
    return this.http.delete(url)
  }
}
