import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Cwimpie} from "../../shared/models/models";

@Injectable({
  providedIn: 'root'
})
export class CwimpieUpdateDataService {
  private data: Subject<Cwimpie> = new BehaviorSubject<Cwimpie>(new Cwimpie());
  currentData = this.data.asObservable()

  constructor() {
  }

  changeData(data: Cwimpie) {
    console.log(data)
    this.data.next(data)
  }

  getData(): Observable<Cwimpie> {
    return this.currentData
  }

}
