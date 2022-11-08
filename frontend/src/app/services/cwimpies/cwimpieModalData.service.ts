import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ICwimpieCardData,} from "../../shared/interfaces/ICwimpieCardData";

@Injectable({
  providedIn: 'root'
})
export class CwimpieModalDataService {
  private data: Subject<ICwimpieCardData> = new BehaviorSubject<ICwimpieCardData>(new ICwimpieCardData());
  currentData = this.data.asObservable()

  constructor() {
  }

  changeData(data: ICwimpieCardData) {
    this.data.next(data)
  }

  getData(): Observable<ICwimpieCardData> {
    return this.currentData
  }

}
